/** @format */

import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function useFirebaseImage(
  setValue,
  getValues,
  imageName = null,
  cb
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  if (!setValue || !getValues) return;

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progressPercent + "% done");
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing to upload");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("handleUploadImage ~ error:", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    console.log("onSelectImage ~ file:", file);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
        setImage("");
      });
  };

  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };

  return {
    progress,
    image,
    setImage,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  };
}
