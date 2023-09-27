import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const Adoption = (props) => {
  const items = [
    {
      key: "1",
      label: "ADOPTION",
      data: database.advisory_form,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} tele={props.tele} />
    </>
  );
};

export default Adoption;
