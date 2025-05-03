
import React, { useContext, useEffect, useState } from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import { Search, ShoppingCart, Heart, Filter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from '@/Context/StoreContext';
import { toast } from 'react-toastify';


const ProductBrowse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const farmerParam = queryParams.get('farmer');

  const { cart, setCart, addToCart, food_list } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [distanceRange, setDistanceRange] = useState([0, 10]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [farmerFilter, setFarmerFilter] = useState(farmerParam || "all");
  const [sortBy, setSortBy] = useState("relevance");

  // Get unique categories
  const categories = ["all", ...new Set(food_list.map(p => p.category))];

  // Get unique farmers
  const farmers = ["all", ...new Set(food_list.map(p => p.farmer))];

  // Filter and sort products
  const filteredProducts = food_list
    .filter(product => {
      // Search term filter
      const matchesSearch = searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

      // Price range filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Distance filter
      const matchesDistance = product.distance >= distanceRange[0] && product.distance <= distanceRange[1];

      // Rating filter
      const matchesRating = ratingFilter === 0 || product.rating >= ratingFilter;

      // Farmer filter
      const matchesFarmer = farmerFilter === "all" || product.farmer === farmerFilter;

      return matchesSearch && matchesCategory && matchesPrice && matchesDistance && matchesRating && matchesFarmer;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      } else if (sortBy === "price-high") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "distance") {
        return a.distance - b.distance;
      }
      return 0; // Default: relevance
    });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleDistanceRangeChange = (values: number[]) => {
    setDistanceRange(values);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setPriceRange([0, 400]);
    setDistanceRange([0, 10]);
    setRatingFilter(0);
    setFarmerFilter("all");
    setSortBy("relevance");
  };

  useEffect(() => {
    console.log(cart)
    console.log(food_list)
  }, [cart])

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Browse Products</h1>
            <p className="text-gray-500">Discover fresh produce directly from local farmers</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-8"
              placeholder="Search products, farmers, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="relative">
            <Link to="/consumer/checkout"><ShoppingCart className="h-5 w-5" /></Link>
            {/* {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-farmify-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )} */}
          </Button>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-2 block">Price Range (₹)</Label>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={400}
                      step={10}
                      onValueChange={handlePriceRangeChange}
                      className="mt-6"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Distance (km)</Label>
                  <div className="px-2">
                    <Slider
                      defaultValue={distanceRange}
                      min={0}
                      max={10}
                      step={0.5}
                      onValueChange={handleDistanceRangeChange}
                      className="mt-6"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>{distanceRange[0]} km</span>
                      <span>{distanceRange[1]} km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Minimum Rating</Label>
                  <Select
                    value={ratingFilter.toString()}
                    onValueChange={(value) => setRatingFilter(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select minimum rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="5">5 Stars Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block">Farmer</Label>
                  <Select
                    value={farmerFilter}
                    onValueChange={setFarmerFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select farmer" />
                    </SelectTrigger>
                    <SelectContent>
                      {farmers.map(farmer => (
                        <SelectItem key={farmer} value={farmer}>
                          {farmer === "all" ? "All Farmers" : farmer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-40 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-farmify-green bg-opacity-20 flex items-center justify-center text-farmify-green">
                        {product.image}
                      </div>
                    </div>
                    <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
                      <Heart className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{product.name}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-sm text-gray-500">{product.farmer}</div>
                      <div className="flex items-center text-xs">
                        <div className="text-yellow-400 mr-1">★</div>
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-bold">₹{product.price}/{product.unit}</div>
                      <Button
                        size="sm"
                        className="bg-farmify-green hover:bg-farmify-green-dark"
                        onClick={() => { addToCart(product.id); toast.success("Added To Cart") }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mb-4">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
              <Button variant="outline" onClick={resetFilters}>Reset All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default ProductBrowse;
