import React, { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'

const FlashMsg = ({ message, severity, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration);

    return () => clearTimeout(timer)
  }, [duration])

  return visible ? (
    <Alert severity={severity}>{message}</Alert>
  ) : null
};

export default FlashMsg
