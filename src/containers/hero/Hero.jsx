import React from 'react';
import { alpha, Box, Button, Container, Stack, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box sx={(theme) => ({
      width: '100%',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
          : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
      backgroundSize: '100% 20%',
      backgroundRepeat: 'no-repeat',
      color: "text.primary"
    })}>
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 14, sm: 20 },
        // pb: { xs: 8, sm: 12 },
      }}>
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(2rem, 10vw, 3.8rem)',
            }}
          >
            {"Welcome to "}
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(2rem, 10vw, 3.8rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Ahmed
            </Typography>
            {"'s "}
            {"Portfolio"}
          </Typography>

          <Typography whiteSpace={3} sx={{
            textAlign: "center",
            lineHeight: "25px",
            fontSize: "1.2rem",

          }}>
            Hello there! I'm Ahmed Raouane,
            a dedicated and creative frontend developer with a passion for crafting visually appealing
            and user-friendly websites. Through this platform, I invite you to explore my journey, skills,
            and the projects that showcase my expertise in frontend development.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant='contained'>view projects</Button>
            <Button variant='contained'>contact me</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

const Hero = () => {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: { xs: 14, sm: 20 },
      pb: { xs: 8, sm: 12 },
    }}>
      <Stack>
        <Typography gutterBottom variant='h3' component={'h2'}>Welcome to Ahmed's Portfolio</Typography>

        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ my: '20px' }} whiteSpace={3}>Hello there! I'm Ahmed Raouane, a dedicated and creative frontend developer with a passion for crafting visually appealing and user-friendly websites. Through this platform, I invite you to explore my journey, skills, and the projects that showcase my expertise in frontend development.</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant='contained' sx={{ mr: "20px" }}>view projects</Button>
              <Button variant='contained'>contact me</Button>
            </Box>
          </Grid>
          <Grid item sx={{ "@media(max-width: 767px)": { display: 'none' } }} md={6}>
            {/* img here! */}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

export default Hero