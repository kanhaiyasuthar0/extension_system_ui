import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Input, Badge, Avatar } from "antd";
// import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//mui imports
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Heading from "../generic/Heading";
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
          id: memoizedallProductsData[i]["id"],
        });
        finalObj[memoizedallProductsData[i][cur]] = true;
      }
    }

    return [...new Set(final)];
  };
  return (
    <>
      <div style={{ textAlign: "left" }}>
        {/* <h3>
          {window.location.pathname.includes("collection")
            ? "Create an Indent"
            : "Record Distributtion"}{" "}
        </h3> */}
        <Heading
          value={
            window.location.pathname.includes("collection")
              ? "Create an Indent"
              : "Record Distributtion"
          }
        />
        <div className="each_mui_component">
          <FormControl fullWidth>
            <InputLabel style={{}} id="demo-simple-select-label">
              Please select a farmer
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ongoingData["farmer"]}
              label={"Please select a farmer"}
              onChange={(e) => handleChangeSelect("farmer", e.target.value, 0)}
            >
              {farmers?.map((each, index) => {
                return (
                  <MenuItem key={index} value={each}>
                    {each}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {/* <Typography> Please select a farmer</Typography>
        <Select
          value={ongoingData["farmer"]}
          style={{ width: "300px" }}
          onChange={(e) => handleChangeSelect("farmer", e, 0)}
          options={farmers?.map((each) => ({ value: each, label: each }))}
        /> */}
        <div className="mtop25 each_mui_component">
          <FormControl fullWidth>
            <InputLabel style={{}} id="demo-simple-select-label">
              Type of Input
            </InputLabel>
            <Select
              // fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ongoingData["category"]}
              label={"Type of Input"}
              onChange={(e) =>
                handleChangeSelect("category", e.target.value, 1)
              }
            >
              {categories?.map((each, index) => {
                return (
                  <MenuItem key={index} value={each}>
                    {each}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* {categories.map((each) => {
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
          })} */}
        </div>
        {/* product: "", uom: "", variety: "", quanity: "", category: "", */}
        <div className="mtop25 each_mui_component">
          <FormControl fullWidth>
            <InputLabel style={{}} id="demo-simple-select-label">
              Please select product category
            </InputLabel>

            <Select
              label={"Please select product category"}
              // open={ongoingData["category"]}
              value={ongoingData["product"]}
              // style={{ width: 300 }}
              onChange={(e) => handleChangeSelect("product", e.target.value, 2)}
              // options={
              //   ongoingData["category"]
              //     ? list("Product Category", "category", "Product Name")
              //     : []
              // }
            >
              {list("product_category", "category", "product_name")?.map(
                (each, index) => {
                  return (
                    <MenuItem key={index} value={each.value}>
                      {each.label}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </div>
        <div className="mtop25 each_mui_component">
          <FormControl fullWidth>
            <InputLabel style={{}} id="demo-simple-select-label">
              Please select product variety
            </InputLabel>

            <Select
              fullWidth
              label="Please select product variety"
              value={ongoingData["variety"]}
              onChange={(e) => handleChangeSelect("variety", e.target.value, 3)}
              // options={
              //   ongoingData["product"]
              //     ? list("Product Name", "product", "Product Variety")
              //     : []
              // }
            >
              {memoizedallProductsData?.map((each, index) => {
                console.log(each, ongoingData, "123");
                return (
                  each["product_name"] == ongoingData["product"] && (
                    <MenuItem key={index} value={each.product_variety_name}>
                      {each.product_variety_name}
                    </MenuItem>
                  )
                );
              })}

              {/* {list("product_name", "product", "product_variety_name")?.map(
                (each, index) => {
                  return (
                    <MenuItem key={index} value={each.value}>
                      {each.label}
                    </MenuItem>
                  );
                }
              )} */}
            </Select>
          </FormControl>
        </div>
        <div className="mtop25 each_mui_component">
          <FormControl fullWidth>
            <InputLabel style={{}} id="demo-simple-select-label">
              Please select product unit of measurement
            </InputLabel>
            <Select
              label="Please select product unit of measurement"
              value={ongoingData["uom"]}
              // style={{ width: 300 }}
              onChange={(e) => handleChangeSelect("uom", e.target.value, 4)}
              // options={
              //   ongoingData["variety"]
              //     ? list("Product Variety", "variety", "UOM")
              //     : []
              // }
            >
              {memoizedallProductsData?.map((each, index) => {
                return (
                  each["product_variety_name"] == ongoingData["variety"] && (
                    <MenuItem key={index} value={each.id}>
                      {each.uom}
                    </MenuItem>
                  )
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="mtop25 each_mui_component">
          {/* <Typography> Please provide product quantity</Typography> */}
          <TextField
            fullWidth
            id="outlined-basic"
            disabled={!ongoingData["uom"]}
            onChange={(e) => handleChangeSelect("quantity", e.target.value, 5)}
            type="number"
            placeholder="Provide the no"
            label="Please provide product quantity"
            variant="outlined"
            value={ongoingData["quantity"]}
          />
          {/* <Input
            value={ongoingData["quantity"]}
            placeholder="Provide the no"
            type="number"
            disabled={!ongoingData["uom"]}
            onChange={(e) => handleChangeSelect("quantity", e.target.value, 5)}
          /> */}
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
          className="secondary_button"
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
          + Add more product
        </Button>
        <Badge count={savedData.length} showZero>
          {/* <Avatar shape="square" size="large" /> */}
          {/* < style={{ border: "none" }}>Total products added</> */}

          <Avatar size={40}>Total</Avatar>
        </Badge>
      </div>
      <div className="mtop25">
        <Button
          className="primary_button main_button"
          //   disabled={!savedData.length > 0}
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
