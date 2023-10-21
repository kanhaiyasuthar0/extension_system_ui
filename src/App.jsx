"use client";
import "./App.css";
import FarmerProfile from "./views/FarmerProfile";
import Adoption from "./views/Adoption";
import AdvisoryDissemination from "./views/AdvisoryDissemination";
import "./components/styles/common.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Feedback from "./views/Feedback";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Assessment from "./views/Assessment";
import FarmLevelDemand from "./views/FarmLevelDemand";
// import GoogleSheetReader from "./components/google/GoogleSheetReader";
// import FormWithTabs from "./components/generic/FormWithTabs";
import { useMyContext } from "./contexts/ExtensionSysytemContext";
// 3️⃣ Router singleton created
function App() {
  const { db } = useMyContext();
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    console.log("TELEGRAM", window.Telegram);
    tele.ready();

    //setting the background color as per theme of telegram bot
    document.body.style.backgroundColor = tele.backgroundColor ?? "#333333";
  });

  return (
    <>
      {/* <GoogleSheetReader /> */}
      <Routes>
        {/* [
    {
      key: "1",
      label: "ADOPTION",
      data: database.advisory_form,
    },
  ]; */}

        {/* {db?.map((eachSheet, index) => {
          console.log("🚀 ~ file: App.jsx:42 ~ {db?.map ~ db:", eachSheet.id);
          return (
            <Route
              key={index}
              path={eachSheet.id}
              element={
                <FormWithTabs
                  tele={tele}
                  data={[
                    {
                      key: "1",
                      label: eachSheet.id,
                      data: eachSheet.data,
                    },
                  ]}
                />
              }
            ></Route>
          );
        })} */}
        <Route path="/farmer-profile">
          <Route index element={<FarmerProfile tele={tele} />}></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>
        <Route path="/farm-level-demand">
          <Route index element={<FarmLevelDemand tele={tele} />}></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>

        <Route path="/adoption">
          <Route index element={<Adoption tele={tele} />}></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>
        <Route path="/advisory-dissemination">
          <Route index element={<AdvisoryDissemination tele={tele} />}></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>
        <Route path="/assessment/">
          <Route index element={<Assessment tele={tele} />}></Route>
          <Route path=":id" element={<Assessment tele={tele} />}></Route>
        </Route>

        <Route path="/" element={<></>}></Route>
        <Route path="*" element={<></>}></Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
