import { Tabs } from "antd";
import { useState } from "react";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import ContentRenderer from "./ContentRenderer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const FormWithTabs = ({ data, tele }) => {
  console.log("🚀 ~ file: FormWithTabs.jsx:10 ~ FormWithTabs ~ data:", data);
  //the values are stored in the context
  const { allValues, setAllValues, setAudioBlob, setAudio, audio } =
    useMyContext();
  const [queryParams, setSearchParams] = useSearchParams();

  const [tabValueSelected, setTabValueSelected] = useState("1");
  const buttonsSecond = [
    // tabValueSelected == "1"
    //   ? { label: "", value: "", onClick: () => handleNextOrSubmit(-1) }
    //   : {
    //       label: "Back",
    //       value: "back",
    //       onClick: () => handleNextOrSubmit(-1),
    //     },
    // { label: "Clear All", value: "clear", onClick: () => handleClearAll(0) },
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
    const pathname = window.location.pathname;
    let message =
      "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";

    // Check if the pathname contains "/assessment"
    if (pathname.includes("/assessment")) {
      // Perform your task or logic here
      message =
        "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";
      // You can add your logic here
    }

    if (tabValueSelected == data.length) {
      axios
        .post(
          `https://api.telegram.org/bot${queryParams.get("bot")}/sendMessage`,
          {
            chat_id: queryParams.get("chatid"),
            text: message,
          }
        )
        .then(() => {
          console.log(tele.close());
        })
        .catch(() => {
          alert("Some error occured!");
        });
      tele.close();
    } else {
      setTabValueSelected((prevValue) =>
        (parseInt(prevValue) + first).toString()
      );
    }
  };
  const handleSubmit = (values) => {
    console.log(values);
    const pathname = window.location.pathname;

    let message =
      "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";

    // Check if the pathname contains "/assessment"
    if (pathname.includes("/assessment")) {
      // Perform your task or logic here
      message =
        "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";
      // You can add your logic here
    }
    if (tabValueSelected == data.length) {
      axios
        .post(
          `https://api.telegram.org/bot${queryParams.get("bot")}/sendMessage`,
          {
            chat_id: queryParams.get("chatid"),
            text: message,
          }
        )
        .then(() => {
          console.log(tele.close());
        })
        .catch(() => {
          // alert("Some error occured!");
          console.log("error");
        });

      if (window.androidButton) {
        window.androidButton.onCapturedButtonClicked();
      }
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
