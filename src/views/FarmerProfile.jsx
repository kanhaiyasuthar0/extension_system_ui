import FormWithTabs from "../components/generic/FormWithTabs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";
import axios from "axios";

const FarmerProfile = (props) => {
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
      format: "",
      key: "farmers_attended_mobile_number",
      label: "Please select farmer mobile number",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "select",
    },
    {
      format: "",
      key: "farmer_first_name",
      label: "Farmer's first name",
      type: "input",
    },
    {
      format: "",
      key: "farmer_last_name",
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
      key: "photo",
      label: "Add farmers photo",
      type: "upload",
    },
    {
      format: "number",
      key: "farmer_aadhaar",
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

  function submitCall() {
    console.log("submitCall");
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
          />
        )
      )}
    </>
  );
};

export default FarmerProfile;
