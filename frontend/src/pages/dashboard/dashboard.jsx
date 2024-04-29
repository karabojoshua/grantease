import { CircularProgress } from "@mui/material"
import { getQuery } from "../../dataprovider"
import { CenteredLayout } from "../../layouts"
import { AdminDashboard } from "./admin-dashboard"

export const Dashboard = () =>{
    const { data, isError, isLoading } = getQuery("user-meta");
    
    if (isError || isLoading) {
        return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
    }

    return (
        (data?.role === "admin") ? <AdminDashboard /> : <AdminDashboard />
    )

}