
import React, { useContext, useEffect, useState } from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  CreditCard,
  Wallet,
  BadgeIndianRupee,
  ShoppingBag,
  Trash,
  Plus,
  Minus,
  Check,
  Shield
} from 'lucide-react';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define form schema using zod
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "Please select a state"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  paymentMethod: z.enum(["upi", "cod", "card"]),
  upiId: z.string().optional(),
  deliveryInstructions: z.string().optional()
});

const Checkout = () => {
  const { cart, setCart, addToCart, removeFromCart, food_list, getTotalCartAmount } = useContext(StoreContext);
  // const [cart, setCart] = useState({
  //   items: [
  //     {
  //       id: 1,
  //       name: 'Organic Tomatoes',
  //       farmer: 'Green Valley Farms',
  //       price: 45,
  //       quantity: 2,
  //       image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2',
  //     },
  //     {
  //       id: 2,
  //       name: 'Farm Fresh Eggs',
  //       farmer: 'Sunny Side Poultry',
  //       price: 120,
  //       quantity: 1,
  //       image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f',
  //     },
  //     {
  //       id: 3,
  //       name: 'Organic Baby Spinach',
  //       farmer: 'Green Leaf Farms',
  //       price: 70,
  //       quantity: 2,
  //       image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
  //     }
  //   ],
  //   subtotal: 350,
  //   deliveryFee: 40,
  //   total: 390
  // });

  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Initialize forms
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      paymentMethod: "upi",
      upiId: "",
      deliveryInstructions: ""
    }
  });

  useEffect(() => { console.log(cart) }, [])

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const token = localStorage.getItem('token'); // Assuming user is logged in and token is stored

      if (!token) {
        toast.error('Please login to place order');
        return;
      }

      // Build order items from cart
      const items = [];
      if (food_list && cart) {
        food_list.map((item) => {
          console.log(cart[item.id])
          if (cart[item.id] > 0) {
            let itemInfo = item;
            itemInfo["quantity"] = cart[item.id];
            items.push(itemInfo);
          }
        })
      }

      console.log(items)
      if (items.length === 0) {
        toast.error('Cart is empty');
        return;
      }

      // Build shipping address
      const shippingAddress = {
        name: data.fullName,
        phone: data.phone,
        street: data.address,
        city: data.city,
        state: data.state,
        postalCode: data.pincode,
        country: "India"
      };

      // Send to backend
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/orders',
        {
          items,
          shippingAddress,
          paymentMethod: data.paymentMethod
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure the token is correct
          }
        }
      );

      console.log('Order placed:', response.data);

      toast.success('Order placed successfully!');
      setCart({}); // Clear cart after successful order
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };


  // Update quantity of items in cart
  // const updateQuantity = (id, change) => {
  //   const updatedItems = cart.map(item => {
  //     if (item.id === id) {
  //       const newQuantity = Math.max(1, item.quantity + change);
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });

  //   // Recalculate totals
  //   const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  //   const total = subtotal + 40;

  //   setCart({
  //     items: updatedItems,
  //     subtotal,
  //     deliveryFee: cart.deliveryFee,
  //     total
  //   });
  // };

  // Remove item from cart
  // const removeItem = (id) => {
  //   const updatedItems = cart.items.filter(item => item.id !== id);

  //   // Recalculate totals
  //   const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  //   const total = subtotal + cart.deliveryFee;

  //   setCart({
  //     items: updatedItems,
  //     subtotal,
  //     deliveryFee: cart.deliveryFee,
  //     total
  //   });
  // };

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Cart summary */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Cart</CardTitle>
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {food_list.map(item => {
                    if (cart[item.id] > 0) {
                      return (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div
                            className="h-16 w-16 rounded-md bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">by {item.farmer}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-5 text-center">{cart[item.id]}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => addToCart(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="w-20 text-right">
                            ₹{item.price}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    }
                  })}
                </div>
              </CardContent>
            </Card>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                    <CardDescription>
                      Enter your address where you want your order to be delivered
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Shoaib Akhtar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Mumbai" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN Code</FormLabel>
                            <FormControl>
                              <Input placeholder="400001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="deliveryInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any special instructions for delivery"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Choose how you want to pay for your order
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                setPaymentMethod(value);
                              }}
                              defaultValue={field.value}
                              className="space-y-4"
                            >
                              <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                                  <Wallet className="h-5 w-5 text-blue-500" />
                                  <div>
                                    <p className="font-medium">UPI Payment</p>
                                    <p className="text-sm text-muted-foreground">Pay using Google Pay, PhonePe, Paytm, etc.</p>
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                                  <BadgeIndianRupee className="h-5 w-5 text-green-500" />
                                  <div>
                                    <p className="font-medium">Cash on Delivery</p>
                                    <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                                  <CreditCard className="h-5 w-5 text-purple-500" />
                                  <div>
                                    <p className="font-medium">Credit/Debit Card</p>
                                    <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentMethod === "upi" && (
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="upiId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UPI ID</FormLabel>
                              <FormControl>
                                <Input placeholder="name@upi" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>

          {/* Right column - Order summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>₹40</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{getTotalCartAmount() + 40}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Place Order
                </Button>
                <div className="text-xs text-muted-foreground text-center flex items-center gap-1 justify-center">
                  <Shield className="h-3 w-3" /> Your payment information is secure
                </div>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-farmify-green">
                <Check className="h-4 w-4" /> Free delivery on orders over ₹500
              </div>
              <div className="flex items-center gap-2 text-sm text-farmify-green">
                <Check className="h-4 w-4" /> Fresh from farm to your doorstep
              </div>
              <div className="flex items-center gap-2 text-sm text-farmify-green">
                <Check className="h-4 w-4" /> Easy returns & refunds
              </div>
            </div>

            <div className="text-center">
              <Button variant="link" asChild>
                <Link to="/consumer/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default Checkout;

