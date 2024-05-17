import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

function SimpleSnackbar({ open, onClose }) {
  return (
    <article>
      <Snackbar
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={6000}
        // Custom style for SnackbarContent
        ContentProps={{
          sx: { background: "#000", color: '#fff', boxShadow: 'none' },
        }}
      >
        <MuiAlert onClose={onClose} severity="success" variant='filled'>
          New Fund Ad Successfully created!
        </MuiAlert>
      </Snackbar>
    </article>
  );
}

export default SimpleSnackbar;
