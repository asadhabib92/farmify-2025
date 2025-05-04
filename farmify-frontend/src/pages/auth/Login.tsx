
import React, { useContext, useState } from 'react';
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
import { Loader2, LogIn } from 'lucide-react';
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendURL: string = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { loading, setLoading, setToken, setUserName, setFarmName } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate()

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true);
    try {
      const response = await axios.post(backendURL + '/api/auth/login', formData);
      if (response.data.success) {
        setToken(response.data.token);
        setUserName(response.data.user.name);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("farmName", response.data.farmName)
        toast.success("Logged In Successfully");
        navigate('/consumer/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error("Wrong Credentials");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Farmify</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name='email' placeholder="name@example.com" onChange={onChangeHandler} required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-farmify-green hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" name='password' onChange={onChangeHandler} required />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button type="submit" className="w-full bg-farmify-green hover:bg-farmify-green-dark">
                {loading && <Loader2 className=' animate-spin' />}<LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-farmify-green hover:underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
