// import { Button } from "antd";
import Button from "@mui/material/Button";

const CustomButton = (props) => {
  const { text, onClick, disable, classes, id, value } = props;

  return (
    <>
      <Button
        loading={props.submitLoader ?? false}
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
