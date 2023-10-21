"use client";
import axios from "axios";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";

const AdvisoryDissemination = ({ tele }) => {
  const [loading, setLoading] = useState(false);
  const [queryParams, setSearchParams] = useSearchParams();

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
      format: "multiple",
      key: "farmers_attended_mobile_number",
      label: "Select the farmers who attended the session",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "select",
    },
    {
      format: "number",
      key: "total_farmer_count",
      label: "Count of total farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "number",
      key: "female_farmer_count",
      label: "Count of female farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "",
      key: "adoption_anticipated_farmers_mobile_number",
      label: "Select the farmers who stated that they would adopt the advisory",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "checkbox",
    },
    {
      format: "jpg, png, jpeg",
      key: "photo",
      label:
        "Please provide a picture of the group. Click on the button below to open the camera.",
      required: "TRUE",
      type: "upload",
    },
    {
      format: "",
      key: "feedback",
      label: "Did the farmers find the advisory easy to understand?",
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
      label: "ADVISORY",
      data: formData,
    },
    // {
    //   key: "2",
    //   label: "FEEDBACK",
    //   data: database.advisory_feedback_form,
    // },
  ];
  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }}></Skeleton>
      ) : (
        memoizedData?.length > 0 && <FormWithTabs data={items} tele={tele} />
      )}
    </>
  );
};

export default AdvisoryDissemination;
