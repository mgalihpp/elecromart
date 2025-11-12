import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";

type DeleteProductDialogProps = {
  productId: string;
  children?: ReactNode;
};

export function DeleteProductDialog({
  productId,
  children,
}: DeleteProductDialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => api.product.delete(productId),
    onSuccess: () => {
      toast.success("Produk berhasil dihapus!");
      queryClient.refetchQueries({
        queryKey: ["products"],
      });
      router.push(`/dashboard/products`);
    },
    onError: () => {
      toast.error("Gagal menghapus produk");
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="destructive" className="w-full">
            <Trash2 />
            Hapus Produk
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus produk ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus
            data produk dari server kami.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/70"
            onClick={() => deleteProductMutation.mutate(productId)}
            disabled={deleteProductMutation.isPending || !productId}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
