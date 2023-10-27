/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Radio,
  Space,
  Button,
} from "antd";
const { Option } = Select;
// import dayjs from "dayjs";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import { ReactMic } from "react-mic";
import { useRef, useState } from "react";
import CustomCamera from "../camera/CustomCamera";
import CustomButton from "../generic/CustomButton";
// import CustomButton from "./CustomButton";
const FarmerProfileC = (props) => {
  const formRef = useRef();

  const { audio, setAudio, allValues, setAllValues } = useMyContext();
  console.log(
    "🚀 ~ file: ContentRenderer.jsx:23 ~ ContentRenderer ~ allValues:",
    allValues
  );
  const startRecording = () => {
    setAudio({ ...audio, isRecording: true });
  };
  const [form] = Form.useForm();

  const [enableCamera, setEnableCamera] = useState(true);

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

  const handleCamera = (event, key, type, value) => {
    console.log("handleCa, key, value", key, value);
    setAllValues((prev) => ({ ...prev, [key]: value })); // Assuming setAllValues is a function to update state
  };
  return (
    <div>
      <Form
        ref={formRef}
        form={form}
        onFinish={props.submitCall}
        onReset={resetAll}
        layout="vertical"
        style={{ textAlign: "left", color: "white" }}
        scrollToFirstError
      >
        {/* The JSON array representing the form elements */}
        <Form.Item
          label={1 + ". " + "Select the farmer"}
          name={"selected_farmer"}
          // initialValue={allValues[element.key]}
          value={allValues["selected_farmer"]}
          rules={[
            {
              required: true,
              message: `Please select farmer!`,
            },
          ]}
        >
          <Select
            // mode={element.format == "multiple" ? "multiple" : ""}
            // name={element?.key}
            onChange={(e) => {
              //   props.handleChangeTyping(e, element.key, element.type, e)

              setAllValues((prev) => ({ ...prev, selected_farmer: e }));
              props.get_farmer_profile(e);
            }}
            maxTagCount={"responsive"}
          >
            {props.farmers?.map((option, optionIndex) => (
              <Option key={optionIndex} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={2 + ". " + `Farmer's first name`}
          name={"first_name"}
          // value={allValues["first_name"]}
          initialValue={allValues["first_name"] ?? ""}
          rules={[
            {
              required: true,
              message: `Please enter Farmer's first name!`,
            },
          ]}
        >
          <Input
            placeholder="Farmer's first name"
            // ={allValues["first_name"]}
            onChange={(e) =>
              setAllValues((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label={3 + ". " + `Farmer's last name`}
          name={"last_name"}
          // initialValue={allValues[element.key]}
          value={allValues["last_name"]}
          rules={[
            {
              required: false,
              message: `Please enter Farmer's last name!`,
            },
          ]}
        >
          <Input
            placeholder="Farmer's last name"
            value={allValues["last_name"]}
            onChange={(e) =>
              setAllValues((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />
        </Form.Item>
        <Form.Item
          label={4 + ". " + "Date of birth"}
          name={"date_of_birth"}
          // initialValue={allValues[element.key]}
          value={allValues["date_of_birth"]}
          rules={[
            {
              required: true,
              message: `Please enter Date of birth!`,
            },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date, dateString) => {
              setAllValues((prev) => ({ ...prev, date_of_birth: dateString }));
            }}
            // defaultValue={dayjs(element.value)}
          />
        </Form.Item>
        <Form.Item
          label={5 + ". " + "Gender"}
          name={"gender"}
          // initialValue={allValues[element.key]}
          value={allValues["gender"]}
          rules={[
            {
              required: true,
              message: `Please enter Gender!`,
            },
          ]}
        >
          <Select
            // mode={element.format == "multiple" ? "multiple" : ""}
            // name={element?.key}
            onChange={(e) => {
              console.log(
                "🚀 ~ file: FarmerProfileC.jsx:170 ~ FarmerProfileC ~ e:",
                e
              );

              //   props.handleChangeTyping(e, element.key, element.type, e)

              setAllValues((prev) => ({ ...prev, gender: e }));
            }}
            maxTagCount={"responsive"}
          >
            <Option key={1} value={"Male"}>
              {"Male"}
            </Option>
            <Option key={2} value={"Female"}>
              {"Female"}
            </Option>

            {/* {element.select_option?.map((option, optionIndex) => (
                <Option key={optionIndex} value={option}>
                  {option}
                </Option>
              ))} */}
          </Select>
        </Form.Item>
        <Form.Item
          label={6 + ". " + "Add farmers photo"}
          name={"photo_data"}
          // initialValue={allValues[element.key]}
          value={allValues["photo_data"]}
          rules={[
            {
              required: false,
              message: `Please enter farmers photo!`,
            },
          ]}
        >
          <CustomCamera
            handleChangeTyping={handleCamera}
            element={{
              format: "jpg, jpeg, png",
              key: "photo_data",
              label: "Add farmers photo",
              type: "upload",
              required: "TRUE",
            }}
            setEnableCamera={setEnableCamera}
            enableCamera={enableCamera}
          />
        </Form.Item>
        <Form.Item
          label={7 + ". " + "Farmer's Aadhaar Number"}
          name={"aadhar_number"}
          // initialValue={allValues[element.key]}
          value={allValues["aadhar_number"]}
          rules={[
            {
              required: true,
              message: `Please enter Farmer's Aadhaar Number!`,
            },
          ]}
        >
          <Input
            placeholder="Farmer's Aadhaar Number"
            value={allValues["aadhar_number"]}
            type="number"
            onChange={(e) =>
              //   props.handleChangeTyping(e, element.key, element.type, e)

              setAllValues((prev) => ({
                ...prev,
                aadhar_number: e.target.value,
              }))
            }
          />
        </Form.Item>
        <Form.Item>
          <CustomButton
            // submitLoader={props.submitCall}
            // type="submit"
            text={"Submit"}
            key={11}
            classes={"main_button"}
            id="main_form_button"
            value={"Submit"}
            htmlType="submit"
          ></CustomButton>
        </Form.Item>

        {/* <Form.Item>
          <div style={{ marginTop: "20px" }}>
            {props.buttons.map((button, index) =>
              button.label ? (
                <CustomButton
                  submitLoader={props.submitLoader}
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
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default FarmerProfileC;
