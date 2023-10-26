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
import RatingFeedback from "./views/RatingFeedback";
import { useMyContext } from "./contexts/ExtensionSysytemContext";
import { Switch } from "antd";
// 3️⃣ Router singleton created

function App() {
  const { setDarkMode } = useMyContext();
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    console.log("TELEGRAM", window.Telegram);
    tele.ready();
    // document.body.style.backgroundColor = tele.backgroundColor ?? "#333333";
    if (tele.backgroundColor == "#ffffff") {
      document.body.classList.remove("dark-mode");
      setDarkMode(false);
    } else if (tele.backgroundColor == "#333333") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
    // setMobileNumber(queryMobileNumber);
  }, []);
  // let element = useRoutes([
  //   {
  //     path: "farmer-profile",
  //     element: (
  //       <>
  //         <FarmerProfile />
  //       </>
  //     ),
  //     children: [
  //       {
  //         path: "feedback",
  //         element: <ContentRenderer data={database.feedback_form_normal} />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "adoption",
  //     element: (
  //       <>
  //         <Adoption />
  //       </>
  //     ),
  //   },
  //   {
  //     path: "advisory-dissemination",
  //     element: (
  //       <>
  //         <AdvisoryDissemination />
  //       </>
  //     ),
  //   },
  //   {
  //     path: "input-collection",
  //     element: (
  //       <>
  //         <InputsCollection />
  //       </>
  //     ),
  //   },
  // ]);

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
  // console.log(import.meta.env.VITE_REACT_MODE);
  return (
    <>
      {import.meta.env.VITE_REACT_MODE == "DEV" ? (
        <Switch onChange={handleChange} />
      ) : (
        ""
      )}

      <Routes>
        <Route
          path="/feedback-form"
          element={<RatingFeedback tele={tele} />}
        ></Route>
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

        <Route path="/" element={<>Welcome!</>}></Route>
        <Route path="*" element={<>Page not found</>}></Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
