import FormWithTabs from "../components/generic/FormWithTabs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";
import axios from "axios";
import { useMyContext } from "../contexts/ExtensionSysytemContext";

const FarmerProfile = (props) => {
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [queryParams, setSearchParams] = useSearchParams();
  const { allValues } = useMyContext();
  const [data, setData] = useState(null);

  async function getAllFarmers() {
    setLoading(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/web_hook/get_farmer_list/?ea_mobile_number=${queryParams.get(
      "ea_tg_number"
    )}`;
    let url = baseUrl + end_point;
    try {
      let response = await axios.get(url);
      setData(response.data);
      // setData(["ASDSF"]);

      setLoading(false);
    } catch (error) {
      console.log(error, "Error");
      // setData(["ASDSF"]);

      setLoading(false);
    }
  }

  useEffect(() => {
    // Make a GET call to your API
    getAllFarmers();
  }, []); // Empty dependency array to run this effect only once

  // Use useMemo to memoize the data
  const memoizedData = useMemo(() => data, [data]);

  const formData = [
    {
      format: "",
      key: "mobile_number",
      label: "Please select farmer mobile number",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "select",
    },
    {
      format: "",
      key: "first_name",
      label: "Farmer's first name",
      type: "input",
    },
    {
      format: "",
      key: "last_name",
      label: "Farmer's last name",
      type: "input",
    },
    {
      format: "date",
      key: "date_of_birth",
      label: "Date of birth",
      type: "date",
    },
    {
      format: "",
      key: "gender",
      label: "Gender",
      select_option: ["female", "male"],
      type: "select",
    },
    {
      format: "jpg, jpeg, png",
      key: "photo_data",
      label: "Add farmers photo",
      type: "upload",
    },
    {
      format: "number",
      key: "aadhar_number",
      label: "Farmer's Aadhaar Number",
      type: "input",
    },
    // {
    //   format: "",
    //   key: "district",
    //   label: "Select district",
    //   select_option: ["bhilwara", "jaipur"],
    //   type: "select",
    // },
    // {
    //   format: "",
    //   key: "block",
    //   label: "Select block",
    //   select_option: ["A", "B"],
    //   type: "select",
    // },
    // {
    //   format: "",
    //   key: "village",
    //   label: "Select village",
    //   select_option: ["Village A"],
    //   type: "select",
    // },
  ];

  const items = [
    {
      key: "1",
      label: "PROFILE",
      data: formData,
    },
  ];

  const keyMapping = {
    "First Name": "first_name",
    "Last Name": "last_name",
    "Select Development Group": "development_group",
    "Parent Organization ": "parent_organization",
    "Date of Birth": "date_of_birth",
    Gender: "gender",
    "Mobile Number (Should be unique)": "mobile_number",
    "Telegram/ Whatsapp Number": "telegram_number",
    "Aadhar Number ": "aadhar_number",
    "Village/Kebele": "village",
    "Block / Taluk/ woreda": "block",
    "District/ zone": "district",
    "State/Region": "state",
    "G drive link to copy of Aadhar front page": "aadhar_front_link",
    "G drive link to copy of Aadhar back page": "aadhar_back_link",
    "G drive link to copy of Land records": "land_records_link",
    "G drive link to copy of bank passbook": "bank_passbook_link",
    "G drive link to photo": "photo_link",
    task_id: "task_id",
    basic_profile_info: "basic_info",
    land_records_info: "land_records_info",
    livestock_info: "livestock_info",
    photo: "photo_data",
  };

  const reversedKeyMapping = {
    first_name: "First Name",
    last_name: "Last Name",
    development_group: "Select Development Group",
    parent_organization: "Parent Organization ",
    date_of_birth: "Date of Birth",
    gender: "Gender",
    mobile_number: "Mobile Number (Should be unique)",
    telegram_number: "Telegram/ Whatsapp Number",
    aadhar_number: "Aadhar Number ",
    village: "Village/Kebele",
    block: "Block / Taluk/ woreda",
    district: "District/ zone",
    state: "State/Region",
    aadhar_front_link: "G drive link to copy of Aadhar front page",
    aadhar_back_link: "G drive link to copy of Aadhar back page",
    land_records_link: "G drive link to copy of Land records",
    bank_passbook_link: "G drive link to copy of bank passbook",
    photo_link: "G drive link to photo",
    task_id: "task_id",
    basic_info: "basic_profile_info",
    land_records_info: "land_records_info",
    livestock_info: "livestock_info",
    photo_data: "photo",
  };
  function extractNumberInParentheses(inputString) {
    // Define a regex pattern to match numbers within parentheses
    const regex = /\((\d+)\)/;

    // Use the `exec` method to find the match
    const match = regex.exec(inputString);

    if (match) {
      // The extracted number is in the first capturing group (index 1)
      return match[1];
    } else {
      // Return null if no match is found
      return "";
    }
  }

  async function dumpingDataInSheet() {
    setSubmitLoader(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/web_hook/update_farmer_profile/?chat_id=${queryParams.get(
      "chat_id"
    )}`;
    let url = baseUrl + end_point;
    let taskid = queryParams.get("task_id");

    let data = {};
    for (var key in reversedKeyMapping) {
      data[key] = allValues[key] ?? "";
    }
    console.log(data, "data");
    if (taskid) {
      data["task_id"] = taskid;
    }
    data["mobile_number"] = extractNumberInParentheses(data["mobile_number"]);
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
    props.tele.close();
  }

  function submitCall() {
    console.log("submitCall");
    dumpingDataInSheet();
  }

  return (
    <>
      {/* <FormWithTabs data={items} tele={props.tele} /> */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }}></Skeleton>
      ) : (
        memoizedData?.length > 0 && (
          <FormWithTabs
            data={items}
            tele={props.tele}
            submitCall={submitCall}
            submitCallLoader={submitLoader}
          />
        )
      )}
    </>
  );
};

export default FarmerProfile;
