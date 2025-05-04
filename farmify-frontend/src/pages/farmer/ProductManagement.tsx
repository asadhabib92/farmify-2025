import React, { useEffect, useState } from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, ImagePlus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ScrollArea } from "@/components/ui/scroll-area"

const categories = ["Vegetables", "Fruits", "Grains", "Dairy & Honey", "Herbs & Spices"];

const ProductManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: null,
    stock: null,
    unit: "kg",
    description: "",
    id: null,
    rating: "",
    distance: "",
    currentStock: null,
    minimumStock: null,
    trend: "up",
    image: null as File | null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const farmerName = localStorage.getItem("farmName");
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/farmer/product-list`, { farmerName });
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: null,
      stock: null,
      unit: "kg",
      description: "",
      id: null,
      rating: "",
      distance: "",
      currentStock: null,
      minimumStock: null,
      trend: "up",
      image: null
    });
    setSelectedProduct(null);
  };

  const handleAddProduct = async () => {
    const farmerName = localStorage.getItem("farmName");
    const price = parseFloat(formData.price);
    const stock = parseFloat(formData.stock);

    const status = stock < 10 ? "Low Stock" : "Active";

    try {
      const data = new FormData();
      if (!selectedProduct) {
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("price", String(price));
        data.append("stock", String(stock));
        data.append("unit", formData.unit);
        data.append("description", formData.description);
        data.append("farmer", farmerName || "");
        data.append("status", status);
        data.append("id", formData.id);
        data.append("rating", formData.rating);
        data.append("distance", formData.distance);
        data.append("currentStock", formData.currentStock);
        data.append("minimumStock", formData.minimumStock);
        data.append("trend", formData.trend);
        data.append("image", formData.image);
      }

      if (selectedProduct) {
        for (const key in formData) {
          if (formData[key] === "price") data.append("price", String(price));
          if (formData[key] === "stock") data.append("stock", String(stock));
          if (formData[key] === "status") data.append("status", status);
          if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        }
      }


      const endpoint = selectedProduct
        ? `${import.meta.env.VITE_BACKEND_URL}/api/food/update`
        : `${import.meta.env.VITE_BACKEND_URL}/api/food/add`;

      if (selectedProduct) data.append("_id", selectedProduct._id);

      const res = await axios.post(endpoint, data);

      toast.success(res.data.message);
      setIsAddProductOpen(false);
      resetForm();

      const refreshed = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/farmer/product-list`, { farmerName });
      setProducts(refreshed.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const handleEditProduct = async (product: any) => {
    setSelectedProduct(product);
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = async (_id: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/remove`, { _id: _id });
      toast.success(response.data.message);
      setProducts(products.filter(p => p._id !== _id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-gray-500">Add, edit and manage your farm products</p>
          </div>
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="bg-farmify-green hover:bg-farmify-green-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  Fill in the details of your farm product. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="productImage">Product Image</Label>
                <Input id="productImage" type="file" onChange={handleFileChange} />
                {formData.image && (
                  <img src={URL.createObjectURL(formData.image)} className="max-h-32 mt-2" />
                )}

                <div className=' flex gap-2'>
                  <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" />
                  <Select value={formData.category} onValueChange={(val) => handleSelectChange("category", val)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className=' flex gap-2'>
                  <Input type="number" name="price" value={formData.price} onChange={handleInputChange} width={50} placeholder="Price ₹" />
                  <Input type="number" name="stock" value={formData.stock} onChange={handleInputChange} placeholder="Stock" />
                </div>

                <div className=' flex gap-2'>
                  <Select value={formData.unit} onValueChange={(val) => handleSelectChange("unit", val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="bottle">Bottle</SelectItem>
                      <SelectItem value="dozen">Dozen</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                      <SelectItem value="bunch">Bunch</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input name="distance" value={formData.distance} onChange={handleInputChange} placeholder="Farm Distance" />
                </div>

                <div className=' flex gap-2'>
                  <Input type='number' name="id" value={formData.id} onChange={handleInputChange} placeholder="Product id" />
                  <Input name="rating" value={formData.rating} onChange={handleInputChange} placeholder="Product Rating" />
                </div>
                <div className=' flex gap-2'>
                  <Input type='number' name="currentStock" value={formData.currentStock} onChange={handleInputChange} placeholder="Current Stock" />
                  <Input type='number' name="minimumStock" value={formData.minimumStock} onChange={handleInputChange} placeholder="Minimum Stock" />
                </div>

                <Textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsAddProductOpen(false); resetForm(); }}>Cancel</Button>
                <Button onClick={handleAddProduct}>
                  {selectedProduct ? "Update Product" : "Add Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Your Products</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-8" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(p => (
                  <TableRow key={p._id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>₹{p.price}/{p.unit}</TableCell>
                    <TableCell>{p.stock} {p.unit}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${p.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(p)}><Edit size={16} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p._id)}><Trash2 size={16} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  );
};

export default ProductManagement;
