import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import ManageUsers from "./manage-users";
import RoleChangeRequest from "./role-change-request";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const AdminDashboard = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: "0", fontSize: "2.5rem" }}>Admin Dashboard</h1>
        <p style={{ fontSize: "1rem", margin: "0" }}>Welcome Back!</p>
      </section>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Manager Users" {...a11yProps(0)} />
          <Tab label="New Fund Managers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManageUsers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RoleChangeRequest />
      </CustomTabPanel>
    </>
  );
};
