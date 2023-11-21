import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
// import { Button } from "antd";

//mui imports
import Button from "@mui/material/Button";

const CustomCamera = (props) => {
  const { allValues } = useMyContext();
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
              className="primary_button"
              // type="primary"
              onClick={(event) => {
                event.preventDefault();

                let value = camera.current.takePhoto();
                console.log(
                  "🚀 ~ file: CustomCamera.jsx:48 ~ CustomCamera ~ value:",
                  value
                );
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
              className="secondary_button"
              danger
              type="primary"
              onClick={(event) => {
                event.preventDefault();
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
            justifyContent: "start",
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
              className="camera_retake_click_picture_button primary_button"
              variant="contained"
              // type="dashed"
              onClick={() => {
                props.setEnableCamera(true);
              }}
            >
              {allValues[props.element.key] ? "Retake" : "Click Picture"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCamera;
