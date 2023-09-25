/* eslint-disable react/prop-types */
import { Form, Input, DatePicker, Select, Checkbox, Button } from "antd";
const { Option } = Select;

const ContentRenderer = (props) => {
  console.log(props.allValues, props.buttonsFirst);

  return (
    <>
      <Form layout="vertical" style={{ textAlign: "left" }} scrollToFirstError>
        {/* The JSON array representing the form elements */}
        {props.data.map((element, index) => (
          <Form.Item
            key={index}
            label={element.label}
            name={element.key}
            // initialValue={props.searchParams.get(`${element.key}`)}
            rules={[
              {
                required: true,
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
              />
            ) : element.type === "date" ? (
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date, dateString) =>
                  props.handleChangeTyping(
                    "",
                    element.key,
                    element.type,
                    dateString
                  )
                }
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
                {element.select_option.map((option, optionIndex) => (
                  <div
                    style={{
                      width: "100%",
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
                ))}
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
            ) : null}
          </Form.Item>
        ))}
      </Form>
      <div style={{ marginTop: "20px" }}>
        {props.buttons.map((button, index) => (
          <Button
            key={index}
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ContentRenderer;
