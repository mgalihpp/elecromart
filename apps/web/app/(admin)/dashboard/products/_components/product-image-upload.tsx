import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/empty";
import { Image, Image as ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

export const ProductImageUpload = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Format file tidak valid. Gunakan JPG, PNG, WEBP, atau GIF.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("Ukuran file terlalu besar. Maksimal 5MB.");
      return false;
    }

    return true;
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        const id = Math.random().toString(36).substring(7);
        const preview = URL.createObjectURL(file);
        newImages.push({ id, file, preview });
      }
    });

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
      toast.success(`${newImages.length} gambar berhasil ditambahkan`);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    processFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
    toast.success("Gambar dihapus");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Upload Gambar Produk</CardTitle>
        <CardDescription>
          Unggah gambar produk Anda dengan mudah
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-300 ease-in-out ${
            isDragging
              ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent"
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileInput}
          />

          <label
            htmlFor="file-upload"
            className="flex cursor-pointer flex-col items-center justify-center gap-4"
          >
            <div className="rounded-full bg-primary/10 p-6 transition-transform duration-300">
              <Upload className="h-12 w-12 text-primary" />
            </div>

            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground">
                Seret & lepas gambar di sini
              </p>
              <p className="text-sm text-muted-foreground">
                atau klik untuk memilih file
              </p>
            </div>

            <Button
              type="button"
              variant="default"
              size="lg"
              className="mt-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("file-upload")?.click();
              }}
            >
              Pilih Gambar
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              Format: JPG, PNG, WEBP, GIF • Maksimal: 5MB per file
            </p>
          </label>
        </div>

        {images.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gambar Terupload ({images.length})</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    images.forEach((img) => URL.revokeObjectURL(img.preview));
                    setImages([]);
                    toast.success("Semua gambar dihapus");
                  }}
                >
                  Hapus Semua
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="aspect-square">
                      <img
                        src={image.preview}
                        alt={image.file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="truncate text-sm font-medium">
                        {image.file.name}
                      </p>
                      <p className="text-xs text-white/80">
                        {(image.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {images.length === 0 && (
          <Card className="text-center">
            <CardContent className="py-12">
              <Empty className="border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Image />
                  </EmptyMedia>
                  <EmptyTitle>Foto produk kosong</EmptyTitle>
                  <EmptyDescription>
                    Unggah berkas untuk menambahkan foto produk.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button type="button" variant="outline" size="sm">
                    Unggah Berkas
                  </Button>
                </EmptyContent>
              </Empty>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
