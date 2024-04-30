import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { getQuery } from "../../dataprovider";

const FundingPage = () => {
    const { data, isError, isLoading } = getQuery("funding-opportunities");

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <div>
            <h1>Funding</h1>
            <Grid container spacing={3}>
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
            </Grid>
        </div>
    )
}

export default FundingPage;