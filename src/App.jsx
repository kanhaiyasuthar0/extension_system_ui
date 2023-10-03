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
// 3️⃣ Router singleton created

function App() {
  const tele = window.Telegram.WebApp;
  useEffect(() => {
    console.log("TELEGRAM", window.Telegram);
    tele.ready();
    // setMobileNumber(queryMobileNumber);
  });
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

  return (
    <>
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
        <Route path="/assessment/:id">
          <Route index element={<Assessment tele={tele} />}></Route>
          <Route path=":type" element={<Feedback />}></Route>
        </Route>

        <Route path="/" element={<>Welcome!</>}></Route>
        <Route path="*" element={<>Page not found</>}></Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
