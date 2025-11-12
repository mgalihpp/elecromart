import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Textarea } from "@repo/ui/components/textarea";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1, "Silakan beri rating"),
  comment: z.string().trim().min(10, "Ulasan minimal 10 karakter").max(500),
});

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
}

const ReviewDialog = ({
  open,
  onOpenChange,
  productName,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      reviewSchema.parse({ rating, comment });
      toast.success("Ulasan berhasil dikirim. Terima kasih!");
      onOpenChange(false);
      setRating(0);
      setComment("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Mohon lengkapi ulasan Anda");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Tulis Ulasan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div>
            <p className="text-sm font-medium mb-2">Produk</p>
            <p className="text-muted-foreground">{productName}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Rating *</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-current text-foreground"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} dari 5
                </span>
              )}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive mt-1">{errors.rating}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Ulasan Anda *</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda dengan produk ini..."
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {comment.length}/500 karakter
            </p>
            {errors.comment && (
              <p className="text-sm text-destructive mt-1">{errors.comment}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={() => {
                onOpenChange(false);
                setRating(0);
                setComment("");
                setErrors({});
              }}
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1 h-12">
              Kirim Ulasan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
