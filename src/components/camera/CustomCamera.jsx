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
        visibility: props.enableCamera ? "visible" : "visible",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      {props.enableCamera && (
        <Camera facingMode={"environment"} aspectRatio={2} ref={camera} />
      )}
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
          }}
        >
          {props.enableCamera && (
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
                props.setEnableCamera(false);
              }}
            >
              Take photo
            </Button>
          )}
          {props.enableCamera && (
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
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {image && (
            <img height={100} width={200} src={image} alt="Taken photo" />
          )}
          {!props.enableCamera && (
            <Button
              type="dashed"
              onClick={() => {
                props.setEnableCamera(true);
              }}
            >
              Retake
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCamera;
