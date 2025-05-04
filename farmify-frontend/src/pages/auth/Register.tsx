
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from 'lucide-react';
import axios from "axios"
import { StoreContext } from '@/Context/StoreContext';
import { ToastContainer, toast } from 'react-toastify';

const backendURL: string = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>("consumer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    farmName: "",
  });
  const { setLoading, setToken, setUserName, setFarmName } = useContext(StoreContext);

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle registration logic

    try {
      const response = await axios.post(backendURL + '/api/auth/register', formData);
      if (response.data.success) {
        setToken(response.data.token);
        setUserName(response.data.user.name)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("farmName", response.data.farmName)
        toast.success(response.data.message)
      }
      if (!response.data.success) {
        toast.error(response.data.message);
      }
      console.log(response.data)
      if (userType === "farmer") {
        window.location.href = "/kyc-verification";
      }
      navigate('/consumer/dashboard');
    } catch (error) {
      console.log(error);
      toast.error("Already Exist")
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-5">
      <div className="w-full max-w-md p-4">
        <div className="mb-8 text-center">
          {/* <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Farmify</span>
          </Link> */}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to create your Farmify account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">I am a</Label>
                <Select
                  defaultValue="consumer"
                  onValueChange={(value) => { setUserType(value); setFormData(prev => ({ ...prev, role: value })); }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="consumer">Consumer</SelectItem>
                  </SelectContent>
                </Select>
                {userType === "farmer" && (
                  <p className="text-xs text-gray-500">Farmers will need to complete KYC verification after registration</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name='firstName' onChange={onChangeHandler} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name='lastName' onChange={onChangeHandler} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name='email' type="email" placeholder="name@example.com" onChange={onChangeHandler} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name='phone' type="tel" onChange={onChangeHandler} required />
              </div>

              {userType === "farmer" && <div className="space-y-2">
                <Label htmlFor="confirmPassword">Farm Name</Label>
                <Input id="farmname" name="farmName" type="text" onChange={onChangeHandler} />
              </div>}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name='password' type="password" onChange={onChangeHandler} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button type="submit" className="w-full bg-farmify-green hover:bg-farmify-green-dark">
                <UserPlus className="mr-2 h-4 w-4" /> Create Account
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-farmify-green hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
export default Register;
