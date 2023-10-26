import FormWithTabs from "../components/generic/FormWithTabs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";
import axios from "axios";
import Collection from "../components/indentCollection/Collection";
const InputsCollection = ({ tele, purpose }) => {
  const [loading, setLoading] = useState(false);
  const [queryParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
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
  async function getAllProductList() {
    setLoading(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/web_hook/get_product_list/?ea_mobile_number=${queryParams.get(
      "ea_tg_number"
    )}`;
    let url = baseUrl + end_point;
    try {
      let response = await axios.get(url);
      setAllProducts(response.data);
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
    getAllProductList();
  }, []); // Empty dependency array to run this effect only once

  // Use useMemo to memoize the data
  const memoizedData = useMemo(() => data, [data]);
  console.log(
    "🚀 ~ file: InputsCollection.jsx:61 ~ InputsCollection ~ memoizedData:",
    memoizedData
  );
  const memoizedallProductsData = useMemo(() => allProducts, [allProducts]);
  const memoizedCategory = useMemo(() => {
    return [...new Set(allProducts.map((each) => each["Product Category"]))];
  }, [allProducts]);

  const formData = [
    {
      label: "Select the farmer for whom you want to collect the indent",
      key: "farmer",
      type: "select",
      format: "",
      required: "TRUE",
      select_option: memoizedData ?? [],
    },
  ];

  console.log(
    "🚀 ~ file: InputsCollection.jsx:82 ~ InputsCollection ~ memoizedallProductsData:",
    memoizedallProductsData
  );

  const items = [
    {
      key: "1",
      label: "INPUT",
      data: formData,
    },
  ];

  const template = {
    product: "",
    uom: "",
    variety: "",
    quanity: "",
    category: "",
    farmer: "",
  };

  const [ongoingData, setOngoingData] = useState({
    product: "",
    uom: "",
    variety: "",
    quanity: "",
    category: "",
    farmer: "",
  });
  console.log(
    "🚀 ~ file: InputsCollection.jsx:107 ~ InputsCollection ~ ongoingData:",
    ongoingData
  );
  const handleChangeSelect = (name, value, number) => {
    // setOngoingData((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));
    handleClear(name, value, number);
  };

  const [savedData, setSavedData] = useState([]);
  console.log(
    "🚀 ~ file: InputsCollection.jsx:136 ~ InputsCollection ~ savedData:",
    savedData
  );
  const [products, setProducts] = useState([]);
  const [variety, setVariety] = useState([]);
  const [uom, setUom] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleClear = (name, value, number) => {
    console.log(
      "🚀 ~ file: InputsCollection.jsx:133 ~ handleClear ~ number:",
      number
    );
    switch (number) {
      case 0:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
        }));
        // Code to execute when expression matches value1
        break;

      case 1:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
          product: "",
          uom: "",
          variety: "",
          quanity: "",
        }));
        // Code to execute when expression matches value2
        break;

      case 2:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
          uom: "",
          variety: "",
          quanity: "",
        }));
        // Code to execute when expression matches value2
        break;
      case 3:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
          uom: "",
          quanity: "",
        }));
        // Code to execute when expression matches value2
        break;
      case 4:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
          quanity: "",
        }));
        // Code to execute when expression matches value2
        break;
      case 5:
        setOngoingData((prev) => ({
          ...prev,
          [name]: value,
        }));
        // Code to execute when expression matches value2
        break;

      // More cases...

      default:
      // Code to execute if none of the cases match
    }
  };

  const handleAdd = () => {
    setSavedData((prev) => [...prev, ongoingData]);
    setOngoingData((prev) => ({
      ...prev,
      product: "",
      uom: "",
      variety: "",
      quantity: "",
      category: "",
    }));
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

  const handleSubmit = async (url) => {
    let baseurl = `https://farmerchat.farmstack.co/upd-demo`;
    let endPoint = `/telegram_app/web_hook/post_indent/?chat_id=${queryParams.get(
      "chat_id"
    )}&indent_purpose=${purpose}`;
    url = baseurl + endPoint;
    let body = {
      task_id: queryParams.get("task_id"), // first
      farmer_mobile_number:
        extractNumberInParentheses(ongoingData["farmer"]) ?? "", // second
      products: savedData.map((each) => {
        return {
          product_category: each["category"],
          product_name: each["product"],
          product_variety: each["variety"],
          product_uom: each["uom"],
          qty: each["quantity"],
        };
      }),
    };
    console.log(
      "🚀 ~ file: InputsCollection.jsx:234 ~ handleSubmit ~ body:",
      body
    );
    try {
      let response = await axios.post(url, body);
      console.log(
        "🚀 ~ file: InputsCollection.jsx:240 ~ handleSubmit ~ response:",
        response
      );
      tele?.close();
    } catch (error) {
      console.log(error);
      tele?.close();
    }
  };
  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }}></Skeleton>
      ) : (
        <Collection
          farmers={data}
          products={products}
          variety={variety}
          uom={uom}
          handleChangeSelect={handleChangeSelect}
          handleAdd={handleAdd}
          ongoingData={ongoingData}
          categories={memoizedCategory}
          memoizedallProductsData={memoizedallProductsData}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          savedData={savedData}
        />
      )}
    </>
  );
};

export default InputsCollection;
