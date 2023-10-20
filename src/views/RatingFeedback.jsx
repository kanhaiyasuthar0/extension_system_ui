import { Chip } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button, Input, Modal } from "antd";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import FileUploadIcon from "@mui/icons-material/FileUpload";
const { TextArea } = Input;
import { Upload, message } from "antd";
import { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import { useSearchParams } from "react-router-dom";
import recordImage from "../assets/record.svg";
import uploadImage from "../assets/upload.svg";
// import AudioRecordingComponent from "../components/generic/AudioRecordingComponent";

const RatingFeedback = () => {
  const [queryParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(0);
  const [selectedTag, setSelectedTags] = useState([]);
  const [other, setOther] = useState(false);
  const [textAreaContent, setTextAreaContent] = useState("");
  const [otherConcern, setOtherConcern] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64Audio, setbase64Audio] = useState("");
  const [isLoading, setisLoading] = useState(false);
  console.log(
    "🚀 ~ file: RatingFeedback.jsx:27 ~ RatingFeedback ~ base64Audio:",
    base64Audio
  );
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
  console.log(
    "🚀 ~ file: RatingFeedback.jsx:28 ~ RatingFeedback ~ imageObject:",
    imageObject
  );

  const handleBeforeUpload = (file) => {
    // Check if the uploaded file is an image
    if (file.type.indexOf("image/") === 0) {
      // Convert the image to JPEG base64 format
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Save the base64 image to the imageObject
        setImageObject({ image: reader.result });
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
  function getAllFeedbackTags() {
    axios
      .get(
        "https://farmerchat.farmstack.co/vistaar/telegram_app/get_feedback_tags/"
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: RatingFeedback.jsx:19 ~ getAllFeedbackTags ~ error:",
          error
        );
      });
    setAllTags([
      {
        id: 1,
        name: "Incorrect Information",
      },
      {
        id: 2,
        name: "Incomplete Content",
      },
      {
        id: 3,
        name: "No Relavant Answers",
      },
      {
        id: 4,
        name: "Difficulty Level",
      },
    ]);
  }

  function handleClick(eachTag) {
    // setFeedbackData((prev)=>{...prev, })
    let arr = selectedTag; // Assuming 'selectedTag' is an array
    let index = arr.indexOf(eachTag?.id);
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:92 ~ handleClick ~ index:",
      index
    );

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
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:132 ~ submitFeedbackData ~ message_id:",
      message_id
    );
    let resource_id = queryParams.get("resource_id");
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:134 ~ submitFeedbackData ~ resource_id:",
      resource_id
    );
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
      images: [imageObject["image"]],
      audios: [],
      chat_id: queryParams.get("chatid"),
    };
    body[key] = id;

    console.log(
      "🚀 ~ file: RatingFeedback.jsx:116 ~ submitFeedbackData ~ body:",
      body
    );

    axios
      .post(
        "https://farmerchat.farmstack.co/vistaar/telegram_app/post_feedback/",
        body
      )
      .then((response) => {
        console.log(response);
        sendMessageToUserOnBot();
        setisLoading(false);
      })
      .catch((error) => {
        sendMessageToUserOnBot();
        setisLoading(false);

        console.log(
          "🚀 ~ file: RatingFeedback.jsx:19 ~ getAllFeedbackTags ~ error:",
          error
        );
      });
  }

  const startRecording = () => {
    setAudio({ ...audio, isRecording: true });
  };

  const stopRecording = () => {
    setAudio({ ...audio, isRecording: false });
  };

  const onData = (recordedBlob) => {
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:224 ~ onData ~ recordedBlob:",
      recordedBlob
    );
    // setAudio({...audio, audioBlob: recordedBlob });
  };

  const blobToBase64 = (blob) => {
    console.log(blob, "blob");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      } else {
        reject(new Error("Invalid Blob object"));
      }
    });
  };

  const onStop = (recordedBlob) => {
    console.log(
      "🚀 ~ file: RatingFeedback.jsx:215 ~ onStop ~ recordedBlob:",
      recordedBlob
    );
    blobToBase64(recordedBlob)
      .then((base64String) => {
        console.log(
          "🚀 ~ file: RatingFeedback.jsx:228 ~ .then ~ base64String:",
          base64String
        );
        setbase64Audio(base64String);
      })
      .catch((error) => {
        console.log(error, "error");
      });
    setAudio({ ...audio, audioBlob: recordedBlob });
  };
  const resetAll = () => {
    formRef.current?.resetFields();
  };

  function sendMessageToUserOnBot() {
    axios
      .post(
        `https://api.telegram.org/bot${queryParams.get("bot")}/sendMessage`,
        {
          chat_id: queryParams.get("chatid"),
          text: message,
        }
      )
      .then(() => {
        props.tele.close();
      })
      .catch(() => {
        // alert("Some error occured!");
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
    getAllFeedbackTags();
  }, []);
  return (
    <div className="feedback-form">
      {/* <div> */}
      <Typography component="legend">
        How would you rate this{" "}
        {queryParams.get("message_id") ? "answer" : "video"}?
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
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
          <Typography component="legend">
            Please select one or more issues.
          </Typography>
          {allTags.map((eachTag, index) => {
            console.log(eachTag, "eachTag");
            return (
              <Chip
                onClick={() => handleClick(eachTag)}
                key={index}
                label={eachTag.name}
                variant={
                  selectedTag.includes(eachTag?.id) ? "outlined" : "filled"
                }
              />
            );
          })}

          <Chip
            onClick={() => setOther(!other)}
            key={"other"}
            label={"Other"}
            variant={other ? "outlined" : "filled"}
          />
          {other && (
            <Input
              style={{ marginTop: "10px" }}
              value={otherConcern}
              onChange={(e) => setOtherConcern(e.target.value)}
              placeholder="Please describe it"
              maxLength={50}
            />
          )}
        </div>
      )}

      <div>
        <Typography component="legend">
          Please provide details (Optional)
        </Typography>
        <TextArea
          rows={4}
          onChange={(e) => setTextAreaContent(e.target.value)}
          value={textAreaContent}
        />
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
                justifyContent: "left",
                alignItems: "center",
              }}
            >
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
                listType="picture-card"
                // style={{ height: "10px" }}
              >
                <div>
                  {/* <FileUploadIcon /> */}
                  <img src={uploadImage} alt="uploadImage" />
                </div>
              </Upload>

              {/* Display the uploaded image */}
              {/* {imageObject.image && (
                <div>
                  <img
                    src={imageObject.image}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )} */}
            </div>
          </div>
          <div onClick={showModal} style={{ cursor: "pointer" }}>
            {/* <KeyboardVoiceIcon /> */}
            <img src={recordImage} alt="recordImage" />
          </div>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div style={{ maxWidth: "100%" }}>
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
            )}
          </Modal>

          {audio.audioBlob && <audio controls src={audio.audioBlob.blobURL} />}
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
        >
          {"CLEAR"}
        </Button>
        {console.log(!otherConcern, selectedTag)}
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
        >
          {"SUBMIT"}
        </Button>

        <Modal
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

export default RatingFeedback;
