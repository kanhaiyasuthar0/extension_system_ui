import axios from "axios";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const AdvisoryDissemination = ({ tele }) => {
  function getAllFarmers() {
    return [
      "Jai (9234512345)",
      "Amit (8756476234)",
      "Nilesh(9820421888)",
      "Ugesh(612438625787)",
      "Uges1h(612438625787)",
      "Uge2sh(612438625787)",
      "Uge3sh(612438625787)",
      "Ug4esh(612438625787)",
      "Uges5h(612438625787)",
    ];
    return axios
      .get("url")
      .then((response) => {
        return [
          "Jai (9234512345)",
          "Amit (8756476234)",
          "Nilesh(9820421888)",
          "Ugesh(612438625787)",
          "Uges1h(612438625787)",
          "Uge2sh(612438625787)",
          "Uge3sh(612438625787)",
          "Ug4esh(612438625787)",
          "Uges5h(612438625787)",
        ];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formData = [
    {
      format: "multiple",
      key: "attending_farmers",
      label: "Select the farmers who attended the session",
      required: "TRUE",
      select_option: getAllFarmers(),
      type: "select",
    },
    {
      format: "",
      key: "attending_male",
      label: "Count of male farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "",
      key: "attending_female",
      label: "Count of female farmers",
      required: "TRUE",
      type: "input",
    },
    {
      format: "",
      key: "adopting_farmers",
      label: "Select the farmers who stated that they would adopt the advisory",
      required: "TRUE",
      select_option: ["Jai (9234512345)", "Amit (8756476234)"],
      type: "checkbox",
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
      <FormWithTabs data={items} tele={tele} />
    </>
  );
};

export default AdvisoryDissemination;
