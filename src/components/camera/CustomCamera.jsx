import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const CustomCamera = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [frontCameraOn, setfrontCameraOn] = useState(false);
  console.log(
    "🚀 ~ file: CustomCamera.jsx:8 ~ CustomCamera ~ frontCameraOn:",
    frontCameraOn
  );
  return (
    <div>
      <Camera
        // facingMode={frontCameraOn ? "user" : "environment"}
        aspectRatio={2}
        ref={camera}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => setImage(camera.current.takePhoto())}
        >
          Take photo
        </button>
        <button
          type="button"
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        >
          Toggle Camera
        </button>
        {image && (
          <img height={100} width={200} src={image} alt="Taken photo" />
        )}
      </div>
    </div>
  );
};

export default CustomCamera;
