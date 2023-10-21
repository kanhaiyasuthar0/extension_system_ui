import { useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import { useMyContext } from "../../contexts/ExtensionSysytemContext";
const GoogleSheetReader = () => {
  const { setDb, db } = useMyContext();

  const { data, loading, error } = useGoogleSheets({
    apiKey: "AIzaSyA08g6Yz7fFPmSrq0_P1WdoFqfmNEiPn4Y",
    sheetId: "1X9SFwF3mehoXUEMtraKUR8ArDQieUNp6IHqYpUUeVzo",
  });
  console.log(
    "🚀 ~ file: GoogleSheetReader.jsx:8 ~ GoogleSheetReader ~ data:",
    data
  );
  useEffect(() => {
    if (data) {
      setDb(data);
    }
  }, [data]);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error!</div>;
  }
  console.log(db, "db");
  return <></>;
};

export default GoogleSheetReader;
