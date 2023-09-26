import "./App.css";
import FarmerProfile from "./views/FarmerProfile";
import Adoption from "./views/Adoption";
import AdvisoryDissemination from "./views/AdvisoryDissemination";
import "./components/styles/common.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Feedback from "./views/Feedback";
import { useEffect } from "react";

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
    <Routes>
      <Route path="/farmer-profile" element={<FarmerProfile />} />
      <Route path="/farmer-profile/feedback" element={<Feedback />} />
      <Route path="/adoption" element={<Adoption />} />
      <Route path="/adoption/feedback" element={<Feedback />} />
      <Route
        path="/advisory-dissemination"
        element={<AdvisoryDissemination />}
      />
      <Route path="/advisory-dissemination/feedback" element={<Feedback />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default App;
