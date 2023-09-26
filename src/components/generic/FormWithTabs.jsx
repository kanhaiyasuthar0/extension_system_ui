import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
import ContentRenderer from "./ContentRenderer";

const FormWithTabs = ({ data }) => {
  const { allValues, setAllValues } = useMyContext();
  console.log(
    "🚀 ~ file: FormWithTabs.jsx:10 ~ FormWithTabs ~ count:",
    allValues
  );
  const [tabValueSelected, setTabValueSelected] = useState("1");
  const buttonsSecond = [
    { label: "Back", value: "back", onClick: () => handleNextOrSubmit(-1, 0) },
    { label: "Clear All", value: "clear", onClick: () => handleClearAll(1, 0) },
    { label: "Next", value: "next", onClick: () => handleNextOrSubmit(1, 1) },
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

  const handleNextOrSubmit = (first, second) => {
    if (first === 2) {
      alert("Form submitted successfully!");
    } else {
      setTabValueSelected((prevValue) => (parseInt(prevValue) + 1).toString());
    }
  };

  const handleChangeTyping = (e, name, type, value) => {
    setAllValues((prev) => {
      if (type === "checkbox") {
        let exist = prev[name] ?? {};
        exist[value] = e.target.checked;
        return {
          ...prev,
          [name]: exist,
        };
      } else if (type === "date") {
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
