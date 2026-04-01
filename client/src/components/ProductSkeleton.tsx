import React from "react";

interface ProductSkeletonProps {
  featured?: boolean;
}

const ProductSkeleton = ({ featured = false }: ProductSkeletonProps) => {
  return (
    <div className={`group ${featured ? "md:row-span-2" : ""}`}>
      {/* Skeleton Image Area */}
      <div 
        className={`relative overflow-hidden rounded-2xl bg-secondary animate-pulse ${
          featured ? "aspect-[3/5]" : "aspect-[4/5]"
        }`}
      >
        {/* Placeholder for the CTA button */}
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-muted/60" />
      </div>

      {/* Skeleton Card Footer */}
      <div className="mt-3 flex items-start justify-between">
        <div className="flex-1 space-y-2">
          {/* Title placeholder */}
          <div className="h-4 bg-muted/60 rounded-md w-3/4 animate-pulse" />
          
          {/* Price placeholder */}
          <div className="flex items-center gap-2 mt-1">
            <div className="h-4 bg-muted/60 rounded-md w-16 animate-pulse" />
            <div className="h-3 bg-muted/40 rounded-md w-12 animate-pulse" />
          </div>
        </div>
        
        {/* Rating placeholder */}
        <div className="flex items-center gap-1 mt-1 ml-2">
          <div className="h-3 w-3 rounded-full bg-muted/60 animate-pulse" />
          <div className="h-3 bg-muted/40 rounded-md w-8 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
