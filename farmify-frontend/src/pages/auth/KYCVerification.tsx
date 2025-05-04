
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Upload, CheckCircle } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { StoreContext } from '@/Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const KYCVerification = () => {
  const [step, setStep] = useState<number>(1);
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    aadharImage: null,
    panImage: null,
    farmOwnershipImage: null,
  });

  const token = localStorage.getItem('token')
  const decoded = jwtDecode<MyJwtPayload>(token);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    aadhaar: "",
    pan: "",
    address: "",
    state: "",
    district: "",
    pin: "",
    farmName: "",
    farmSize: "",
    farmAddress: "",
    type: "",
    primaryProducts: "",
    experience: "",
    role: "farmer",
    userId: decoded.id
  });

  const { setLoading, setToken, } = useContext(StoreContext);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments({
        ...documents,
        [docType]: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission
      setLoading(true);
      // Handle registration logic
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("dob", formData.dob);
      data.append("aadhaar", formData.aadhaar);
      data.append("pan", formData.pan);
      data.append("address", formData.address);
      data.append("state", formData.state);
      data.append("district", formData.district);
      data.append("pin", formData.pin);
      data.append("farmName", formData.farmName);
      data.append("farmSize", formData.farmSize);
      data.append("farmAddress", formData.farmAddress);
      data.append("type", formData.type);
      data.append("primaryProducts", formData.primaryProducts);
      data.append("experience", formData.experience);
      data.append("role", formData.role);
      data.append("userId", formData.userId);
      data.append("aadhaarImage", documents.aadhaarImage)
      data.append("panImage", documents.panImage);
      data.append("farmOwnershipImage", documents.farmOwnershipImage)
      try {
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/kyc', data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message)
        }
        if (!response.data.success) {
          toast.error(response.data.message);
        }
        console.log(response.data)
      } catch (error) {
        console.log(error);
        toast.error("Already Exist")
      }
      setLoading(false);
      window.location.href = "/farmer/dashboard";
    }
  };

  interface MyJwtPayload {
    id: string;      // or number, depending on backend
    email: string;
    name: string;
    // Add more fields if your JWT has more
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode<MyJwtPayload>(token);
    console.log(decoded)
    console.log(documents);
  }, [])

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>
                Please provide your personal information for KYC verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as per Aadhar)</Label>
                  <Input id="fullName" onChange={onChangeHandler} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" onChange={onChangeHandler} type="text" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadharNumber">Aadhar Number</Label>
                <Input id="aadharNumber" onChange={onChangeHandler} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input id="panNumber" onChange={onChangeHandler} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullAddress">Full Address</Label>
                <Textarea id="fullAddress" onChange={onChangeHandler} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select defaultValue="maharashtra" onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" onChange={onChangeHandler} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input id="pincode" onChange={onChangeHandler} required />
                </div>
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
              <CardDescription>
                Tell us about your farming practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input id="farmName" onChange={onChangeHandler} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (in acres)</Label>
                  <Input id="farmSize" type="number" min="0" step="0.01" onChange={onChangeHandler} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmAddress">Farm Address (if different from personal address)</Label>
                <Textarea id="farmAddress" onChange={onChangeHandler} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingType">Type of Farming</Label>
                <Select defaultValue="organic" onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select farming type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryProducts">Primary Products (comma-separated)</Label>
                <Input id="primaryProducts" placeholder="e.g., Rice, Wheat, Vegetables, Dairy" onChange={onChangeHandler} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingExperience">Years of Farming Experience</Label>
                <Input id="farmingExperience" type="number" min="0" onChange={onChangeHandler} required />
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Please upload the required documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadharUpload">Aadhar Card (Front & Back)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="aadharUpload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'aadhar')}
                  />
                  <Label htmlFor="aadharUpload" className="cursor-pointer block">
                    {documents.aadhar ? (
                      <div className="flex items-center justify-center space-x-2 text-farmify-green">
                        <CheckCircle className="h-6 w-6" />
                        <span>{documents.aadhar.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload Aadhar (JPG, PNG or PDF)</span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panUpload">PAN Card</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="panUpload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'pan')}
                  />
                  <Label htmlFor="panUpload" className="cursor-pointer block">
                    {documents.pan ? (
                      <div className="flex items-center justify-center space-x-2 text-farmify-green">
                        <CheckCircle className="h-6 w-6" />
                        <span>{documents.pan.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload PAN card (JPG, PNG or PDF)</span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmProofUpload">Proof of Farm Ownership/Lease</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    id="farmProofUpload"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'farmProof')}
                  />
                  <Label htmlFor="farmProofUpload" className="cursor-pointer block">
                    {documents.farmProof ? (
                      <div className="flex items-center justify-center space-x-2 text-farmify-green">
                        <CheckCircle className="h-6 w-6" />
                        <span>{documents.farmProof.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload Farm documents (JPG, PNG or PDF)</span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-3xl p-4">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farmify-green to-farmify-orange flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-2xl font-bold">Farmify</span>
          </Link>
          <h1 className="text-2xl font-bold">Farmer KYC Verification</h1>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="w-full flex justify-between relative">
            <div className={`w-1/3 h-1 ${step >= 1 ? 'bg-farmify-green' : 'bg-gray-300'} absolute top-3 left-0 z-0`}></div>
            <div className={`w-1/3 h-1 ${step >= 2 ? 'bg-farmify-green' : 'bg-gray-300'} absolute top-3 left-1/3 z-0`}></div>
            <div className={`w-1/3 h-1 ${step >= 3 ? 'bg-farmify-green' : 'bg-gray-300'} absolute top-3 right-0 z-0`}></div>

            <div className="z-10 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-farmify-green text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="text-xs mt-1">Personal</span>
            </div>
            <div className="z-10 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-farmify-green text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="text-xs mt-1">Farm</span>
            </div>
            <div className="z-10 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-farmify-green text-white' : 'bg-gray-300'}`}>
                3
              </div>
              <span className="text-xs mt-1">Documents</span>
            </div>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
              >
                Previous
              </Button>
              <Button type="submit" className="bg-farmify-green hover:bg-farmify-green-dark">
                {step < 3 ? "Next" : "Submit KYC"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your information is securely stored and will only be used for verification purposes.</p>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
