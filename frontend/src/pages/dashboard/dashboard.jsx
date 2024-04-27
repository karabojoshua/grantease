import { CircularProgress } from "@mui/material"
import { getMany } from "../../dataprovider"
import { CenteredLayout } from "../../layouts"
import { AdminDashboard } from "./admin-dashboard"

/*
{
    "userId": "user_2fQ0wPce315v8apZ3k95qdAQ5e1",
    "role": "admin",
    "isBanned": 0
}
*/
export const Dashboard = () =>{

    const { data, isLoading, isError} = getMany({
        resource: "user-meta",
    })

    if (isError || isLoading) {
        return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
    }

    return (
        (data?.role === "admin") ? <AdminDashboard /> : <>Just Another User</>
    )

}