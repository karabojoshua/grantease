import { Grid, Typography } from "@mui/material";
import PrimarySearchAppBar from "../../../components/app-bar";
import { FundingUserAppliedToTable } from "./applied-funding-table";
import './user-dashboard-styles.css';

export const UserDashboard = () => {
    return(
        <>
            <PrimarySearchAppBar />
            <main>
                <section className="page-heading-section" style={{marginBottom: '2rem'}}>
                    <h1 style={{margin: '0'}}>Dashboard</h1>
                    <small>Find, Track and Review All Your Applications Here!</small>
                </section>
                <Grid component={'section'} container spacing={3} style={{marginTop: '1rem'}}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <FundingUserAppliedToTable />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <article className="card text-center notifications-area">
                            <h2></h2>
                            <Typography variant="h5" component="div" align="center" gutterBottom>
                                Notifications
                            </Typography>
                        </article>
                    </Grid>
                </Grid>
            </main>
        </>
    );
}