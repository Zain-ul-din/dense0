import { uploadBlobToFireStorage } from "@/lib/firebase";
import { createImageUpload } from "novel/plugins";
import toast from "react-hot-toast";

const onUpload = (file: File) => {
  const promise = uploadBlobToFireStorage(
    new Blob([file], { type: file.type })
  );

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        const url = res;
        console.log(res);
        // preload the image
        const image = new Image();
        image.src = url;
        image.onload = () => {
          resolve(url);
        };
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e: any) => e.message
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 5) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  }
});
