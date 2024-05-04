import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import AppBar from "../../../components/app-bar";
import ManageApplications from './applications.jsx';
import './fund-manager-styles.css';
import FundManagerOverviewCards from './overview.jsx';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const FundManagerDashboard = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <AppBar />
            <main style={{padding: '2rem'}}>
                <section style={{marginBottom: '2rem'}}>
                    <h1 style={{margin: '0', fontSize: '2.5rem'}}>Fund Manager Dashboard</h1>
                    <p style={{fontSize: '1rem', margin:'0'}}>Welcome Back!</p>
                </section>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="My Funding Ads" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <FundManagerOverviewCards/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <h2>Review Received Applications</h2>
                    <ManageApplications/>
                </CustomTabPanel>
            </main>
        </>
        
    )
}