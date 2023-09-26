import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import FarmerProfile from "./views/FarmerProfile";
import Adoption from "./views/Adoption";
import AdvisoryDissemination from "./views/AdvisoryDissemination";
import InputsCollection from "./views/InputsCollection";
import "./components/styles/common.css";
import ContentRenderer from "./components/generic/ContentRenderer";
import database from "../src/data/db.json";
import { useRoutes } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Feedback from "./views/Feedback";
import { useEffect } from "react";

// 3️⃣ Router singleton created
const router = createBrowserRouter([{ path: "*", Component: Root }]);

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

  return <RouterProvider router={router} />;
}

// 1️⃣ Changed from App to Root
function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
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
