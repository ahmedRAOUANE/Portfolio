import { Card, CardContent, CardHeader, Container, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'

const Expertise = () => {
    return (
        <Container id="expertise">
            <Typography color="text.primary" gutterBottom variant='h3' component={'h2'}>My Expertise</Typography>
            <Grid container>
                <Grid item sx={{ "@media(max-width: 767px)": { display: 'none' } }} md={6}>
                    {/* img here */}
                </Grid>
                <Grid item md={6}>
                    <Stack useFlexGap spacing={3}>
                        <Typography sx={{ my: "20px", color: "text.primary", fontSize: "1.2rem" }}>
                            As a frontend developer, I am proficient in a variety of technologies and tools, including:
                        </Typography>
                        <Grid container sx={{ justifyContent: { xs: "center", md: "start" }, gap: 2 }}>
                            <Grid item xs={12} sm={5}>
                                <Card elevation={3} sx={{ height: "100%" }}>
                                    <CardHeader title="Languages: " />
                                    <CardContent>
                                        <List>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>HTML,</ListItemText>
                                            </ListItem>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>CSS,</ListItemText>
                                            </ListItem>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>JavaScript</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Card elevation={1} sx={{ height: "100%" }}>
                                    <CardHeader title="Framworks: " />
                                    <CardContent>
                                        <List>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>React js</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Card elevation={1} sx={{ height: "100%" }}>
                                    <CardHeader title="Tools: " />
                                    <CardContent>
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
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Card elevation={1} sx={{ height: "100%" }}>
                                    <CardHeader title="design: " />
                                    <CardContent>
                                        <List>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>Responsive Design,</ListItemText>
                                            </ListItem>
                                            <ListItem sx={{ p: 0, pl: '5px' }}>
                                                <ListItemText>UI/UX Principles</ListItemText>
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Expertise