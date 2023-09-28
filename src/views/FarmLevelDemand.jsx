import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";

const FarmLevelDemand = (props) => {
  const items = [
    {
      key: "1",
      label: "FARM LEVEL DEMAND",
      data: database.farm_level_demand,
    },
  ];

  return (
    <>
      <FormWithTabs data={items} tele={props.tele} />
    </>
  );
};

export default FarmLevelDemand;
