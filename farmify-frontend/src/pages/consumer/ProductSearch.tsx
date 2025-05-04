
import React, { useContext, useState } from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Map,
  Filter,
  SlidersHorizontal,
  Star,
  MapPin,
  Loader2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { StoreContext } from '@/Context/StoreContext';
import { toast } from 'react-toastify';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, food_list, loading } = useContext(StoreContext)

  // Filter categories
  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy & Eggs",
    "Grains & Pulses",
    "Spices",
    "Herbs",
    "Honey & Preserves"
  ];

  // Search functionality
  const filteredProducts = food_list.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.location.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(product =>
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Search Products</h1>
          <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product, farmer, or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          {showFilters && (
            <div className="w-64 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Price Range</h3>
                      <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Distance</h3>
                      <Select defaultValue="10">
                        <SelectTrigger>
                          <SelectValue placeholder="Distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">Within 5 km</SelectItem>
                          <SelectItem value="10">Within 10 km</SelectItem>
                          <SelectItem value="20">Within 20 km</SelectItem>
                          <SelectItem value="50">Within 50 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox id={category} />
                            <Label htmlFor={category}>{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Product Type</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="organic" />
                        <Label htmlFor="organic">Organic Only</Label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Sort By</h3>
                      <Select defaultValue="relevance">
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Customer Rating</SelectItem>
                          <SelectItem value="distance">Distance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search results */}
          {loading ? <div className=' flex justify-center items-center'><Loader2 className='animate-spin h-80 w-80' /></div> :
            <div className={`grid grid-cols-1 ${showFilters ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'} gap-6 flex-1`}>
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.farmer}</p>
                        </div>
                        {product.organic && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Organic
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center mt-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-muted-foreground">{product.location}</span>
                        <span className="text-muted-foreground mx-1">•</span>
                        <span className="text-muted-foreground">{product.distance} km away</span>
                      </div>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3 w-3"
                              fill={star <= Math.round(product.rating) ? "gold" : "none"}
                              stroke={star <= Math.round(product.rating) ? "gold" : "currentColor"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="font-semibold text-lg">₹{product.price}</span>
                          <span className="text-xs text-muted-foreground">/{product.unit}</span>
                        </div>
                        <Button size="sm" onClick={() => { addToCart(product.id); toast.success("Added To Cart") }}>Add to Cart</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>}
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default ProductSearch;
