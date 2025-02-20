import React from "react";
import axios from "axios";
const FileUpload = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profile", file);
    axios
      .post("https://generateapi.onrender.com/api/FileUpload", formData, {
        headers: {
          Authorization: "6vwRxOHIZJUpboK4",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="file" name="profile" onChange={handleFileUpload} />
    </div>
  );
};
export default FileUpload;
