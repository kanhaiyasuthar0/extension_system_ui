import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const Assessment = (props) => {
  const items = [
    {
      key: "1",
      label: "ASSESSMENT",
      data: database.assessment,
    },
  ];
  return (
    <>
      <FormWithTabs data={items} tele={props.tele} />
    </>
  );
};

export default Assessment;
