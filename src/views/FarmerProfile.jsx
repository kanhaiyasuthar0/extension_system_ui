import ContentRenderer from "../components/generic/ContentRenderer";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const FarmerProfile = () => {
  const items = [
    {
      key: "1",
      label: "PROFILE",
      data: database.farmer_profile_form,
    },
    {
      key: "2",
      label: "LAND",

      data: database.land_details_form,
    },
    {
      key: "3",
      label: "LIVESTOCK",
      data: database.livestock_form,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} />
    </>
  );
};

export default FarmerProfile;
