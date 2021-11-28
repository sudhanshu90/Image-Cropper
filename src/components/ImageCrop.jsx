import { useState } from "react";
import "./image.css";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";

function ImageCrop() {
  const [srcImg, setSrcImg] = useState();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 7 });
  const [result, setResult] = useState(null);
  const [hideinst, sethideinst] = useState(false);
  const [area, setarea] = useState(false);
  const [axis, setaxis] = useState(true);



  const handleImage = async (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
    sethideinst(true);
  };

  const getCroppedImg = () => {
      if(crop.width || crop.height != 0){
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      setarea(false);
      setaxis(false);

      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResult(base64Image);
      }
     
     else{
       
            setarea(true);
 }
};


  return (
    <div className="container">
      <h5 className="header_title">Image Cropper Application</h5>

      <h3 className={`header_sec_title ${hideinst ? "active" : ""}`}>
        *Select Image you want to crop
      </h3>
    
      <div className="file_select">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="select_file"
        />
      </div>
      <h3 className={`area ${area ? "active" : ""}`}>
        *Please crop image 
      </h3>

      <div>
        {srcImg && (
          <div className="crop_image_holder">
            <ReactCrop
              style={{ maxWidth: "70%", margin: "0 auto" }}
              src={srcImg}
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
            />

            <button className="cropButton" onClick={getCroppedImg}>
              Crop
            </button>
          </div>
        )}
        <div className={`coordinates ${axis ? 'active' : ""}`}>
        <h3>-x : {parseFloat(crop.x).toFixed(0)}, -y : {parseFloat(crop.y).toFixed(0)}, height : {parseFloat(crop.height).toFixed(0)}, width : {parseFloat(crop.width).toFixed(0)}</h3>
        </div>
        {result && (
          <div className="result_image">
            <img src={result} alt="cropped image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCrop;
