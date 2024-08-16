import { Box, Link, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box sx={{ color: "text.primary" }}>
            <Typography sx={{ textAlign: 'center' }}>
                © 2024 - Developed by: <Link sx={{
                    color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                }}>ahmedRAOUANE</Link>
            </Typography>
        </Box>
    )
}

export default Footer