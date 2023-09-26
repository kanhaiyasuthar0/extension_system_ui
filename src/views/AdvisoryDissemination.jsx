import { Tabs } from "antd";
import { useEffect, useState } from "react";
import ContentRenderer from "../components/generic/ContentRenderer";
import database from "../data/db.json";
import { useSearchParams } from "react-router-dom";

const AdvisoryDissemination = () => {
  const [tabsAvailable, setTabsAvailable] = useState([]);
  const [tabValueSelected, setTabValueSelected] = useState("1");
  const [allValues, setAllValues] = useState({});
  const mapping = {
    input: "input",
    date_field: "date",
    select: "select",
    checkbox: "checkbox",
  };

  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({
    tab: 1,
  });
  const handleClearAll = (first, second) => {};

  const handleNextOrSubmit = (first, second) => {
    // console.log("clicked");
    if (first == 2) {
      alert("Form submitted successfully!");
    } else {
      setTabValueSelected(+first + 2);
    }
  };

  const handleChangeTyping = (e, name, type, value) => {
    setAllValues((prev) => {
      if (type == "checkbox") {
        let exist = prev[name] ?? {};
        exist[value] = e.target.checked;
        return {
          ...prev,
          [name]: exist,
        };
      } else if (type == "date") {
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
  const buttonsFirst = [
    { label: "Clear All", value: "clear", onClick: () => handleClearAll(0, 0) },
    { label: "Next", value: "next", onClick: () => handleNextOrSubmit(0, 1) },
  ];
  const buttonsSecond = [
    { label: "Back", value: "back", onClick: () => handleNextOrSubmit(-1, 0) },
    { label: "Clear All", value: "clear", onClick: () => handleClearAll(1, 0) },
    { label: "Next", value: "next", onClick: () => handleNextOrSubmit(1, 1) },
  ];
  const buttonsSubmit = [
    { label: "Clear All", value: "clear", onClick: () => handleClearAll(2, 0) },
    {
      label: "Submit",
      value: "submit",
      onClick: () => handleNextOrSubmit(2, 1),
    },
  ];
  const onChange = (value) => {
    // console.log(value);
  };

  useEffect(() => {
    const items = [
      {
        key: "1",
        label: "ADVISORY",
        children: (
          <ContentRenderer
            data={database.advisory_form}
            buttons={buttonsSubmit}
            handleChangeTyping={handleChangeTyping}
            searchParams={searchParams}
            allValues={allValues}
          />
        ),
      },
      // {
      //   key: "2",
      //   label: "LAND",
      //   children: (
      //     <ContentRenderer
      //       data={database.land_details_form}
      //       buttons={buttonsSecond}
      //       handleChangeTyping={handleChangeTyping}
      //       searchParams={searchParams}
      //       allValues={allValues}
      //     />
      //   ),
      // },
      // {
      //   key: "3",
      //   label: "LIVESTOCK",
      //   children: (
      //     <ContentRenderer
      //       data={database.livestock_form}
      //       buttons={buttonsSubmit}
      //       handleChangeTyping={handleChangeTyping}
      //       searchParams={searchParams}
      //       allValues={allValues}
      //     />
      //   ),
      // },
    ];
    setTabsAvailable(items);
  }, []);

  return (
    <>
      <div className="farmer_profile_main_box">
        <Tabs
          defaultActiveKey={tabValueSelected}
          activeKey={`${tabValueSelected}`}
          items={tabsAvailable}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default AdvisoryDissemination;
