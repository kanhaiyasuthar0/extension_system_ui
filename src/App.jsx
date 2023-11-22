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
import InputsCollection from "./views/InputsCollection";
import { Switch } from "antd";
// 3️⃣ Router singleton created
function App() {
  const { setDarkMode } = useMyContext();
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    console.log("TELEGRAM", window.Telegram);
    tele.ready();

    if (tele.backgroundColor == "#ffffff") {
      document.body.classList.remove("dark-mode");
      setDarkMode(false);
    } else if (tele.backgroundColor == "#212121") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  });

  const handleChange = (checked) => {
    console.log("🚀 ~ file: App.jsx:73 ~ handleChange ~ checked:", checked);
    // document.body.style.backgroundColor = checked ? "#333333" : "#ffffff";
    if (checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    setDarkMode(checked);
  };

  return (
    <>
      {import.meta.env.VITE_REACT_MODE == "DEV" ? (
        <Switch onChange={handleChange} />
      ) : (
        ""
      )}
      <Routes>
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
        <Route path="/input-collection">
          <Route
            index
            element={
              <InputsCollection purpose={"indent_collection"} tele={tele} />
            }
          ></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>
        <Route path="/input-distribution">
          <Route
            index
            element={
              <InputsCollection purpose={"indent_distribution"} tele={tele} />
            }
          ></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>
        <Route path="/assessment/">
          <Route index element={<Assessment tele={tele} />}></Route>
          <Route path=":id" element={<Assessment tele={tele} />}></Route>
        </Route>
        <Route path="/indent/:collection/">
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
