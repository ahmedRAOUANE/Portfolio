import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

const MyWorks = () => {
    return (
        <Container id="works" sx={{ color: "text.primary" }}>
            <Typography variant='h3' component={'h2'} gutterBottom>My works</Typography>
            <Stack useFlexGap spacing={6}>
                <Typography sx={{ fontSize: "1.2rem" }}>
                    Explore my portfolio to see a selection of my frontend projects.
                    From dynamic single-page applications to visually engaging websites,
                    each project represents my dedication to creating seamless user experiences.
                    I believe in the power of collaboration and have had the pleasure of working
                    with diverse teams and clients to bring digital visions to life.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        klook
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Your world of joy,
                                        From local escapes to far-flung adventures, find what makes you happy anytime, anywhere
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        klook
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Your world of joy,
                                        From local escapes to far-flung adventures, find what makes you happy anytime, anywhere
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        klook
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Your world of joy,
                                        From local escapes to far-flung adventures, find what makes you happy anytime, anywhere
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1670577664/banner/rtw7fgqatgoc1vpcpamb.webp"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        klook
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Your world of joy,
                                        From local escapes to far-flung adventures, find what makes you happy anytime, anywhere
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}

export default MyWorks