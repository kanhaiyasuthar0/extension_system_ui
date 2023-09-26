import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const Adoption = () => {
  return (
    <>
      <FormWithTabs database={database} />
    </>
  );
};

export default Adoption;
