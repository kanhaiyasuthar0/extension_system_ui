import { Chip, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Image, Modal } from "antd";
// import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// const { TextArea } = Input;
import { Upload, message } from "antd";
import { useEffect, useState } from "react";
// import { ReactMic } from "react-mic";
import { useSearchParams } from "react-router-dom";
import recordImage from "../assets/record.svg";
import uploadImage from "../assets/upload.svg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import AudioRecordingComponent from "../components/generic/AudioRecordingComponent";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import CustomCamera from "../components/camera/CustomCamera";
import { useMyContext } from "../contexts/ExtensionSysytemContext";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import PropTypes from "prop-types";
import Heading from "../components/generic/Heading";
const RatingFeedback = (props) => {
  const [queryParams, setSearchParams] = useSearchParams();
  const { setImage, image } = useMyContext();
  const [value, setValue] = useState(0);
  const [selectedTag, setSelectedTags] = useState([]);
  const [other, setOther] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [otherConcern, setOtherConcern] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64Audio, setbase64Audio] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showModalCamera, setShowModalCamera] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleShowModalCamera = () => {
    setShowModalCamera(true);
    setPreviewOpen(false);
    setPreviewImage("");
    setPreviewTitle("");
    setFileList([]);
    let button = document.getElementsByClassName("ant-upload-list-item-action");
    button[0]?.click();
  };
  const handleClickedImage = (some, key, type, value) => {
    setImageObject({ image: value });
  };
  const [feedbackData, setFeedbackData] = useState({
    message_id: "",
    rating: null,
    tags: [],
    tag_other: "",
    description: "",
    images: [],
    audios: [],
  });

  const [audio, setAudio] = useState({
    isRecording: false,
    audioBlob: null,
  });

  const [fileList, setFileList] = useState([]);
  const [imageObject, setImageObject] = useState({});

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = async (blob) => {
    const base64Audio = await blobToBase64(blob);
    setbase64Audio(base64Audio);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    const audioTrackDiv = document.getElementById("audio_track");
    audioTrackDiv.innerHTML = "";
    audioTrackDiv.appendChild(audio);

    // document.body.appendChild(audio);
  };

  const handleBeforeUpload = (file) => {
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:102 ~ handleBeforeUpload ~ file:",
      file
    );
    // Check if the uploaded file is an image
    if (file.type.indexOf("image/") === 0) {
      // Convert the image to JPEG base64 format
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(
          "🚀 ~ file: RatingFeedback.jsx:112 ~ handleBeforeUpload ~ reader:",
          reader.result
        );
        setImageToShow(reader.result);
        // Save the base64 image to the imageObject
        const base64Data = reader.result.split(",")[1];
        setImageObject({ image: base64Data });
        setImage(null);
        setShowModalCamera(false);
      };

      // Add the file to the fileList for display in the UI
      setFileList([file]);

      return false; // Prevent default upload behavior
    } else {
      message.error("You can only upload images!");
      return false; // Prevent default upload behavior
    }
  };
  const [allTags, setAllTags] = useState([]);

  const [allLabels, setAllLabels] = useState(null);
  function getAlllabels() {
    axios
      .get(
        `${queryParams.get(
          "base_url"
        )}telegram_app/get_feedback_labels/?chat_id=${queryParams.get(
          "chatid"
        )}`
      )
      .then((response) => {
        setAllLabels(response.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: RatingFeedback.jsx:19 ~ getAllFeedbackTags ~ error:",
          error
        );
      });
  }

  function getAllFeedbackTags() {
    axios
      .get(
        `${queryParams.get(
          "base_url"
        )}telegram_app/get_feedback_tags/?chat_id=${queryParams.get("chatid")}`
      )
      .then((response) => {
        setAllTags(response.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: RatingFeedback.jsx:19 ~ getAllFeedbackTags ~ error:",
          error
        );
      });
    // setAllTags([
    //   {
    //     id: 1,
    //     name: "Incorrect Information",
    //   },
    //   {
    //     id: 2,
    //     name: "Incomplete Content",
    //   },
    //   {
    //     id: 3,
    //     name: "No Relavant Answers",
    //   },
    //   {
    //     id: 4,
    //     name: "Difficulty Level",
    //   },
    // ]);
  }

  function handleClick(eachTag) {
    let arr = selectedTag; // Assuming 'selectedTag' is an array
    let index = arr.indexOf(eachTag?.id);

    if (index > -1) {
      // If 'eachTag?.id' exists in the 'selectedTag' array, remove it
      arr.splice(index, 1);
    } else {
      // If 'eachTag?.id' doesn't exist in the 'selectedTag' array, add it
      arr.push(eachTag?.id);
    }

    setSelectedTags([...arr]);
  }

  function submitFeedbackData() {
    setisLoading(true);
    let message_id = queryParams.get("message_id");

    let resource_id = queryParams.get("resource_id");

    let key = null;
    let id = null;
    if (message_id) {
      key = "message_id";
      id = message_id;
    } else if (resource_id) {
      key = "resource_id";
      id = resource_id;
    } else {
      return;
    }

    let body = {
      rating: value,
      tags: value == 5 ? [] : selectedTag,
      tag_other: value == 5 ? "" : other ? otherConcern : "",
      description: textAreaContent,
      images: imageObject["image"] ? [imageObject["image"]] : [],
      audios: [base64Audio],
      chat_id: queryParams.get("chatid"),
    };
    body[key] = id;

    axios
      .post(`${queryParams.get("base_url")}telegram_app/post_feedback/`, body)
      .then(() => {
        setisLoading(false);
        props.tele.close();
      })
      .catch((error) => {
        // sendMessageToUserOnBot();
        setisLoading(false);
        props.tele.close();

        console.log(
          "🚀 ~ file: RatingFeedback.jsx:19 ~ getAllFeedbackTags ~ error:",
          error
        );
      });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function clearForm() {
    setValue(-1);
    setFileList([]);
    setAudio({
      isRecording: false,
      audioBlob: null,
    });
    setTextAreaContent("");
    setSelectedTags([]);
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleCancelPreview = () => {
    setPreviewOpen(false);
  };

  useEffect(() => {
    getAlllabels();
    getAllFeedbackTags();
  }, []);
  useEffect(() => {
    let main_audio_recorder = document.getElementById("main_audio_recorder");
    if (main_audio_recorder) {
      // Find the img element inside the div
      const imgElement = main_audio_recorder.querySelector("img");

      if (imgElement) {
        // Update the src attribute of the img element
        imgElement.src = recordImage;
      }
    }
  });
  return (
    <div className="feedback-form">
      {/* <div> */}

      <Heading value={allLabels?.feedback_form ?? "Feedback form"} />
      <Typography style={{ margin: "15px 0px 10px 0px" }} component="legend">
        {allLabels?.how_would_you_rate_this_answer ?? "How would you rate this"}
        {queryParams.get("message_id") ? " answer" : " video"}?
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          console.log(
            "🚀 ~ file: RatingFeedback.jsx:304 ~ RatingFeedback ~ newValue:",
            newValue
          );
          if (newValue == 5) {
            setOtherConcern("");
            setOther(false);
            setSelectedTags([]);
          }
          setValue(newValue);
        }}
        size="large"
      />
      {/* </div> */}
      {value <= 4 && (
        <div
          style={{
            margin: "10px 0px",
            transition: "all 0.1s",
            //   visibility: value <= 4 ? "visible" : "hidden",
          }}
        >
          <Typography
            component="legend"
            style={{ margin: "15px 0px 10px 0px" }}
          >
            {allLabels?.please_select_one_or_more_issues ??
              "Please select one or more issues."}
          </Typography>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "10px",
              padding: "10px",
            }}
          >
            {allTags.map((eachTag, index) => {
              return (
                <div
                  key={index}
                  //   style={{ margin: "5px 10px", display: "inline-block" }}
                >
                  <Chip
                    onClick={() => {
                      if (index === allTags.length - 1) {
                        setOtherConcern("");
                        setOther(!other);
                      } else {
                        handleClick(eachTag);
                      }
                    }}
                    label={eachTag.name}
                    variant={
                      selectedTag.includes(eachTag?.id) || other
                        ? "outlined"
                        : "outlined"
                    }
                    style={{
                      background: selectedTag.includes(eachTag?.id)
                        ? "#B7B7B7"
                        : "",
                      width: "100%",
                    }}
                  />
                </div>
              );
            })}
            {/* <Chip
              onClick={() => {
                setOtherConcern("");
                setOther(!other);
              }}
              key={"other"}
              label={"Other"}
              variant={other ? "outlined" : "outlined"}
              // color={other ? "primary" : ""}
              style={{
                background: other ? "#B7B7B7" : "",
                color: other,
              }}
            /> */}
          </div>

          {other && (
            <div className="each_mui_component">
              <TextField
                fullWidth
                id="outlined-basic"
                label={allLabels?.please_describe_it ?? "Please describe it"}
                variant="outlined"
                style={{ marginTop: "10px" }}
                value={otherConcern}
                onChange={(e) => setOtherConcern(e.target.value)}
                placeholder="Please describe it"
                maxLength={50}
                //   size="large"
              />
            </div>
            // <Input
            // //   style={{ marginTop: "10px" }}
            // //   value={otherConcern}
            // //   onChange={(e) => setOtherConcern(e.target.value)}
            // //   placeholder="Please describe it"
            // />
          )}
        </div>
      )}

      <div>
        {/* <Typography component="legend" style={{ margin: "15px 0px 10px 0px" }}>
          Please provide details (Optional)
        </Typography> */}
        <div className="each_mui_component">
          <TextField
            // style={{ width: "80%" }}
            fullWidth
            id="outlined-multiline-static"
            label={
              allLabels?.please_provide_details_optional ??
              "Please provide details (Optional)"
            }
            multiline
            rows={4}
            //   defaultValue="Default Value"
            onChange={(e) => setTextAreaContent(e.target.value)}
            value={textAreaContent}
            // size="large"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "10px",
            margin: "10px 0px",
            flexDirection: "column",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "left",
                cursor: "pointer",
              }}
              onClick={showModal}
            >
              <Typography
                component="legend"
                style={{ margin: "15px 0px 10px 0px" }}
              >
                {allLabels?.upload_add_image ?? "Upload/Add Image"}
              </Typography>
              <img src={uploadImage} alt="uploadImage" />
            </div>
            {imageToShow && (
              <div
                style={{
                  border: "1px solid",
                  borderRadius: "5px",
                  textAlign: "left",
                  padding: "5px",
                  width: "100%",
                }}
              >
                <Image
                  src={imageToShow}
                  height={50}
                  width={50}
                  alt="setImageToShow"
                />
                <span style={{ margin: "5px" }}>Attached file</span>
              </div>
            )}

            <Modal
              title={allLabels?.upload_add_image ?? "Upload / Add Image"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={allLabels?.ok ?? "OK"}
              cancelText={allLabels?.cancel ?? "CANCEL"}
              // style={{ height: "400px" }}
              width={"350px"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  gap: "25px",
                  alignItems: "center",
                  // height: showModalCamera ? "300px" : "150px",
                  padding: "20px",
                }}
              >
                {true && (
                  <div style={{ cursor: "pointer", textAlign: "center" }}>
                    <Upload
                      accept=".jpg, .jpeg, image/jpeg, image/jpg"
                      maxCount={1}
                      // fileList={fileList}
                      customRequest={() => false} // Disable default upload request
                      beforeUpload={handleBeforeUpload}
                      onRemove={(file) => {
                        const index = fileList.indexOf(file);
                        const newFileList = fileList.slice();
                        newFileList.splice(index, 1);
                        setFileList(newFileList);
                      }}
                      onPreview={handlePreview}
                      listType="picture"
                      // style={{ height: "10px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          component="legend"
                          style={{
                            margin: "15px 0px 10px 0px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            border: "1px solid",
                            borderRadius: "5px",
                            padding: "10px",
                          }}
                        >
                          <div>{allLabels?.upload ?? "Upload"}</div>
                          <FileUploadIcon />
                        </Typography>
                        {/* <img src={uploadImage} alt="uploadImage" /> */}
                      </div>
                    </Upload>
                  </div>
                )}
                {true && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    style={{ border: "1px solid" }}
                  />
                )}
                <div
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {!showModalCamera ? (
                    <Typography
                      component="legend"
                      style={{
                        margin: "15px 0px 10px 0px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        border: "1px solid",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      onClick={handleShowModalCamera}
                    >
                      <div>{allLabels?.camera ?? "Camera"}</div>
                      <CameraAltIcon />
                    </Typography>
                  ) : (
                    <CustomCamera
                      enableCamera={showModalCamera}
                      handleChangeTyping={handleClickedImage}
                      setEnableCamera={
                        () => {
                          setPreviewOpen(false);
                          setPreviewImage("");
                          setPreviewTitle("");
                          setFileList([]);
                          let button = document.getElementsByClassName(
                            "ant-upload-list-item-action"
                          );
                          button[0]?.click();
                        }
                        // setImageObject({})
                      }
                      element={{ key: "clicked_image", type: "upload" }}
                      setImage={setImage}
                      image={image}
                      setImageToShow={setImageToShow}
                    />
                  )}
                </div>
              </div>
            </Modal>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                cursor: "pointer",
              }}
            ></div>
          </div>
          <div style={{ cursor: "pointer" }}>
            <div
              id="main_audio_recorder"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "left",
                transition: "all 1s ease-in",
              }}
            >
              <Typography
                component="legend"
                style={{ margin: "15px 0px 10px 0px" }}
              >
                {allLabels?.record_voice_audio ?? "Record voice/audio"}
              </Typography>
              <div>
                <AudioRecorder
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  recorderControls={recorderControls}
                  // downloadOnSavePress={true}
                  // downloadFileExtension="mp3"
                  showVisualizer={true}
                />
              </div>
              {/* <br />
            <button onClick={recorderControls.stopRecording}>
              Stop recording
            </button>
            <br /> */}
            </div>
          </div>
          {/* <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          > */}

          {/* <div style={{ maxWidth: "100%" }}>
              <ReactMic
                record={audio.isRecording}
                onData={onData}
                onStop={onStop}
                strokeColor="#000000"
                backgroundColor="#FFF"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                  gap: "25px",
                  margin: "10px 0px",
                }}
              >
                <button type="button" onClick={startRecording}>
                  Start
                </button>
                <button type="button" onClick={stopRecording}>
                  Stop
                </button>
              </div>
            </div>
            {audio.audioBlob && (
              <audio controls src={audio.audioBlob.blobURL} />
            )} */}
          {/* </Modal> */}
          <div id="audio_track"></div>
          {/* {audio.audioBlob && <audio controls src={audio.audioBlob.blobURL} />} */}
        </div>
      </div>

      {/* <AudioRecordingComponent /> */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Button
          key={"submit"}
          type={"submit"}
          style={{
            marginRight: "10px",
            margin: "auto",
            display: "block",
            width: "100%",
            border: "1px solid #0088CC",
            color: "#0088CC",
          }}
          htmlType="submit"
          // onClick={button.value == "next" ? () => null : button.onClick}
          onClick={clearForm}
          className="secondary_button"
        >
          {allLabels?.clear ?? "CLEAR"}
        </Button>
        {/* {console.log(!otherConcern, selectedTag)} */}
        <Button
          loading={isLoading}
          disabled={
            value < 0
              ? true
              : value != 5 && other && !otherConcern
              ? true
              : value != 5 && !other && selectedTag.length <= 0
              ? true
              : false
          }
          key={"submit"}
          type={"submit"}
          style={{
            marginRight: "10px",
            margin: "auto",
            display: "block",
            width: "100%",
            color: "white",
            background:
              value < 0
                ? true
                : value != 5 && other && !otherConcern
                ? true
                : value != 5 && !other && selectedTag.length <= 0
                ? true
                : "#0088CC",
          }}
          htmlType="submit"
          // onClick={button.value == "next" ? () => null : button.onClick}
          onClick={submitFeedbackData}
          className="primary_button"
        >
          {allLabels?.submit ?? "SUBMIT"}
        </Button>

        <Modal
          className="modal_in_feedback_form"
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};
RatingFeedback.propTypes = {
  tele: PropTypes.shape({
    close: PropTypes.func,
    // Add more specific prop types for other properties if needed
  }).isRequired,
};

export default RatingFeedback;
