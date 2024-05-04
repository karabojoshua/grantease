import { getQuery } from "../../dataprovider";
import { LoadingPage } from "../loading-page";
import { AdminDashboard } from "./admin/dashboard";
import { FundManagerDashboard } from "./fund-manager/dashboard";
import { UserDashboard } from "./user/dashboard";

export const Dashboard = () => {
    const { data, isError, isLoading } = getQuery('user/meta');
    if (isLoading) {
        return <LoadingPage/>
    };
    if (isError) {
        Navigate("/error");
    };
    
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