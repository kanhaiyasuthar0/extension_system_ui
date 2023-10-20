import axios from "axios";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Adoption = (props) => {
  const [queryParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);

  async function getAllFarmers() {
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/web_hook/get_farmer_list/?ea_mobile_number=${queryParams.get(
      "ea_tg_number"
    )}`;
    let url = baseUrl + end_point;
    try {
      let response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error, "Error");
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
      format: "multiple",
      key: "adopting_farmers",
      label: "Select the farmers who adopted the advisory",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "select",
    },
    {
      format: "",
      key: "total_farmer_count",
      label: "Count of total farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "",
      key: "adopting_female",
      label: "Count of female farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "jpg, png, jpeg",
      key: "attachment",
      label:
        "Please provide a picture of the group. Click on the button below to open the camera.",
      required: "TRUE",
      type: "upload",
    },
    {
      format: "",
      key: "feedback",
      label: "Did the farmers find the advisory easy to implement?",
      required: "TRUE",
      select_option: ["Yes (हां)", "No (नहीं)"],
      type: "radio",
    },
    {
      format: "",
      key: "comment",
      label: "Do you want to share any suggestions or challenges faced?",
      required: "FALSE",
      type: "textarea",
    },
  ];

  const items = [
    {
      key: "1",
      label: "ADOPTION",
      data: formData,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} tele={props.tele} />
    </>
  );
};

export default Adoption;
