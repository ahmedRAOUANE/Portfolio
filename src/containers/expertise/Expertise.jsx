import { Container, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'

const Expertise = () => {
    return (
        <Container>
            <Typography gutterBottom variant='h3' component={'h2'}>My Expertise</Typography>
            <Grid container>
                <Grid item md={6}>
                    <Typography sx={{ my: "20px" }}>
                        As a frontend developer, I am proficient in a variety of technologies and tools, including:
                    </Typography>
                    <Grid container wrap='wrap'>
                        <Grid item xs={6}>
                            <Paper elevation={1} sx={{ p: 2, mb: 4, width: "80%", height: '80%' }}>
                                <Typography variant='strong' component={'strong'}>Languages: </Typography>
                                <List>
                                    <ListItem sx={{p: 0, pl: '5px'}}>
                                        <ListItemText>HTML,</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{p: 0, pl: '5px'}}>
                                        <ListItemText>CSS,</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{p: 0, pl: '5px'}}>
                                        <ListItemText>JavaScript</ListItemText>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={1} sx={{ p: 2, mb: 4, width: "80%", height: '80%' }}>
                                <Typography variant='strong' component={'strong'}>Framworks: </Typography>
                                <List>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>React js</ListItemText>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={1} sx={{ p: 2, mb: 4, width: "80%", height: '80%' }}>
                                <Typography variant='strong' component={'strong'}>Tools: </Typography>
                                <List>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>Git,</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>Webpack,</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>npm</ListItemText>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={1} sx={{ p: 2, mb: 4, width: "80%", height: '80%' }}>
                                <Typography variant='strong' component={'strong'}>design: </Typography>
                                <List>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>Responsive Design,</ListItemText>
                                    </ListItem>
                                    <ListItem sx={{ p: 0, pl: '5px' }}>
                                        <ListItemText>UI/UX Principles</ListItemText>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ "@media(max-width: 767px)": { display: 'none' } }} md={6}>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Expertise