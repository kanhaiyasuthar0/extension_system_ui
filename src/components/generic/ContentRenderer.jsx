/* eslint-disable react/prop-types */
import { Form, Input, DatePicker, Select, Checkbox, Radio, Space } from "antd";
const { Option } = Select;
// import dayjs from "dayjs";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { ReactMic } from "react-mic";
import { useRef } from "react";
import CustomCamera from "../camera/CustomCamera";
import CustomButton from "./CustomButton";
const ContentRenderer = (props) => {
  const formRef = useRef();

  const { audio, setAudio } = useMyContext();
  const startRecording = () => {
    setAudio({ ...audio, isRecording: true });
  };

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

  return (
    <>
      <Form
        ref={formRef}
        onFinish={props.submit}
        onReset={resetAll}
        layout="vertical"
        style={{ textAlign: "left" }}
        scrollToFirstError
      >
        {/* The JSON array representing the form elements */}
        {props.data.map((element, index) => (
          <Form.Item
            key={index}
            label={index + 1 + ". " + element.label}
            name={element.key}
            // initialValue={props.searchParams.get(`${element.key}`)}
            rules={[
              {
                required:
                  element.type == "upload" ? false : element.required == "TRUE",
                message: `Please enter ${element.label}!`,
              },
            ]}
          >
            {element.type === "input" ? (
              <Input
                type={element.format ?? "string"}
                size="large"
                placeholder={element.label}
                onChange={(e) =>
                  props.handleChangeTyping(
                    e,
                    element.key,
                    element.type,
                    e.target.value
                  )
                }
                name={element.key}
                defaultValue={element.value}
              />
            ) : element.type === "date" ? (
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date, dateString) => {
                  props.handleChangeTyping(
                    "",
                    element.key,
                    element.type,
                    dateString
                  );
                }}
                // defaultValue={dayjs(element.value)}
              />
            ) : element.type === "select" ? (
              <Select
                mode={element.format == "multiple" ? "multiple" : ""}
                name={element?.key}
                onChange={(e) =>
                  props.handleChangeTyping(e, element.key, element.type, e)
                }
                maxTagCount={"responsive"}
              >
                {element.select_option?.map((option, optionIndex) => (
                  <Option key={optionIndex} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
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
              <CustomCamera
                handleChangeTyping={props.handleChangeTyping}
                element={element}
              />
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
                  type={button.value == "next" ? "primary" : "button"}
                  text={button.label}
                  key={index}
                  classes={"main_button"}
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

export default ContentRenderer;
