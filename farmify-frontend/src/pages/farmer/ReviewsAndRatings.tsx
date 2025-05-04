
import React, { useState } from 'react';
import FarmerLayout from '@/components/layouts/FarmerLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  ThumbsUp,
  ThumbsDown,
  Star,
  MessageSquare,
  Calendar,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ReviewsAndRatings = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  
  // Mock data for reviews
  const reviews = [
    {
      id: 1,
      customer: "John Doe",
      product: "Organic Tomatoes",
      rating: 5,
      date: "2023-04-01",
      review: "These are the best tomatoes I've ever had! So fresh and flavorful. Will definitely purchase again.",
      response: null,
      helpful: 12,
      unhelpful: 1
    },
    {
      id: 2,
      customer: "Jane Smith",
      product: "Farm Fresh Eggs",
      rating: 4,
      date: "2023-03-28",
      review: "The eggs were very fresh and tasty. Packaging could be improved, though. One egg was cracked on arrival.",
      response: "Thank you for your feedback, Jane! We're sorry about the cracked egg and are working on improving our packaging. We'll include a replacement in your next order.",
      helpful: 8,
      unhelpful: 2
    },
    {
      id: 3,
      customer: "Robert Johnson",
      product: "Organic Milk",
      rating: 5,
      date: "2023-03-25",
      review: "Absolutely love this milk! It's so creamy and fresh, and you can really taste the difference from store-bought milk.",
      response: "Thanks for your kind words, Robert! We're happy you're enjoying our organic milk.",
      helpful: 15,
      unhelpful: 0
    },
    {
      id: 4,
      customer: "Emily Wilson",
      product: "Fresh Carrots",
      rating: 3,
      date: "2023-03-22",
      review: "Carrots were decent, but some were small and a few had signs of rot. Expected better quality for the premium price.",
      response: null,
      helpful: 4,
      unhelpful: 1
    },
    {
      id: 5,
      customer: "Michael Brown",
      product: "Organic Apples",
      rating: 2,
      date: "2023-03-20",
      review: "Very disappointed with these apples. Most were bruised and not as sweet as described. Won't order again.",
      response: null,
      helpful: 3,
      unhelpful: 7
    }
  ];
  
  const filteredReviews = reviews.filter(review => {
    let matchesFilter = true;
    if (filter === 'positive') matchesFilter = review.rating >= 4;
    if (filter === 'neutral') matchesFilter = review.rating === 3;
    if (filter === 'negative') matchesFilter = review.rating <= 2;
    if (filter === 'unanswered') matchesFilter = review.response === null;
    
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesFilter && matchesSearch;
  });
  
  const handleReplySubmit = (reviewId) => {
    // In a real app, this would send the reply to an API
    console.log(`Replied to review #${reviewId}: ${replyText}`);
    setReplyText('');
    setReplyingTo(null);
  };
  
  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Count ratings by star
  const ratingCounts = reviews.reduce((counts, review) => {
    counts[review.rating] = (counts[review.rating] || 0) + 1;
    return counts;
  }, {});
  
  return (
    <FarmerLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star}
                      className="h-5 w-5" 
                      fill={star <= Math.round(averageRating) ? "gold" : "none"} 
                      stroke={star <= Math.round(averageRating) ? "gold" : "currentColor"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} reviews)
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[5,4,3,2,1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span>{star}</span>
                    <Star className="h-4 w-4" fill="gold" stroke="gold" />
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-farmify-green h-2 rounded-full" 
                        style={{ width: `${((ratingCounts[star] || 0) / reviews.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{ratingCounts[star] || 0}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {Math.round((reviews.filter(r => r.response !== null).length / reviews.length) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviews.filter(r => r.response !== null).length} of {reviews.length} reviews answered
                </p>
                {reviews.filter(r => r.response === null).length > 0 && (
                  <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700">
                    {reviews.filter(r => r.response === null).length} Awaiting Response
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reviews..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="neutral">Neutral</TabsTrigger>
                <TabsTrigger value="negative">Negative</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No reviews match your filters</h3>
                <p className="text-muted-foreground">Try changing your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map(review => (
              <Card key={review.id} className={`border-l-4 ${
                review.rating >= 4 ? 'border-l-green-500' : 
                review.rating === 3 ? 'border-l-amber-500' : 
                'border-l-red-500'
              }`}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {review.product}
                        <Badge variant="outline">{review.customer}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star}
                              className="h-4 w-4" 
                              fill={star <= review.rating ? "gold" : "none"} 
                              stroke={star <= review.rating ? "gold" : "currentColor"}
                            />
                          ))}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{review.date}</span>
                        </div>
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        {review.helpful}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        {review.unhelpful}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{review.review}</p>
                  
                  {review.response && (
                    <div className="mt-4 pl-4 border-l-2 border-farmify-green">
                      <p className="text-sm font-medium text-farmify-green mb-1">Your Response:</p>
                      <p className="text-sm">{review.response}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {!review.response && (
                    replyingTo === review.id ? (
                      <div className="w-full space-y-2">
                        <Textarea 
                          placeholder="Type your response here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full"
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                          <Button onClick={() => handleReplySubmit(review.id)}>Send Response</Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setReplyingTo(review.id)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Reply to Review
                      </Button>
                    )
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </FarmerLayout>
  );
};

export default ReviewsAndRatings;
