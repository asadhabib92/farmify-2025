
import React, { useState } from 'react';
import ConsumerLayout from '@/components/layouts/ConsumerLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, // Using MessageSquare instead of Message which doesn't exist
  Star,
  ThumbsUp, 
  Calendar 
} from 'lucide-react';

const UserReviews = () => {
  const [activeTab, setActiveTab] = useState('my-reviews');
  
  // Mock data for reviews
  const myReviews = [
    {
      id: 1,
      farmer: "Green Valley Farms",
      product: "Organic Tomatoes",
      rating: 5,
      date: "2023-04-15",
      review: "Excellent quality tomatoes, very fresh and tasty. Will definitely purchase again!",
      response: "Thank you for your kind words! We're glad you enjoyed our tomatoes."
    },
    {
      id: 2,
      farmer: "Sunny Fields",
      product: "Farm Fresh Eggs",
      rating: 4,
      date: "2023-03-22",
      review: "The eggs were fresh and of good quality. Packaging could be improved."
    },
  ];
  
  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Reviews</h1>
          
          <div className="flex space-x-2">
            <Button 
              variant={activeTab === 'my-reviews' ? 'default' : 'outline'}
              onClick={() => setActiveTab('my-reviews')}
            >
              My Reviews
            </Button>
            <Button 
              variant={activeTab === 'pending' ? 'default' : 'outline'}
              onClick={() => setActiveTab('pending')}
            >
              Pending Reviews
            </Button>
          </div>
        </div>
        
        {activeTab === 'my-reviews' && (
          <div className="space-y-6">
            {myReviews.map(review => (
              <Card key={review.id} className="border-l-4 border-l-farmify-green">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.product}</CardTitle>
                      <CardDescription>Purchased from {review.farmer}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i}
                          size={18}
                          fill={i < review.rating ? "gold" : "none"} 
                          stroke={i < review.rating ? "gold" : "currentColor"}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MessageSquare size={18} className="mt-1 text-farmify-green" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Your Review</p>
                        <p className="text-gray-600">{review.review}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Calendar size={14} className="mr-1" /> 
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {review.response && (
                      <div className="flex items-start space-x-2 pl-6 pt-2 border-t">
                        <MessageSquare size={18} className="mt-1 text-farmify-orange" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Farmer's Response</p>
                          <p className="text-gray-600">{review.response}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ThumbsUp size={14} /> Helpful
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Farm Fresh Apples</CardTitle>
                <CardDescription>Purchased from Apple Orchard Farms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm font-medium">Share your experience with this product</p>
                  
                  <div className="flex items-center space-x-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={24} className="cursor-pointer text-gray-300" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">Tap to rate</span>
                  </div>
                  
                  <Textarea 
                    placeholder="Write your review here..." 
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm">Submit Review</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
};

export default UserReviews;
