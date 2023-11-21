/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  // DatePicker,
  // Select,
  // Checkbox,
  // Radio,
  Space,
  Button,
} from "antd";
// const { Option } = Select;
// import dayjs from "dayjs";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { ReactMic } from "react-mic";
import { useEffect, useRef, useState } from "react";
import CustomCamera from "../camera/CustomCamera";
import CustomButton from "../generic/CustomButton";
import moment from "moment";

//mui imports
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { indigo } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const ContentRenderForFarmerProfile = (props) => {
  const formRef = useRef();

  const { audio, setAudio, allValues, setAllValues } = useMyContext();
  console.log(
    "🚀 ~ file: ContentRenderer.jsx:23 ~ ContentRenderer ~ allValues:",
    allValues
  );
  const startRecording = () => {
    setAudio({ ...audio, isRecording: true });
  };

  const [enableCamera, setEnableCamera] = useState(false);

  const stopRecording = () => {
    setAudio({ ...audio, isRecording: false });
  };

  const onData = (recordedBlob) => {
    // setAudio({...audio, audioBlob: recordedBlob });
  };

  const onStop = (recordedBlob) => {
    setAudio({ ...audio, audioBlob: recordedBlob });
  };
  const resetAll = () => {
    formRef.current?.resetFields();
  };

  useEffect(() => {
    for (var key in allValues) {
      if (key == "date_of_birth") {
        formRef.current.setFieldValue(
          key,
          moment(allValues["date_of_birth"], "YYYY-MM-DD")
        );
        // moment(allValues["date_of_birth"], "YYYY-MM-DD");
      } else {
        formRef.current.setFieldValue(key, allValues[key]);
      }
    }
  }, [JSON.stringify(allValues)]);
  return (
    <>
      <Form
        ref={formRef}
        onFinish={props.submit}
        onReset={resetAll}
        layout="vertical"
        style={{ textAlign: "left", color: "white" }}
        scrollToFirstError
      >
        {/* The JSON array representing the form elements */}
        {props.data.map((element, index) => (
          <Form.Item
            key={index}
            label={element.showLabel ? element.label : false}
            name={element.key}
            // initialValue={allValues[element.key]}
            value={allValues[element.key]}
            rules={[
              {
                required:
                  element.type == "upload" ? false : element.required == "TRUE",
                message: `Please enter ${element.label}!`,
              },
            ]}
            className="each_mui_component_for_farmer_profile"
          >
            {element.type === "input" ? (
              <TextField
                key={element.key}
                style={{ width: "100%" }}
                id="outlined-basic123"
                label={element.label}
                variant="outlined"
                placeholder={element.label}
                type={element.format ?? "string"}
                size="large"
                onChange={(e) =>
                  props.handleChangeTyping(
                    e,
                    element.key,
                    element.type,
                    e.target.value
                  )
                }
                name={element.key}
                // aria-selected={allValues[element.key]}
                // focused={allValues[element.key]}
                // defaultValue={allValues[element.key]}
                value={allValues[element.key]}
                className="each_input_in_form"
                focused={allValues[element.key]}
              />
            ) : element.type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="YYYY-MM-DD"
                  // defaultValue={dayjs(element.value)}
                  onChange={(date, dateString) => {
                    let mainValue = date.toISOString().split("T")[0];
                    props.handleChangeTyping(
                      "",
                      element.key,
                      element.type,
                      mainValue
                    );
                  }}
                  className="date_fixer"
                  defaultValue={element.value}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ) : // <DatePicker
            //   format="YYYY-MM-DD"
            //   onChange={(date, dateString) => {
            //     props.handleChangeTyping(
            //       "",
            //       element.key,
            //       element.type,
            //       dateString
            //     );
            //   }}
            //   // defaultValue={dayjs(element.value)}
            // />
            element.type === "select" ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {element.label}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={element.label}
                  onClear={
                    () => (element.clearFn ? element.clearFn() : "")
                    // element.clearFn
                    //   ? element.clearFn
                    //   : () => console.log("cleared")
                  }
                  allowClear
                  mode={element.format == "multiple" ? "multiple" : ""}
                  name={element?.key}
                  onChange={(e) => {
                    props.handleChangeTyping(
                      e,
                      element.key,
                      element.type,
                      e.target.value
                    );
                    if (element.afterChange) {
                      element.afterChange(e.target.value);
                    }
                  }}
                  maxTagCount={"responsive"}
                  value={allValues[element.key]}
                  renderValue={() => allValues[element.key]}
                >
                  {element.select_option?.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : element.type === "checkbox" ? (
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                {element.select_option?.map((option, optionIndex) => {
                  return (
                    <div
                      style={{
                        width: element.mode === "examination" ? "50%" : "100%",
                        display:
                          element.mode === "examination"
                            ? "inline-block"
                            : "block",
                        overflow: "hidden",
                      }}
                      key={optionIndex}
                    >
                      <Checkbox
                        name={element.key}
                        key={option}
                        defaultChecked={
                          props.allValues[element.key]
                            ? props.allValues[element.key][element.key]
                            : false
                        }
                        onChange={(e) =>
                          props.handleChangeTyping(
                            e,
                            element.key,
                            element.type,
                            option
                          )
                        }
                      >
                        {option}
                      </Checkbox>
                      {/* </Form.Item>{" "} */}
                    </div>
                  );
                })}
              </div>
            ) : element.type === "textarea" ? (
              <Input.TextArea
                name={element.key}
                rows={4} // You can adjust the number of rows as needed
                placeholder={element.label}
                onChange={(e) =>
                  props.handleChangeTyping(
                    e,
                    element.key,
                    element.type,
                    e.target.value
                  )
                }
              />
            ) : element.type == "audio" ? (
              <div style={{ maxWidth: "100%" }}>
                <ReactMic
                  record={audio.isRecording}
                  onData={onData}
                  onStop={onStop}
                  strokeColor="#000000"
                  backgroundColor="#FFF"
                />
                <button type="button" onClick={startRecording}>
                  Start Recording
                </button>
                <button type="button" onClick={stopRecording}>
                  Stop Recording
                </button>
                {audio.audioBlob && (
                  <audio controls src={audio.audioBlob.blobURL} />
                )}
              </div>
            ) : element.type === "upload" ? (
              <>
                <CustomCamera
                  handleChangeTyping={props.handleChangeTyping}
                  element={element}
                  setEnableCamera={setEnableCamera}
                  enableCamera={enableCamera}
                />
                {/* ) : (
                    <Button onClick={() => setEnableCamera(true)}>
                      Open Camera
                    </Button>
                  )} */}
              </>
            ) : element?.type == "radio" ? (
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <Radio.Group
                  onChange={(e) =>
                    props.handleChangeTyping(
                      e,
                      element?.key,
                      element?.type,
                      e.target?.value
                    )
                  }
                  // value={value}
                >
                  <Space direction="vertical">
                    {element.select_option?.map((option, optionIndex) => {
                      return (
                        <Radio value={option}>{option}</Radio>

                        // <div
                        //   style={{
                        //     width: element.mode === "examination" ? "50%" : "100%",
                        //     display:
                        //       element.mode === "examination"
                        //         ? "inline-block"
                        //         : "block",
                        //     overflow: "hidden",
                        //   }}
                        //   key={optionIndex}
                        // >

                        //   <Checkbox
                        //     name={element.key}
                        //     key={option}
                        //     defaultChecked={
                        //       props.allValues[element.key]
                        //         ? props.allValues[element.key][element.key]
                        //         : false
                        //     }
                        //     onChange={(e) =>
                        //       props.handleChangeTyping(
                        //         e,
                        //         element.key,
                        //         element.type,
                        //         option
                        //       )
                        //     }
                        //   >
                        //     {option}
                        //   </Checkbox>
                        // </div>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </div>
            ) : null}
          </Form.Item>
        ))}

        <Form.Item>
          <div style={{ marginTop: "20px" }}>
            {props.buttons.map((button, index) =>
              button.label ? (
                <CustomButton
                  submitLoader={props.submitLoader}
                  type={button.value == "next" ? "primary" : "button"}
                  text={button.label}
                  key={index}
                  classes={"primary_button main_button"}
                  id="main_form_button"
                  value={button.value}
                ></CustomButton>
              ) : (
                // <Button
                //   id="main_form_button"
                //   key={index}
                //   type={button.value == "next" ? "primary" : "button"}
                //   style={{
                //     marginRight: "10px",
                //     margin: "auto",
                //     display: "block",
                //     width: "100%",
                //   }}
                //   htmlType="submit"
                //   // onClick={button.value == "next" ? () => null : button.onClick}
                // >
                //   {button.label}
                // </Button>
                ""
              )
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ContentRenderForFarmerProfile;
