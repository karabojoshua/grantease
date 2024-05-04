import { CircularProgress } from "@mui/material";
import { getQuery } from "../../dataprovider";
import { CenteredLayout } from "../../layouts";
import { AdminDashboard } from "./admin/dashboard";
import { FundManagerDashboard } from "./fund-manager/dashboard";
import { UserDashboard } from "./user/dashboard";

export const Dashboard = () => {
    const { data, isError, isLoading } = getQuery('user/meta');
    if (isLoading) {
        return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
    };
    if (isError) {
        Navigate("/error");
    };
    console.log(data.role)
    if (data.role === "fund_manager") {
        return (<FundManagerDashboard />)
    }
    else if(data.role === "admin"){
        return(<AdminDashboard />);
    }
    else{
        return(<UserDashboard/>);
    }
}