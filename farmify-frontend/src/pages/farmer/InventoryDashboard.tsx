
import React, { useEffect, useState } from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Package,
  Search,
  TrendingDown,
  TrendingUp,
  Plus,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';

const InventoryDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const farmName = localStorage.getItem('farmName');
    if (!farmName) return;

    async function loadData() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/farmer/inventory`,
          { farmer: farmName }
        );
        console.log("API Response:", response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  // Mock data for inventory
  const inventorySummary = {
    totalProducts: 48,
    lowStock: 7,
    outOfStock: 3,
    totalValue: 25750.00
  };

  // const products = [
  //   {
  //     id: 1,
  //     name: 'Organic Tomatoes',
  //     category: 'Vegetables',
  //     currentStock: 120,
  //     minimumStock: 20,
  //     price: 25.00,
  //     value: 3000.00,
  //     trend: 'up'
  //   },
  //   {
  //     id: 2,
  //     name: 'Farm Fresh Eggs',
  //     category: 'Dairy & Eggs',
  //     currentStock: 85,
  //     minimumStock: 30,
  //     price: 60.00,
  //     value: 5100.00,
  //     trend: 'up'
  //   },
  //   {
  //     id: 3,
  //     name: 'Organic Apples',
  //     category: 'Fruits',
  //     currentStock: 45,
  //     minimumStock: 50,
  //     price: 80.00,
  //     value: 3600.00,
  //     trend: 'down'
  //   },
  //   {
  //     id: 4,
  //     name: 'Fresh Carrots',
  //     category: 'Vegetables',
  //     currentStock: 200,
  //     minimumStock: 40,
  //     price: 15.00,
  //     value: 3000.00,
  //     trend: 'stable'
  //   },
  //   {
  //     id: 5,
  //     name: 'Honey',
  //     category: 'Other',
  //     currentStock: 10,
  //     minimumStock: 15,
  //     price: 120.00,
  //     value: 1200.00,
  //     trend: 'down'
  //   },
  //   {
  //     id: 6,
  //     name: 'Organic Milk',
  //     category: 'Dairy & Eggs',
  //     currentStock: 0,
  //     minimumStock: 10,
  //     price: 35.00,
  //     value: 0.00,
  //     trend: 'down'
  //   }
  // ];

  // Get stock status for styling
  const getStockStatus = (current, minimum) => {
    if (current === 0) return { text: 'Out of Stock', class: 'text-red-600 bg-red-50' };
    if (current < minimum) return { text: 'Low Stock', class: 'text-amber-600 bg-amber-50' };
    return { text: 'In Stock', class: 'text-green-600 bg-green-50' };
  };

  const getStockPercentage = (current, minimum) => {
    if (minimum === 0) return 100;
    const ratio = (current / (minimum * 2)) * 100;
    return Math.min(ratio, 100);
  };

  return (
    <FarmerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Inventory Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventorySummary.totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <TrendingDown className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventorySummary.lowStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventorySummary.outOfStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{inventorySummary.totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8" />
          </div>

          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>
              Monitor your stock levels and inventory value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price (₹)</TableHead>
                    <TableHead>Value (₹)</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => {
                    const stockStatus = getStockStatus(product.currentStock, product.minimumStock);
                    const stockPercentage = getStockPercentage(product.currentStock, product.minimumStock);

                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[100px]">
                              <Progress value={stockPercentage} />
                            </div>
                            <span className="text-sm">{product.currentStock}/{product.minimumStock}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.class}`}>
                            {stockStatus.text}
                          </span>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.price * product.currentStock}</TableCell>
                        <TableCell>
                          {product.trend === 'up' && <TrendingUp className="text-green-500" />}
                          {product.trend === 'down' && <TrendingDown className="text-red-500" />}
                          {product.trend === 'stable' && <ArrowDown className="rotate-90 text-gray-500" />}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </FarmerLayout>
  );
};

export default InventoryDashboard;
