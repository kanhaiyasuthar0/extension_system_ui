import FormWithTabs from "../components/generic/FormWithTabs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";
import axios from "axios";
const InputsCollection = ({ tele }) => {
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
  const memoizedData = useMemo(() => ["data"], [data]);

  const formData = [
    {
      label: "Select the farmer for whom you want to collect the indent",
      key: "farmer",
      type: "select",
      format: "",
      required: "TRUE",
      select_option: memoizedData ?? ["as"],
    },
  ];

  const items = [
    {
      key: "1",
      label: "INPUT",
      data: formData,
    },
  ];
  // return <FormWithTabs data={items} tele={tele} />;
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

export default InputsCollection;
