import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface AddToCartModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
}

const AddToCartModal = ({ open, onClose, productName }: AddToCartModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center py-12">
        <DialogHeader className="items-center">
          <div className="w-12 h-12 border border-foreground rounded-full flex items-center justify-center mb-4">
            <Check size={20} strokeWidth={1.5} />
          </div>
          <DialogTitle className="editorial-heading text-2xl">Added to Bag</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground font-sans mt-2">
            {productName} has been added to your bag successfully.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Continue Shopping
          </Button>
          <Button variant="editorial" className="flex-1" asChild>
            <Link to="/cart">View Bag</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
