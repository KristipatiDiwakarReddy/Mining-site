import React from "react";
import "../css/ImagePan.css"; // CSS file
import img1 from "../images/pan.jpg";

const repeatedImages = Array.from({ length: 10 }).fill(img1); // repeat the same image 10 times

const ImagePan = () => {
  return (
    <div className="pan-container">
      <div className="image-strip">
        {repeatedImages.map((img, index) => (
          <img key={index} src={img} alt={`slide-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ImagePan;

// const ImagePan = () => {
//   return (
//     <div className="pan-container">
//       <div className="image-strip">
//         <img src="../images/pan.jpg" alt="pan" />
//         <img src="../images/pan.jpg" alt="pan-duplicate" />
//       </div>
//     </div>
//   );
// };



// import React from "react";
// import "./ImagePan.css";
// import img1 from "../images/pan.jpg";

// const repeatedImages = Array.from({ length: 10 }).fill(img1); // repeat the same image 10 times

// const ImagePan = () => {
//   return (
//     <div className="pan-container">
//       <div className="image-strip">
//         {repeatedImages.map((img, index) => (
//           <img key={index} src={img} alt={`slide-${index}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImagePan;

