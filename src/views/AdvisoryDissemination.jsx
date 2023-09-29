import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const AdvisoryDissemination = ({ tele }) => {
  const items = [
    {
      key: "1",
      label: "ADVISORY",
      data: database.advisory_form,
    },
    {
      key: "2",
      label: "FEEDBACK",
      data: database.advisory_feedback_form,
    },
  ];
  return (
    <>
      <FormWithTabs data={items} tele={tele} />
    </>
  );
};

export default AdvisoryDissemination;
