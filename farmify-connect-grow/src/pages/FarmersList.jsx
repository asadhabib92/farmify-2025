import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample farmers data (in a real app, this would come from an API)
const farmers = [
    {
        id: 1,
        name: "Ramesh Farms",
        location: "Bangalore Rural, Karnataka",
        rating: 4.8,
        verified: true,
        specialties: ["Organic Vegetables", "Fruits"],
        since: "2018",
        products: 24
    },
    {
        id: 2,
        name: "Green Valley Organics",
        location: "Mysore, Karnataka",
        rating: 4.5,
        verified: true,
        specialties: ["Organic Grains", "Pulses"],
        since: "2019",
        products: 18
    },
    {
        id: 3,
        name: "Sunshine Farms",
        location: "Hassan, Karnataka",
        rating: 4.7,
        verified: true,
        specialties: ["Fresh Vegetables", "Herbs"],
        since: "2020",
        products: 32
    }
];

const FarmersList = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Farmers</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet our network of verified farmers committed to bringing you the freshest produce directly from their farms to your table.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {farmers.map((farmer) => (
                        <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{farmer.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {farmer.location}
                                        </div>
                                    </div>
                                    {farmer.verified && (
                                        <Badge variant="secondary" className="flex items-center gap-1">
                                            <Check className="h-3 w-3" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center mb-4">
                                    <div className="flex items-center text-yellow-400">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span className="ml-1 text-gray-700">{farmer.rating}</span>
                                    </div>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-600 text-sm">Since {farmer.since}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-600 text-sm">{farmer.products} Products</span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {farmer.specialties.map((specialty, index) => (
                                            <Badge key={index} variant="outline">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    to={`/consumer/products?farmer=${encodeURIComponent(farmer.name)}`}
                                    className="text-farmify-green hover:text-farmify-green-dark font-medium text-sm inline-flex items-center"
                                >
                                    View Products →
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FarmersList;