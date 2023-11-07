import { Box, Link, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box bgcolor={'darkgray'}>
            <Typography sx={{ textAlign: 'center' }}>
                © 2023 - Developed by: <Link>ahmedRAOUANE</Link>
            </Typography>
        </Box>
    )
}

export default Footer