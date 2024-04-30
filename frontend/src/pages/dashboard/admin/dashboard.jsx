import AppBar from "../../../components/app-bar"
import ManageUsers from "./manage-users"
import RoleChangeRequest from "./role-change-request"


export const AdminDashboard = () => {
    return (
        <>
            <AppBar />
            <main style={{paddingLeft: '2rem', paddingRight: '2rem'}}>
                <section style={{marginBottom: '2rem'}}>
                    <h1 style={{marginBottom: '0'}}>Admin Dashboard</h1>
                    <small>Welcome Back</small>
                </section>
                <RoleChangeRequest />
                <h2>Manage Users</h2>
                <ManageUsers />
                
            </main>
        </>
        
    )
}