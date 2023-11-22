import { ConfigProvider, Tabs } from "antd";
import { useState } from "react";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import ContentRenderer from "./ContentRenderer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Heading from "./Heading";

const FormWithTabs = ({
  data,
  tele,
  submitCall,
  submitCallLoader,
  heading,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  //the values are stored in the context
  const { allValues, setAllValues, setAudioBlob, setAudio, audio, darkMode } =
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
          `https://api.telegram.org/bot${queryParams.get(
            "bot_token"
          )}/sendMessage`,
          {
            chat_id: queryParams.get("chat_id"),
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

  async function dumpingDataInSheet() {
    setSubmitLoader(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";

    let end_point = `/telegram_app/task/advisory_task/?task_category=${
      window.location.href.includes("advisory-dissemination")
        ? "Advisory Dissemination"
        : "Record Advisory Adoption"
    }&chat_id=${queryParams.get("chat_id")}`;

    let url = baseUrl + end_point;
    let taskid = queryParams.get("task_id");

    let data = { ...allValues };

    if (taskid) {
      data["task_id"] = taskid;
    }
    try {
      let response = await axios.post(url, data);
      if (response.status == 201) {
        // communincatingWithBotForSuccessMessaege();
      }
      setSubmitLoader(false);
    } catch (error) {
      console.log(error, "Error");
      setSubmitLoader(false);
    }
    tele.close();
  }

  async function communincatingWithBotForSuccessMessaege() {
    const pathname = window.location.pathname;

    let message =
      "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";

    // Check if the pathname contains "/assessment"
    if (pathname.includes("/assessment")) {
      // Perform your task or logic here
      message =
        "आपका उत्तर सबमिट किया गया है! धन्यवाद आपके सहयोग के लिए, यह हमारे कार्यक्रम को और भी बेहतर बनाने में मदद करेगा।";
    }
    axios
      .post(
        `https://api.telegram.org/bot${queryParams.get(
          "bot_token"
        )}/sendMessage`,
        {
          chat_id: queryParams.get("chat_id"),
          text: message,
          // ...allValues,
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
  }

  const handleSubmit = (values) => {
    // You can add your logic here
    // };
    if (tabValueSelected == data.length) {
      dumpingDataInSheet();
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
        setAudio(value);
      } else if (type == "upload") {
        return {
          ...prev,
          [name]: value,
        };
      } else if (type == "radio") {
        return {
          ...prev,
          [name]: value,
        };
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
        submit={() => (submitCall ? submitCall() : handleSubmit())}
        submitLoader={submitCall ? submitCallLoader : submitLoader}
      />
    </Tabs.TabPane>
  ));

  return (
    <div className={`farmer_profile_main_box ${darkMode ? "dark" : "light"}`}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: "#0088cc",
              itemActiveColor: "#0088cc",
              itemColor: "#0088cc",
              itemSelectedColor: "#0088cc",
            },
          },
        }}
      >
        {heading && <Heading value={heading} />}

        <Tabs
          in
          defaultActiveKey={tabValueSelected}
          activeKey={tabValueSelected}
          onChange={setTabValueSelected}
          rootClassName={data?.length == 1 ? "hide_the_tabs" : ""}
        >
          {loading ? "" : tabs}
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default FormWithTabs;
