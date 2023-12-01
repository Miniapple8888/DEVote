import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react'

const LoadingScreen = ({ loading = true }) => {
  return (<Backdrop open={loading}>
    <CircularProgress size="8rem" />
  </Backdrop>);
}

export default LoadingScreen;
