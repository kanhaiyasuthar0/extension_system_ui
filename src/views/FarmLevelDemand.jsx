import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const FarmLevelDemand = (props) => {
  const items = [
    {
      key: "1",
      label: "FARM LEVEL DEMAND",
      data: database.farm_level_demand,
    },
    {
      key: "2",
      label: "FEEDBACK",
      data: database.farm_level_demand_feedback_form,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} tele={props.tele} />
    </>
  );
};

export default FarmLevelDemand;
