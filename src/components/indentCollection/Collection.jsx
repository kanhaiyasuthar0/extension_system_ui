import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Input, Select, Button, Badge } from "antd";
// import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Collection = ({
  loading,
  farmers,
  uom,
  variety,
  products,
  handleChangeSelect,
  handleAdd,
  ongoingData,
  categories,
  memoizedallProductsData,
  handleSubmit,
  savedData,
  //   handleClear,
}) => {
  //   props.categories = ["Seeds/Saplings", "Fertilizers/Chemicals"];
  //   props.completeData = {
  //     listOfProducts: [],
  //     listOfVariety: [],
  //     listOfUom: [],
  //   };
  //   props.template = {
  //     categorySelected: "",
  //     product: "",
  //     variety: "",
  //     UoM: "",
  //     quantity: 0,
  //   };

  // const props.handleAddProduct = ()=>{

  //   }

  //   props.addProducts = [];

  const list = (prev, prevOn, cur, number) => {
    let final = [];
    let finalObj = {};
    for (let i = 0; i < memoizedallProductsData?.length; i++) {
      if (
        memoizedallProductsData[i][prev] == ongoingData[prevOn] &&
        !finalObj[memoizedallProductsData[i][cur]]
      ) {
        final.push({
          value: memoizedallProductsData[i][cur],
          label: memoizedallProductsData[i][cur],
        });
        finalObj[memoizedallProductsData[i][cur]] = true;
      }
    }
    console.log(finalObj, "finalObj");

    // console.log(memoizedallProductsData, "memoizedallProductsData");
    // let final = memoizedallProductsData.map((each) => {
    //   //   console.log(each["Product Category"], ongoingData);
    //   if (each["Product Category"] == ongoingData["category"]) {
    //     return { value: each["Product Name"], label: each["Product Name"] };
    //   }
    // });
    console.log("🚀 ~ file: Collection.jsx:44 ~ listOfProduct ~ final:", final);
    return [...new Set(final)];
    // console.log("🚀 ~ file: Collection.jsx:42 ~ final ~ final:", final);
    // return [{ value: "p1", label: "p1" }];
  };
  return (
    <>
      <div style={{ textAlign: "left" }}>
        <h3>
          {window.location.pathname.includes("collection")
            ? "Create an Indent"
            : "Record Distributtion"}{" "}
        </h3>
        <Typography> Please select a farmer</Typography>
        <Select
          value={ongoingData["farmer"]}
          style={{ width: "300px" }}
          onChange={(e) => handleChangeSelect("farmer", e, 0)}
          options={farmers?.map((each) => ({ value: each, label: each }))}
        />
        <div className="mtop25">
          {categories.map((each) => {
            return (
              <Chip
                disabled={!ongoingData["farmer"]}
                className="m12"
                onClick={() => handleChangeSelect("category", each, 1)}
                variant={
                  ongoingData["category"] == each ? "filled" : "outlined"
                }
                color="primary"
                label={each}
              />
            );
          })}
        </div>
        {/* product: "", uom: "", variety: "", quanity: "", category: "", */}
        <div className="mtop25">
          <Typography> Please select product category</Typography>

          <Select
            // open={ongoingData["category"]}
            value={ongoingData["product"]}
            style={{ width: 300 }}
            onChange={(e) => handleChangeSelect("product", e, 2)}
            options={
              ongoingData["category"]
                ? list("Product Category", "category", "Product Name")
                : []
            }
          />
        </div>
        <div className="mtop25">
          <Typography> Please select product variety</Typography>

          <Select
            value={ongoingData["variety"]}
            style={{ width: 300 }}
            onChange={(e) => handleChangeSelect("variety", e, 3)}
            options={
              ongoingData["product"]
                ? list("Product Name", "product", "Product Variety")
                : []
            }
          />
        </div>
        <div className="mtop25">
          <Typography> Please select product unit of measurement</Typography>

          <Select
            value={ongoingData["uom"]}
            style={{ width: 300 }}
            onChange={(e) => handleChangeSelect("uom", e, 4)}
            options={
              ongoingData["variety"]
                ? list("Product Variety", "variety", "UOM")
                : []
            }
          />
        </div>
        <div className="mtop25" style={{ width: "300px" }}>
          <Typography> Please provide product quantity</Typography>

          <Input
            value={ongoingData["quantity"]}
            placeholder="Provide the no"
            type="number"
            disabled={!ongoingData["uom"]}
            onChange={(e) => handleChangeSelect("quantity", e.target.value, 5)}
          />
        </div>
      </div>
      <div
        className="mtop25"
        style={{
          textAlign: "right",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          disabled={!ongoingData["quantity"]}
          variant="outlined"
          onClick={handleAdd}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "end",
          }}
        >
          <AddCircleOutlineIcon /> Add product
        </Button>
        <Badge count={savedData.length}>
          {/* <Avatar shape="square" size="large" /> */}
          <Button>Total products added</Button>
        </Badge>
      </div>
      <div className="mtop25">
        <Button
          disabled={!savedData.length > 0}
          loading={loading}
          variant="contained"
          color="success"
          onClick={handleSubmit}
          type="primary"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Collection;
