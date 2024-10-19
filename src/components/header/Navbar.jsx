import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavbarList from './NavbarList';

const Navbar = () => {
    const [showNavList, setShowNavList] = useState(false);

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing: '2px' }}>
                        <svg width="30" height="40" xmlns="http://www.w3.org/2000/svg">
                            <text x="0" y="40" font-family="Arial" font-size="40" fill="white">A</text>
                        </svg>
                        hmed
                    </Typography>
                    <IconButton
                        onClick={() => setShowNavList(!showNavList)}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            "@media (min-width: 768px)": {
                                display: "none",
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavbarList show={showNavList} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;