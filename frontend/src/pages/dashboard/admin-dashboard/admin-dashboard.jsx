//@ts-ignore
import PrimarySearchAppBar from "../../../components/AppBar";
//@ts-ignore
import DashboardTabs from "../../../components/DashboardTabs";
import './dashboard-styles.css';

const AdminDashboard = ()=> {
  return (
    <div>
        <PrimarySearchAppBar />
        <main>
            <section className="banner-area">
                <h2>Admin Dashboard</h2>
                <p>Welcome back!</p>
            </section>
            <DashboardTabs />
        </main>
        
    </div>
  );
}

export default AdminDashboard;