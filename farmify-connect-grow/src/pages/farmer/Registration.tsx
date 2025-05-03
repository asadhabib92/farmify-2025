
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  CheckCircle2,
  CircleDashed,
  CircleDot,
  Upload
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

// Define form schema using zod
const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().min(6, "Pincode must be at least 6 characters"),
});

const farmInfoSchema = z.object({
  farmName: z.string().min(2, "Farm name must be at least 2 characters"),
  farmDescription: z.string().min(10, "Farm description must be at least 10 characters"),
  farmType: z.string().min(1, "Please select a farm type"),
  farmSize: z.string().min(1, "Please enter farm size"),
  farmingSince: z.string().min(4, "Please enter a valid year"),
  productsGrown: z.string().min(3, "Please list products grown"),
});

const documentSchema = z.object({
  aadhaar: z.string().min(12, "Aadhaar number must be 12 digits"),
  pan: z.string().min(10, "PAN number must be 10 characters"),
  gst: z.string().optional(),
  bankName: z.string().min(2, "Bank name is required"),
  accountNumber: z.string().min(9, "Account number must be at least 9 digits"),
  ifsc: z.string().min(11, "IFSC code must be 11 characters"),
});

const FarmerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    farmInfo: {},
    documents: {}
  });

  // Initialize forms for each step
  const personalInfoForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    }
  });

  const farmInfoForm = useForm({
    resolver: zodResolver(farmInfoSchema),
    defaultValues: {
      farmName: "",
      farmDescription: "",
      farmType: "",
      farmSize: "",
      farmingSince: "",
      productsGrown: "",
    }
  });

  const documentForm = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      aadhaar: "",
      pan: "",
      gst: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
    }
  });

  // Handle form submissions for each step
  const onPersonalInfoSubmit = (data) => {
    setFormData({ ...formData, personalInfo: data });
    setStep(2);
  };

  const onFarmInfoSubmit = (data) => {
    setFormData({ ...formData, farmInfo: data });
    setStep(3);
  };

  const onDocumentSubmit = (data) => {
    setFormData({ ...formData, documents: data });
    // Here you would submit the complete form data to your API
    console.log("Complete form data:", { ...formData, documents: data });
    setStep(4);
  };

  const farmTypes = [
    { value: "organic", label: "Organic Farm" },
    { value: "conventional", label: "Conventional Farm" },
    { value: "mixed", label: "Mixed Farming" },
    { value: "livestock", label: "Livestock Farm" },
    { value: "poultry", label: "Poultry Farm" },
    { value: "dairy", label: "Dairy Farm" },
    { value: "aquaculture", label: "Aquaculture" },
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  useEffect(() => { console.log(formData) }, [formData])

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-farmify-green text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : 1}
            </div>
            <span className="text-xs mt-1">Personal Info</span>
          </div>

          <div className={`w-16 h-1 ${step >= 2 ? 'bg-farmify-green' : 'bg-gray-200'}`}></div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-farmify-green text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : 2}
            </div>
            <span className="text-xs mt-1">Farm Details</span>
          </div>

          <div className={`w-16 h-1 ${step >= 3 ? 'bg-farmify-green' : 'bg-gray-200'}`}></div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-farmify-green text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {step > 3 ? <CheckCircle2 className="h-6 w-6" /> : 3}
            </div>
            <span className="text-xs mt-1">Documents</span>
          </div>

          <div className={`w-16 h-1 ${step >= 4 ? 'bg-farmify-green' : 'bg-gray-200'}`}></div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? 'bg-farmify-green text-white' : 'bg-gray-200 text-gray-600'
              }`}>
              {step === 4 ? <CheckCircle2 className="h-6 w-6" /> : 4}
            </div>
            <span className="text-xs mt-1">Complete</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Farmer Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our platform and start selling your farm products directly to consumers
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {renderStepIndicator()}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your basic contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...personalInfoForm}>
                <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={personalInfoForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={personalInfoForm.control}
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
                    control={personalInfoForm.control}
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={personalInfoForm.control}
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
                      control={personalInfoForm.control}
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

                    <FormField
                      control={personalInfoForm.control}
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
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit">Continue to Farm Details</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Farm Information</CardTitle>
              <CardDescription>
                Tell us about your farm and what you produce
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...farmInfoForm}>
                <form onSubmit={farmInfoForm.handleSubmit(onFarmInfoSubmit)} className="space-y-4">
                  <FormField
                    control={farmInfoForm.control}
                    name="farmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Green Fields Farm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={farmInfoForm.control}
                    name="farmDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your farm, your farming practices, and what makes your products special"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={farmInfoForm.control}
                      name="farmType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select farm type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {farmTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={farmInfoForm.control}
                      name="farmSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Size (acres)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={farmInfoForm.control}
                      name="farmingSince"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farming Since (Year)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 2010" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={farmInfoForm.control}
                      name="productsGrown"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Products Grown</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Tomatoes, Carrots, Rice" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit">Continue to Documents</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Documents & Banking</CardTitle>
              <CardDescription>
                Please provide your identification and banking details for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...documentForm}>
                <form onSubmit={documentForm.handleSubmit(onDocumentSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={documentForm.control}
                      name="aadhaar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhaar Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-end gap-4">
                      <Button type="button" variant="outline" className="flex gap-2 items-center">
                        <Upload className="h-4 w-4" /> Upload Aadhaar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={documentForm.control}
                      name="pan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <FormControl>
                            <Input placeholder="ABCDE1234F" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-end gap-4">
                      <Button type="button" variant="outline" className="flex gap-2 items-center">
                        <Upload className="h-4 w-4" /> Upload PAN
                      </Button>
                    </div>
                  </div>

                  <FormField
                    control={documentForm.control}
                    name="gst"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="22AAAAA0000A1Z5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <h4 className="text-lg font-medium">Banking Details</h4>

                  <FormField
                    control={documentForm.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="State Bank of India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={documentForm.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={documentForm.control}
                      name="ifsc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <FormControl>
                            <Input placeholder="SBIN0001234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button type="submit">Submit Application</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-farmify-green">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2" />
                Application Submitted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">
                Thank you for submitting your application to become a farmer on our platform.
                Our team will review your details and get back to you within 2-3 business days.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                You'll receive an email notification once your application is approved.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link to="/">Return to Homepage</Link>
                </Button>
                <Button asChild>
                  <Link to="/farmer/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmerRegistration;
