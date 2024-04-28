import PrimarySearchAppBar from "../../../components/AppBar";
import DashboardTabs from "../../../components/DashboardTabs";
import './dashboard-styles.css';

const AdminDashboard = ()=> {
  return (
    <>
        <PrimarySearchAppBar />
        <main>
            <section className="banner-area">
                <h2>Admin Dashboard</h2>
                <p>Welcome back!</p>
            </section>
            <DashboardTabs />
        </main>
        
    </>
  );
}

export default AdminDashboard;