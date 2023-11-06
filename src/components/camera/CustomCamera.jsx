import React, { useState, useRef, useEffect } from "react";
import { Camera } from "react-camera-pro";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { Button, Image } from "antd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const CustomCamera = (props) => {
  const { setAllValues, allValues } = useMyContext();
  const { image, setImage } = props;
  const camera = useRef(null);

  // console.log("🚀 ~ file: CustomCamera.jsx:7 ~ CustomCamera ~ g:", image);

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
                // console.log(
                //   "🚀 ~ file: CustomCamera.jsx:48 ~ CustomCamera ~ value:",
                //   value
                // );
                setImage(value);
                props.handleChangeTyping(
                  "",
                  props.element.key,
                  props.element.type,
                  value.split(",")[1]
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
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                gap: "20px",
                alignItems: "center",
                border: "0.5px solid grey",
                width: "80%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  height: "48px",
                  width: "48px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                  }}
                  src={image}
                />
              </div>
              <span>captured_image.jpeg</span>
              <DeleteOutlineIcon
                onClick={() => {
                  setImage(null);
                }}
              />
            </div>
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
