import { Container, Grid, Typography } from '@mui/material'
import React from 'react'

const About = () => {
    return (
        <Container id={'about'} sx={{ color: "text.primary" }}>
            <Typography gutterBottom variant='h3' component={'h2'}>About Me</Typography>
            <Grid container>
                <Grid item sx={{ display: { xs: "none", sm: "" } }} md={6}>
                    {/* img here! */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{
                        textAlign: { xs: "center", md: "start" },
                        lineHeight: "25px",
                        fontSize: "1.2rem",
                    }}>
                        I am a results-driven frontend developer with a keen eye for detail and a knack for transforming ideas into interactive digital experiences. With tow years of experience in the field, I specialize in creating responsive and intuitive web interfaces. My goal is to enhance user experiences by implementing cutting-edge technologies and design trends.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default About