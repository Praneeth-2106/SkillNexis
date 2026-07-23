import { useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await API.post("/upload", formData);

      setUploadedImage(res.data.imageUrl);

      alert("Image Uploaded Successfully");
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="container">
      <h1>Image Upload App</h1>

      <div className="upload-box">
  <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      /> </div>

      <br />
      <br />

      {preview && (
        <>
          <h3>Preview</h3>

          <img
    className="preview"
    src={preview}
    alt="Preview"
/>

          <br />
          <br />
        </>
      )}

      <button onClick={uploadImage}>
        Upload Image
      </button>

      <br />
      <br />

      {uploadedImage && (
        <>
          <h3>Uploaded Image</h3>

          <img
    className="uploaded"
    src={uploadedImage}
    alt="Uploaded"
/>        </>
      )}
    </div>
  );
}

export default App;