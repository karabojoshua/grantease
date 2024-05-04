import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook from Material-UI
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicLineChart } from "./LineGraph";


export default function FundManagerOverviewCards() {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <article className="card-area">
            <section className="card-row">
                <article className="card graph-card">
                    <h3>History</h3>
                    <small>Jan 21/2024 - Now</small>
                    <p className="card-title">Funds You've Offered</p>
                    <section className="graph-area">
                        <BasicLineChart />
                    </section>
                </article>
                <article className="card-group">
                    <section style={{direction: 'flex', display: 'flex'}}>
                        <article className="card">
                            <section className='icon-area' style={{backgroundColor: theme.palette.primary.main}}>
                                <i> <PriceChangeIcon/> </i>
                                </section>
                            <h3>Total Applictions Received</h3>
                            <big>75</big>
                        </article>
                        <article className="card">
                            <section className='icon-area' style={{backgroundColor: theme.palette.primary.main}}>
                                <i><CurrencyExchangeIcon /></i>
                            </section>

                            <h3>Total Open Fund Ads</h3>
                            <big>11</big>
                        </article>
                    </section>
                    <article className="card" style={{height: '17rem'}}>
                        <h3>Total Balance</h3>

                        <big>R14 000</big>
                        <Stack component="section" className='action-area' direction="row" spacing={2}>
                            <Button variant="contained" color="primary">
                                Add Money
                            </Button>
                            <Button variant="outlined" color="primary">
                                Withdraw
                            </Button>
                        </Stack>
                    </article>
                </article>
                <article className="stacked-cards card-group" style={{backgroundColor: theme.palette.primary.main, borderColor: theme.palette.secondary.light}}>
                    <button className='action-button' onClick={() => {navigate("/create-funding")}}>
                        <i className='card-icon-area'>+</i>
                        <h3>Create New Funding Ad</h3>
                    </button>
                    <section style={{borderTop: '4px solid', borderBottom: '4px solid', borderColor: '#fffcf1'}}>
                        <h3>Currently Funding</h3>
                        <big>21</big>
                    </section>
                    <section>
                        <h3>Unattended Reports</h3>
                        <big>64</big>
                    </section>
                </article>
            </section>
        </article>
    );
}