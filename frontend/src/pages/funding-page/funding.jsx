import { CircularProgress, Grid } from '@mui/material';
import PrimarySearchAppBar from '../../components/app-bar';
import { getQuery } from "../../dataprovider";
import { CenteredLayout } from '../../layouts';
import './funding-page-styles.css';

const FundingPage = () => {
    const { data, isError, isLoading } = getQuery("funding-opportunities");
    if (isLoading) {
        return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <div>
            <PrimarySearchAppBar />
            <main>
                <section className='HeroSection'>
                    <h1 style={{marginTop: '0'}}>Find Your Funding Here!</h1>
                    <section className='BigSearchSection'>
                        <form action="" method="post">
                            <input type="search" name="find-funding" id="find-funding" placeholder='Company or keyword' />
                            <button type="submit">Search</button>
                        </form>
                        
                    </section>
                </section>
                
                {/* <Grid container spacing={3}>
                    {data.map(fund => (
                        <Grid item key={fund.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardHeader
                                    title={fund.title}
                                    subheader={`Amount: $${parseFloat(fund.amount).toFixed(2)}`}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {fund.description}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Start Date: {new Date(fund.start_date).toDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        End Date: {new Date(fund.end_date).toDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Deadline: {new Date(fund.deadline).toDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid> */}

                <Grid component={'section'} container spacing={3} style={{marginTop: '1rem'}}>
                {data.map(fund => (
                    <Grid item key={fund.id} xs={12} sm={6} md={4}>
                        <article className="card">
                            <section className="card-header">
                                <img src="./favicon-32x32.png" alt="funder-icon" />
                                <p className="closing-date">{new Date(fund.deadline).toDateString()}</p>
                            </section>
                            <section className="card-main">
                                <h2>{fund.title}</h2>
                                <p>{`Amount: $${parseFloat(fund.amount).toFixed(2)}`}</p>
                                <p>{fund.description}</p>
                            </section>
                            <section className="card-footer">
                                <input className="btn" type="submit" value="Apply"/>
                            </section>
                        </article>
                    </Grid>
                    ))}
                </Grid>
            </main>
            
        </div>
    )
}

export default FundingPage;