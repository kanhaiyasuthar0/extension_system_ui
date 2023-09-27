import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const AdvisoryDissemination = () => {
  const items = [
    {
      key: "1",
      label: "ADVISORY",
      data: database.advisory_form,
    },
  ];
  return (
    <>
      <FormWithTabs data={items} />
    </>
  );
};

export default AdvisoryDissemination;
