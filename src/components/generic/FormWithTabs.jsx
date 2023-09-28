import { Tabs } from "antd";
import { useState } from "react";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import ContentRenderer from "./ContentRenderer";

const FormWithTabs = ({ data, tele }) => {
  //the values are stored in the context
  const { allValues, setAllValues, setAudioBlob, setAudio, audio } =
    useMyContext();
  const [tabValueSelected, setTabValueSelected] = useState("1");
  const buttonsSecond = [
    tabValueSelected == "1"
      ? { label: "", value: "", onClick: () => handleNextOrSubmit(-1) }
      : {
          label: "Back",
          value: "back",
          onClick: () => handleNextOrSubmit(-1),
        },
    { label: "Clear All", value: "clear", onClick: () => handleClearAll(0) },
    {
      label: tabValueSelected == data.length ? "Submit" : "Next",
      value: "next",
      onClick: () => handleNextOrSubmit(1),
    },
  ];

  const mapping = {
    input: "input",
    date_field: "date",
    select: "select",
    checkbox: "checkbox",
  };

  const handleClearAll = (first, second) => {
    // Implement your clear logic here
  };

  const handleNextOrSubmit = (first) => {
    if (tabValueSelected == data.length) {
      tele.sendData(JSON.stringify("Form Submitted Successfully!"));
      tele.close();
    } else {
      setTabValueSelected((prevValue) =>
        (parseInt(prevValue) + first).toString()
      );
    }
  };
  const handleSubmit = (values) => {
    console.log(values);
    if (tabValueSelected == data.length) {
      tele.sendData(JSON.stringify("hello"));
      //   tele.answerWebAppQuery(tele.initDataUnsafe?.user?.query_id, "done");
      //     axios
      //   .post(`https://api.telegram.org/bot${BOT_TOKEN}/answerWebAppQuery`, {
      //     chat_id: props.tele.initDataUnsafe.user.id || "1465932798",
      //     text: "Thanks for giving feedback!",
      //   })
      //   .then(() => {
      //     console.log(props.tele.close());
      //   })
      //   .catch(() => {
      //     alert("Some error occured!");
      //   });
      tele.close();
    } else {
      setTabValueSelected((prevValue) => (parseInt(prevValue) + 1).toString());
    }
  };

  const handleChangeTyping = (e, name, type, value) => {
    setAllValues((prev) => {
      if (type === "checkbox") {
        let exist = prev[name] ?? {};
        if (exist[value]) {
          delete exist[value];
        } else {
          exist[value] = e.target.checked;
        }
        return {
          ...prev,
          [name]: exist,
        };
      } else if (type === "date") {
        return {
          ...prev,
          [name]: value,
        };
      } else if (type == "audio") {
        console.log("value", value);
        setAudio(value);
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const tabs = data.map((each) => (
    <Tabs.TabPane key={each.key} tab={each.label}>
      <ContentRenderer
        data={each.data}
        buttons={buttonsSecond}
        handleChangeTyping={handleChangeTyping}
        allValues={allValues}
        submit={() => handleSubmit()}
      />
    </Tabs.TabPane>
  ));

  return (
    <div className="farmer_profile_main_box">
      <Tabs
        defaultActiveKey={tabValueSelected}
        activeKey={tabValueSelected}
        onChange={setTabValueSelected}
      >
        {tabs}
      </Tabs>
    </div>
  );
};

export default FormWithTabs;
