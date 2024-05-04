import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimarySearchAppBar from '../../../components/app-bar';
import { createMutation } from "../../../dataprovider";


const CreateFundingOpportunity = () => {

    const {mutate: createFundingOpportunity } = createMutation("manager/create-funding-opportunities", ["funding-opportunities"]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        start_date: '',
        end_date: '',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createFundingOpportunity(formData);
    };
    
    const navigate = useNavigate();
    return (
        <>
            <PrimarySearchAppBar />
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={8}>
                    <section className='breadcrum' style={{padding: '2rem 4rem', paddingBottom: '0rem'}}>
                        <a className='button breadcrum' onClick={() => {navigate("/dashboard")}}> {'<'} Go Back </a>
                    </section>
                    <Paper elevation={0} style={{ padding: '2rem 4rem' }}>
                        <Typography variant="h5" gutterBottom>Create Funding Opportunity</Typography>
                        <small>Give clear details for the public to comprehend</small>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                            />
                            <TextField
                                label="Amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Deadline"
                                name="deadline"
                                type="date"
                                value={formData.deadline}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                                Create
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
        
    );
};

export default CreateFundingOpportunity;
