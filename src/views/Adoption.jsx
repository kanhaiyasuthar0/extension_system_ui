import axios from "axios";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const Adoption = (props) => {
  function getAllFarmers() {
    let final = [];
    axios
      .get("url")
      .then((response) => {
        final = [
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
        final = [
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
      });
    return final;
  }

  const formData = [
    {
      format: "",
      key: "adopting_farmers",
      label: "Select the farmers who adopted the advisory",
      required: "TRUE",
      select_option: getAllFarmers(),
      type: "checkbox",
    },
    {
      format: "",
      key: "adopting_male",
      label: "Count of male farmers",
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
