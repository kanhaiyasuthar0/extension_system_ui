/* eslint-disable react/prop-types */
import { Form, Input, DatePicker, Select, Checkbox, Button } from "antd";
const { Option } = Select;
import dayjs from "dayjs";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { ReactMic } from "react-mic";
import { useRef } from "react";
const ContentRenderer = (props) => {
  console.log(
    "🚀 ~ file: ContentRenderer.jsx:9 ~ ContentRenderer ~ props:",
    props
  );
  const formRef = useRef();

  const { audio, setAudio, darkMode } = useMyContext();
  console.log(
    "🚀 ~ file: ContentRenderer.jsx:16 ~ ContentRenderer ~ darkMode:",
    darkMode
  );
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
  console.log(props.allValues, props.buttonsFirst);

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
                required: element.required,
                message: `Please enter ${element.label}!`,
              },
            ]}
          >
            {element.type === "input" ? (
              <Input
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
                  console.log(date, "Date", dateString);
                  props.handleChangeTyping(
                    "",
                    element.key,
                    element.type,
                    dateString
                  );
                }}
                defaultValue={dayjs(element.value)}
              />
            ) : element.type === "select" ? (
              <Select
                name={element?.key}
                onChange={(e) =>
                  props.handleChangeTyping(e, element.key, element.type, e)
                }
              >
                {element.select_option.map((option, optionIndex) => (
                  <Option key={optionIndex} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            ) : element.type === "checkbox" ? (
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                {element.select_option.map((option, optionIndex) => {
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
                      {/* <Form.Item
    name={`${element.key}_${option + "-" + optionIndex}`}
    valuePropName="checked"
    // initialValue={props.searchParams
    //   .get(element.key)
    //   .replace(/[\[\]']/g, "")
    //   .split(",")
    //   .includes(option)}
    onClick={(e) =>
      props.handleChangeTyping(
        e,
        element.key,
        element.type,
        option
      )
    }
  > */}
                      {/* {console.log(props.allValues[element.key], "all")} */}
                      <Checkbox
                        name={element.key}
                        key={option}
                        defaultChecked={
                          props.allValues[element.key]
                            ? props.allValues[element.key][element.key]
                            : false
                        }
                        // checked={
                        //   props.allValues[element.key]
                        //     ? props.allValues[element.key][element.key]
                        //     : false
                        // }
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
            ) : null}
          </Form.Item>
        ))}
        <Form.Item>
          <div style={{ marginTop: "20px" }}>
            {props.buttons.map((button, index) =>
              button.label ? (
                <Button
                  id="main_form_button"
                  key={index}
                  type={button.value == "next" ? "primary" : "button"}
                  style={{
                    marginRight: "10px",
                    margin: "auto",
                    display: "block",
                    width: "100%",
                    // color: darkMode ? "white" : "black",
                  }}
                  htmlType="submit"
                  // onClick={button.value == "next" ? () => null : button.onClick}
                >
                  {button.label}
                </Button>
              ) : (
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
