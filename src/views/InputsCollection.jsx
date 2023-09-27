import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const InputsCollection = ({ tele }) => {
  const items = [
    {
      key: "1",
      label: "ADOPTION",
      data: database.advisory_form,
    },
  ];
  return <FormWithTabs data={items} tele={tele} />;
};

export default InputsCollection;
