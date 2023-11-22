import FormWithTabs from "../components/generic/FormWithTabs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "antd";
import axios from "axios";
import { useMyContext } from "../contexts/ExtensionSysytemContext";
// import FarmerProfileC from "../components/farmerProfile/FarmerProfileC";
import db from "../data/db.json";
import MultiStepForm from "../components/farmerProfile/MultiStepForm";
const FarmerProfile = (props) => {
  const [loading, setLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [queryParams, setSearchParams] = useSearchParams();
  const { allValues, setAllValues } = useMyContext();
  const [data, setData] = useState(null);
  const [sheetData, setSheetData] = useState({});
  // const [items, setItems] = useState([]);
  // const [formData, setFormData] = useState([]);
  async function getAllFarmers() {
    setLoading(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/task/farmer/?ea_mobile_number=${queryParams.get(
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

  const initialForm = [
    {
      format: "",
      key: "mobile_number",
      label: "Please select farmer mobile number",
      required: "TRUE",
      select_option: memoizedData ?? [],
      type: "select",
      afterChange: get_farmer_profile,
    },
    {
      format: "",
      key: "first_name",
      label: "Farmer's first name",
      type: "input",
      required: "FALSE",
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
      required: "FALSE",
    },
    {
      format: "",
      key: "gender",
      label: "Gender",
      select_option: ["Female", "Male"],
      type: "select",
      required: "FALSE",
      clearFn: () => {
        setAllValues({ ...allValues, gender: sheetData["gender"] });
      },
    },
    {
      format: "jpg, jpeg, png",
      key: "photo_data",
      label: "Add farmers photo",
      type: "upload",
      required: "FALSE",
      showLabel: true,
    },
    {
      format: "number",
      key: "national_id",
      label: "Farmer's Aadhaar Number",
      type: "input",
      required: "FALSE",
    },
    {
      format: "",
      key: "farming_type",
      label: "Farming Type",
      type: "select",
      required: "FALSE",
      select_option: ["Crop only", "Livestock only", "Mixed"],
      clearFn: () =>
        setAllValues({ ...allValues, farming_type: sheetData["farming_type"] }),
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

  // const farmer_profile_form = [
  //   {
  //     label: "Select farmer",
  //     value: "",
  //     key: "gender",
  //     type: "select",
  //     select_option: ["Male (पुरुष)", "Female (महिला)"],
  //   },

  //   {
  //     label: "Farmer Name (किसान का नाम)",
  //     value: "",
  //     key: "farmer_name",
  //     type: "input",
  //   },
  //   {
  //     label: "Father's Name (पिता का नाम)",
  //     value: "",
  //     key: "father_name",
  //     type: "input",
  //   },
  //   {
  //     label: "Grand Father's Name (दादा का नाम)",
  //     value: "",
  //     key: "grand_father_name",
  //     type: "input",
  //   },
  //   {
  //     label: "Date of Birth (जन्म की तारीख)",
  //     value: "2023-12-20",
  //     key: "date_of_birth",
  //     type: "date",
  //   },
  //   {
  //     label: "Gender (लिंग)",
  //     value: "",
  //     key: "gender",
  //     type: "select",
  //     select_option: ["Male (पुरुष)", "Female (महिला)"],
  //   },
  //   {
  //     label: "Select Region (क्षेत्र चुनें)",
  //     value: "",
  //     key: "region",
  //     type: "select",
  //     select_option: [
  //       "Bihar (बिहार)",
  //       "Karnataka (कर्नाटक)",
  //       "Rajasthan (राजस्थान)",
  //     ],
  //   },
  //   {
  //     label: "Marital Status (वैवाहिक स्थिति)",
  //     value: "",
  //     key: "marital_status",
  //     type: "select",
  //     select_option: ["Yes (हां)", "No (नहीं)"],
  //   },
  //   {
  //     label: "Priority Crop (प्राथमिक फसल)",
  //     value: [],
  //     key: "crops",
  //     type: "checkbox",
  //     select_option: [
  //       "Barley (जौ)",
  //       "Wheat (गेहूँ)",
  //       "Sunflower (सूरजमुखी)",
  //       "Corn (मक्का)",
  //       "Rice (चावल)",
  //       "Soybean (सोयाबीन)",
  //       "Oats (जई)",
  //       "Potato (आलू)",
  //       "Cotton (कपास)",
  //       "Peanuts (मूँगफली)",
  //       "Sorghum (ज्वार)",
  //       "Canola (केनोला)",
  //       "Flax (अलसी)",
  //       "Millet (बाजरा)",
  //       "Rye (राई)",
  //       "Tobacco (तमाकू)",
  //       "Tea (चाय)",
  //       "Coffee (कॉफी)",
  //       "Alfalfa (अल्फाल्फा)",
  //       "Cabbage (पत्तागोभी)",
  //       "Carrots (गाजर)",
  //       "Broccoli (ब्रोकली)",
  //       "Kale (केला)",
  //       "Cauliflower (फूलगोभी)",
  //       "Spinach (पालक)",
  //       "Lettuce (लेट्यूस)",
  //       "Cucumber (खीरा)",
  //       "Tomato (टमाटर)",
  //       "Pepper (मिर्च)",
  //       "Eggplant (बैंगन)",
  //     ],
  //   },
  // ];

  const land_details_form = [
    {
      label: "Land Ownership Type",
      value: "",
      key: "land_ownership_type",
      type: "select",
      select_option: ["Own", "Rented"],
      clearFn: () =>
        setAllValues({
          ...allValues,
          land_ownership_type: sheetData["land_ownership_type"],
        }),
    },
    {
      label: "Soil Type",
      value: "",
      key: "soil_type",
      type: "select",
      select_option: ["Loam", "Clay", "Silt", "Peat", "Sandy"],
      clearFn: () =>
        setAllValues({ ...allValues, soil_type: sheetData["soil_type"] }),
    },
    {
      label: "Land Area (in acres)",
      value: "",
      key: "land_area",
      type: "input",
    },
    {
      label: "Crop Type",
      value: "",
      key: "crop_type",
      type: "select",
      select_option: ["Wheat", "Rice", "Potato", "Tomato", "Coffee", "Coconut"],
      clearFn: () =>
        setAllValues({ ...allValues, crop_type: sheetData["crop_type"] }),
    },
    // {
    //   label: "Irrigation Type (सिंचाई प्रकार)",
    //   value: "",
    //   key: "irrigation_type",
    //   type: "select",
    //   select_option: [
    //     "Drip Irrigation (ड्रिप सिंचाई)",
    //     "Sprinkler Irrigation (स्प्रिंकलर सिंचाई)",
    //     "Flood Irrigation (बाढ़ सिंचाई)",
    //   ],
    // },
    // {
    //   label: "Crop Rotation (फसल चक्रण)",
    //   value: [],
    //   key: "crop_rotation",
    //   type: "checkbox",
    //   select_option: [
    //     "Corn (मक्का)",
    //     "Wheat (गेहूँ)",
    //     "Soybean (सोयाबीन)",
    //     "Rice (चावल)",
    //     "Barley (जौ)",
    //   ],
    // },
    // {
    //   label: "Soil Type (मृदा प्रकार)",
    //   value: "",
    //   key: "soil_type",
    //   type: "select",
    //   select_option: [
    //     "Clay (मिट्टी)",
    //     "Loam (लोम)",
    //     "Sandy (रेतीला)",
    //     "Silt (कीचड़ी)",
    //     "Peat (टर्फ)",
    //   ],
    // },
    // {
    //   label:
    //     "Average Annual Rainfall (in inches) (औसत वार्षिक वर्षा - इंच में)",
    //   value: "",
    //   key: "average_rainfall",
    //   type: "input",
    // },
    // {
    //   label:
    //     "Previous Year's Crop Yield (in bushels/acre) (पिछले साल की फसल उत्पादन - एकड़ प्रति कुप्पी)",
    //   value: "",
    //   key: "previous_yield",
    //   type: "input",
    // },
    // {
    //   label: "Pest Control Measures (कीट प्रबंधन के उपाय)",
    //   value: "",
    //   key: "pest_control",
    //   type: "textarea",
    // },
    // {
    //   label: "Fertilization Methods (उर्वरक विधियाँ)",
    //   value: "",
    //   key: "fertilization",
    //   type: "textarea",
    // },
    // {
    //   label: "Equipment and Machinery (उपकरण और मशीनरी)",
    //   value: [],
    //   key: "equipment",
    //   type: "checkbox",
    //   select_option: [
    //     "Tractor (ट्रैक्टर)",
    //     "Plow (हल)",
    //     "Seeder (बोना यंत्र)",
    //     "Harvester (कटाईयाँ)",
    //     "Irrigation System (सिंचाई प्रणाली)",
    //   ],
    // },
  ];
  const livestock_form = [
    {
      label: "Livestock Type",
      value: "",
      key: "livestock_type",
      type: "select",
      select_option: ["Cattle", "Fish", "Poultry"],
      clearFn: () =>
        setAllValues({
          ...allValues,
          livestock_type: sheetData["livestock_type"],
          livestock_breed: "",
        }),
    },
    {
      label: "Livestock Breed",
      value: "",
      key: "livestock_breed",
      type: "select",
      select_option:
        allValues["livestock_type"] == "Cattle"
          ? ["Gir", "Red Sindhi", "Sahiwal"]
          : allValues["livestock_type"] == "Fish"
          ? ["Catfish", "Carp", "Trout"]
          : allValues["livestock_type"] == "Poultry"
          ? ["Aseel", "Kadaknath", "Busra"]
          : [],
      clearFn: () =>
        setAllValues({
          ...allValues,
          livestock_breed: sheetData["livestock_breed"],
        }),
    },
    {
      label: "Number of Livestock",
      value: "",
      key: "livestock_count",
      type: "input",
      format: "number",
    },
    // {
    //   label: "Livestock Health Status (पशु स्वास्थ्य स्थिति)",
    //   value: "",
    //   key: "health_status",
    //   type: "select",
    //   select_option: [
    //     "Healthy (स्वस्थ)",
    //     "Sick (बीमार)",
    //     "Vaccinated (टीका लगाया गया)",
    //     "Not Vaccinated (टीका नहीं लगाया गया)",
    //   ],
    // },
    // {
    //   label: "Livestock Feed Type (पशु खाद प्रकार)",
    //   value: "",
    //   key: "feed_type",
    //   type: "select",
    //   select_option: [
    //     "Grass (घास)",
    //     "Hay (सूखी घास)",
    //     "Grain (अनाज)",
    //     "Silage (साइलेज)",
    //     "Concentrates (कंसेंट्रेट्स)",
    //     "Other (अन्य)",
    //   ],
    // },
    // {
    //   label: "Livestock Shelter Type (पशु आवास प्रकार)",
    //   value: "",
    //   key: "shelter_type",
    //   type: "select",
    //   select_option: [
    //     "Barn (बाड़)",
    //     "Stable (गोदाम)",
    //     "Pasture (पशुधन)",
    //     "Shed (शेड)",
    //     "Open Field (खुली जगह)",
    //     "Other (अन्य)",
    //   ],
    // },
    // {
    //   label: "Livestock Breeding Method (पशु प्रजनन विधि)",
    //   value: "",
    //   key: "breeding_method",
    //   type: "select",
    //   select_option: [
    //     "Natural (प्राकृतिक)",
    //     "Artificial Insemination (कृत्रिम प्रवसन)",
    //     "Selective Breeding (चयनात्मक प्रजनन)",
    //   ],
    // },
    // {
    //   label: "Livestock Vaccination Schedule (पशु टीकाकरण अनुसूची)",
    //   value: "",
    //   key: "vaccination_schedule",
    //   type: "textarea",
    // },
    // {
    //   label: "Livestock Medical History (पशु चिकित्सा इतिहास)",
    //   value: "",
    //   key: "medical_history",
    //   type: "textarea",
    // },
    // {
    //   label: "Livestock Special Care Instructions (पशु विशेष देखभाल निर्देश)",
    //   value: "",
    //   key: "special_care_instructions",
    //   type: "textarea",
    // },
    // {
    //   label: "Livestock Additional Comments (पशु अतिरिक्त टिप्पणियाँ)",
    //   value: "",
    //   key: "additional_comments",
    //   type: "textarea",
    // },
  ];

  const items = [
    {
      key: "1",
      label: "PROFILE",
      data: initialForm,
    },
    {
      key: "2",
      label: "LAND",
      data: land_details_form,
    },
    {
      key: "3",
      label: "LIVESTOCK",
      data: livestock_form,
    },
  ];

  const memosizedKey = useMemo(() => {
    let key = {};
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].data.length; j++) {
        key[items[i].data[j].key] = "";
      }
    }
    console.log(key, "key");
    // setAllValues(key);
  }, [JSON.stringify(items)]);

  useEffect(() => {
    let key = {};
    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].data.length; j++) {
        key[items[i].data[j].key] = "";
      }
    }
    setAllValues(key);
  }, []);

  // useEffect(() => {
  //   setFormData(initialForm);
  //   setItems([
  //     {
  //       key: "1",
  //       label: "PROFILE",
  //       data: initialForm,
  //     },
  //   ]);
  // }, [initialForm]);

  const keyMapping = {
    first_name: "first_name",
    last_name: "last_name",
    development_group: "development_group",
    "Parent Organization ": "parent_organization",
    date_of_birth: "date_of_birth",
    gender: "gender",
    mobile_number: "mobile_number",
    telegram_or_whatsapp_number: "telegram_number",
    "Aadhar Number ": "aadhar_number",
    village: "village",
    block: "block",
    district: "district",
    state: "state",
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
    farming_type: "farming_type",
    national_id: "national_id",

    // land
    land_ownership_type: "land_ownership_type",
    soil_type: "soil_type",
    field_size: "land_area",
    crop_type: "crop_type",

    // livestock
    livestock_count: "livestock_count",
    livestock_type: "livestock_type",
    livestock_breed: "livestock_breed",
  };

  const reversedKeyMapping = {
    first_name: "first_name",
    last_name: "last_name",
    development_group: "development_group",
    parent_organization: "Parent Organization ",
    date_of_birth: "date_of_birth",
    gender: "gender",
    mobile_number: "mobile_number",
    telegram_number: "telegram_or_whatsapp_number",
    aadhar_number: "Aadhar Number ",
    village: "village",
    block: "block",
    district: "district",
    state: "state",
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
    farming_type: "farming_type",
    national_id: "national_id",
    land_ownership_type: "land_ownership_type",
    soil_type: "soil_type",
    land_area: "field_size",
    crop_type: "crop_type",
    livestock_count: "livestock_count",
    livestock_type: "livestock_type",
    livestock_breed: "livestock_breed",
  };

  // const reversedKeyMapping = {
  //   first_name: "First Name",
  //   last_name: "Last Name",
  //   development_group: "Select Development Group",
  //   parent_organization: "Parent Organization ",
  //   date_of_birth: "Date of Birth",
  //   gender: "Gender",
  //   mobile_number: "Mobile Number (Should be unique)",
  //   telegram_number: "Telegram/ Whatsapp Number",
  //   aadhar_number: "Aadhar Number ",
  //   village: "Village/Kebele",
  //   block: "Block / Taluk/ woreda",
  //   district: "District/ zone",
  //   state: "State/Region",
  //   aadhar_front_link: "G drive link to copy of Aadhar front page",
  //   aadhar_back_link: "G drive link to copy of Aadhar back page",
  //   land_records_link: "G drive link to copy of Land records",
  //   bank_passbook_link: "G drive link to copy of bank passbook",
  //   photo_link: "G drive link to photo",
  //   task_id: "task_id",
  //   basic_info: "basic_profile_info",
  //   land_records_info: "land_records_info",
  //   livestock_info: "livestock_info",
  //   photo_data: "photo",
  //   livestock_count: "Livestock Count",
  // };
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

    `telegram_app/task/update_farmer_profile/?chat_id=1769447199&task_id=3&farmer_id=ae7ca33b-07c0-477f-bba7-b35a5729e82e`;
    let end_point = `/telegram_app/task/update_farmer_profile/?chat_id=${queryParams.get(
      "chat_id"
    )}&task_id=${queryParams.get("task_id")}&farmer_id=${localStorage.getItem(
      "farmer_id"
    )}`;
    let url = baseUrl + end_point;
    let taskid = queryParams.get("task_id");

    let data = {};
    for (var key in reversedKeyMapping) {
      data[reversedKeyMapping[key]] = allValues[key] ?? sheetData[key];
    }

    // const keyMapping = {
    //   "First Name": allValues["first_name"] ?? sheetData["first_name"],
    //   "Last Name": allValues["last_name"] ?? sheetData["last_name"],
    //   "Select Development Group":
    //     allValues["development_group"] ?? sheetData["development_group"],
    //   "Parent Organization ":
    //     allValues["parent_organization"] ?? sheetData["parent_organization"],
    //   "Date of Birth": allValues["date_of_birth"] ?? sheetData["date_of_birth"],
    //   Gender: allValues["gender"] ?? sheetData["gender"],
    //   "Mobile Number (Should be unique)":
    //     allValues["mobile_number"] ?? sheetData["mobile_number"],
    //   "Telegram/ Whatsapp Number":
    //     allValues["telegram_number"] ?? sheetData["telegram_number"],
    //   "National ID": allValues["national_id"] ?? sheetData["national_id"],
    //   "Village/Kebele": allValues["village"] ?? sheetData["village"],
    //   "Block / Taluk/ woreda": allValues["block"] ?? sheetData["block"],
    //   "District/ zone": allValues["district"] ?? sheetData["district"],
    //   "State/Region": allValues["state"],
    //   "G drive link to copy of Aadhar front page":
    //     allValues["aadhar_front_link"],
    //   "G drive link to copy of Aadhar back page": allValues["aadhar_back_link"],
    //   "G drive link to copy of Land records": allValues["land_records_link"],
    //   "G drive link to copy of bank passbook": allValues["bank_passbook_link"],
    //   "G drive link to photo": allValues["photo_link"],
    //   task_id: queryParams.get("task_id"),
    //   basic_profile_info: allValues["basic_info"],
    //   land_records_info: allValues["land_records_info"],
    //   livestock_info: allValues["livestock_info"],
    //   photo: allValues["photo_data"],
    //   "Farming Type": allValues["farming_type"],

    //   // land
    //   "Land Ownership type": allValues["land_ownership_type"],
    //   "Soil type": allValues["soil_type"],
    //   "Field Size (in acres)": allValues["land_area"],
    //   "Crop type": allValues["crop_type"],

    //   // livestock
    //   "Livestock Count": allValues["livestock_count"],
    //   "Livestock Type": allValues["livestock_type"],
    //   "Livestock Breed": allValues["livestock_breed"],
    // };

    // console.log(data, "data");
    // if (taskid) {
    //   data["task_id"] = taskid;
    // }
    // data["mobile_number"] = extractNumberInParentheses(data["mobile_number"]);

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

  async function get_farmer_profile(farmer_name_no_string) {
    // setSubmitLoader(true);
    let baseUrl = "https://farmerchat.farmstack.co/upd-demo";
    let end_point = `/telegram_app/task/farmer_profile/?farmer_mobile_number=${extractNumberInParentheses(
      farmer_name_no_string
    )}`;
    let url = baseUrl + end_point;

    try {
      let response = await axios.get(url);

      let data = {};
      localStorage.setItem("farmer_id", response.data["id"]);
      for (var key in response.data) {
        // data[key] = allValues[key] ?? "";
        data[keyMapping[key]] = response.data[key];
        let element = document.getElementById(keyMapping[key]);

        setSheetData(data);
        if (element) {
          // element.value = response.data[key];
        }
        // console.log(element, "element");
        // document.getElementById(keyMapping[key]) = response.data[key];
      }

      // data["livestock_count"] = 101;
      setAllValues((prev) => ({ ...prev, ...data }));
      // setFormData(initialForm);

      // setSubmitLoader(false);
    } catch (error) {
      console.log(error, "Error");
      // setSubmitLoader(false);
    }
    // props.tele.close();
  }

  function submitCall() {
    dumpingDataInSheet();
  }

  // useEffect(() => {
  //   let string = allValues["mobile_number"];
  //   if (string) {
  //     get_farmer_profile(string);
  //   }
  // }, [allValues["mobile_number"]]);

  return (
    <>
      {/* <FormWithTabs data={items} tele={props.tele} /> */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }}></Skeleton>
      ) : (
        data?.length > 0 && (
          <MultiStepForm
            data={items}
            tele={props.tele}
            submitCall={submitCall}
            submitCallLoader={submitLoader}
          />
        )
        // <FarmerProfileC
        //   farmers={memoizedData}
        //   get_farmer_profile={get_farmer_profile}
        //   submitCall={submitCall}
        // />
      )}
    </>
  );
};

export default FarmerProfile;
