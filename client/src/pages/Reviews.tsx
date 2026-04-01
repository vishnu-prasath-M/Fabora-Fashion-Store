import { Link } from "react-router-dom";
import FaboraHeader from "@/components/FaboraHeader";
import Footer from "@/components/Footer";
import { Star, ChevronLeft, ThumbsUp, MessageCircle } from "lucide-react";

const allReviews = [
  {
    id: 1,
    name: "Belal K.",
    initials: "BK",
    rating: 5,
    title: "Amazing Service!",
    comment: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.",
    date: "August 17, 2024",
    helpful: 24,
    product: "Premium Cotton Shirt",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    initials: "SJ",
    rating: 5,
    title: "Exceeded my expectations!",
    comment: "Absolutely love the quality and fit. The fabric feels luxurious and the stitching is impeccable. Will definitely buy more from this brand.",
    date: "August 15, 2024",
    helpful: 18,
    product: "Linen Blend Trousers",
    verified: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    initials: "MC",
    rating: 4,
    title: "Great quality, slightly large",
    comment: "Great material and design, but the sizing was slightly larger than expected. I recommend ordering one size down for a perfect fit.",
    date: "August 12, 2024",
    helpful: 15,
    product: "Classic Wool Sweater",
    verified: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    initials: "ER",
    rating: 5,
    title: "Perfect for any occasion!",
    comment: "One of the best purchases I've made this year. So elegant and versatile! I can wear it to work or for a night out. Highly recommended!",
    date: "August 10, 2024",
    helpful: 22,
    product: "Silk Evening Dress",
    verified: true,
  },
  {
    id: 5,
    name: "David Kim",
    initials: "DK",
    rating: 5,
    title: "Premium feel and fast shipping",
    comment: "The craftsmanship is superb. You can tell a lot of thought went into the design. Shipping was faster than expected too!",
    date: "August 8, 2024",
    helpful: 12,
    product: "Leather Crossbody Bag",
    verified: true,
  },
  {
    id: 6,
    name: "Sophia Martinez",
    initials: "SM",
    rating: 4,
    title: "Very stylish design",
    comment: "Very stylish and wears well throughout the day. The color is exactly as shown in the pictures. Very happy with my purchase.",
    date: "August 5, 2024",
    helpful: 9,
    product: "Cotton Polo Shirt",
    verified: true,
  },
  {
    id: 7,
    name: "James Wilson",
    initials: "JW",
    rating: 5,
    title: "Looks even better in person",
    comment: "The photos don't do it justice. The quality and attention to detail is remarkable. I've received so many compliments already!",
    date: "August 3, 2024",
    helpful: 16,
    product: "Tailored Blazer",
    verified: true,
  },
  {
    id: 8,
    name: "Isabella Thompson",
    initials: "IT",
    rating: 5,
    title: "Incredibly luxurious",
    comment: "Feels incredibly luxurious against the skin. The fit is perfect and the material is top-notch. Will be buying more colors!",
    date: "August 1, 2024",
    helpful: 20,
    product: "Cashmere Scarf",
    verified: true,
  },
];

const Reviews = () => {
  const averageRating = 4.8;
  const totalReviews = 32;

  const ratingBreakdown = [
    { stars: 5, count: 24, percentage: 75 },
    { stars: 4, count: 5, percentage: 16 },
    { stars: 3, count: 2, percentage: 6 },
    { stars: 2, count: 1, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <FaboraHeader />
      
      <div className="pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Back Link */}
        <Link 
          to="/product/1" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Product
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Customer Reviews</h1>
          <p className="text-muted-foreground">See what our customers are saying about our products</p>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Bars */}
            <div className="flex-1 w-full max-w-md space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{item.stars} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-10 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">All Reviews ({totalReviews})</h2>
            <select className="bg-white/80 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-foreground/10">
              <option>Most Recent</option>
              <option>Highest Rated</option>
              <option>Lowest Rated</option>
              <option>Most Helpful</option>
            </select>
          </div>

          {allReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {review.initials}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Name */}
                  <p className="text-sm font-medium text-muted-foreground mb-2">{review.product}</p>

                  {/* Review Title */}
                  <h5 className="font-semibold mb-2">{review.title}</h5>

                  {/* Review Comment */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 text-sm font-medium hover:bg-white transition-all duration-300 hover:shadow-md">
            Load More Reviews
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;
