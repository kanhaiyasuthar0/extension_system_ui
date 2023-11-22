import { useEffect } from "react";
import FormWithTabs from "../components/generic/FormWithTabs";
import database from "../data/db.json";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Assessment = (props) => {
  const [index, setIndex] = useState(2);
  const [items, setItem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // if (id) {
    //   setIndex(id);
    setItem([
      {
        key: "1",
        label: "मूल्यांकन",
        data: database.assessment[id ?? 4],
      },
    ]);
    // }
  }, []);
  return (
    <>
      {id == 1 ? (
        <strong>No assessment</strong>
      ) : (
        <>
          <h6 style={{ textAlign: "left", fontSize: "14px" }}>
            निर्देश:
            <div>
              1. कृपया वीडियो पूरा देखें और सभी प्रश्नों के उत्तर दें। समय सीमा
              का पालन करें।
            </div>
            <div>
              2. प्रश्नों के बीच नेविगेट करने के लिए 'अगला' और 'पिछला' बटन का
              उपयोग करें। उत्तर सुधारने के लिए प्रश्न पर वापस जाएं और 'सबमिट'
              करने के लिए अंत में 'सबमिट (Submit)' बटन दबाएं।
            </div>
          </h6>
          <FormWithTabs data={items} tele={props.tele} />
        </>
      )}
    </>
  );
};

export default Assessment;
