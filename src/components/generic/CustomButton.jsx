import { Button } from "antd";

const CustomButton = (props) => {
  const { text, onClick, disable, classes, id, value } = props;

  return (
    <>
      <Button
        loading={props.submitLoader}
        disable={disable ?? false}
        type="primary"
        className={classes}
        // onClick={onClick}
        block
        id={id}
        htmlType="submit"
      >
        {text}
      </Button>
    </>
  );
};

export default CustomButton;
