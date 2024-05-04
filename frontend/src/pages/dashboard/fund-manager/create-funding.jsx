import { Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMutation } from "../../../dataprovider";

const CreateFundingOpportunity = () => {
  const { mutate: createFundingOpportunity } = createMutation({
    resource: "manager/create-funding-opportunities",
    invalidateKeys: ["funding-opportunities"],
    contentType: "empty",
  });
  
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    createFundingOpportunity(form);
    event.target.reset();
  };

  const navigate = useNavigate();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={8}>
          <section
            className="breadcrum"
            style={{ padding: "2rem 4rem", paddingBottom: "0rem" }}
          >
            <a
              className="button breadcrum"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              {" "}
              {"<"} Go Back{" "}
            </a>
          </section>
          <Paper elevation={0} style={{ padding: "2rem 4rem" }}>
            <Typography variant="h5" gutterBottom>
              Create Funding Opportunity
            </Typography>
            <small>Give clear details for the public to comprehend</small>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                fullWidth
                margin="normal"
                placeholder="YYYY-MM-DD"
              />
              <TextField
                label="End Date"
                name="end_date"
                type="date"
                fullWidth
                margin="normal"
                placeholder="YYYY-MM-DD"
              />
              <TextField
                label="Deadline"
                name="deadline"
                type="date"
                fullWidth
                margin="normal"
              />
              {/* File Attachment Section */}
              <input
                name="image"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="image"
              />
              <label htmlFor="image">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  style={{ marginTop: 20 }}
                >
                  Attach Image
                </Button>
              </label>
              {image && (
                <Typography variant="body1">{image.name}</Typography>
              )}
              {/* End of File Attachment Section */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 20 }}
              >
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
