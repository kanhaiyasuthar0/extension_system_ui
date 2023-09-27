import database from "../data/db.json";

import FormWithTabs from "../components/generic/FormWithTabs";

const Feedback = () => {
  const items = [
    {
      key: "1",
      label: "FEEDBACK",
      data: database.feedback_form_normal,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} />
    </>
  );
};

export default Feedback;
