import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { Button } from "antd";

const CustomCamera = (props) => {
  const { setAllValues, allValues } = useMyContext();
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  console.log("🚀 ~ file: CustomCamera.jsx:7 ~ CustomCamera ~ g:", image);

  return (
    <div
      style={{
        visibility: props.enableCamera ? "visible" : "hidden",
        maxWidth: "300px",
      }}
    >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "20px",
            width: "100%",
            maxWidth,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              let value = camera.current.takePhoto();
              setImage(value);
              props.handleChangeTyping(
                "",
                props.element.key,
                props.element.type,
                value
              );
            }}
          >
            Take photo
          </Button>
          <Button
            danger
            type="primary"
            onClick={() => {
              if (camera.current) {
                const result = camera.current.switchCamera();
                console.log(result);
              }
            }}
          >
            Toggle Camera
          </Button>
          {/* <Button
            // type="primary"
            onClick={() => {
              props.setEnableCamera(false);
            }}
          >
            Close Camera
          </Button> */}
        </div>

        {image && (
          <img height={100} width={200} src={image} alt="Taken photo" />
        )}
      </div>
    </div>
  );
};

export default CustomCamera;
