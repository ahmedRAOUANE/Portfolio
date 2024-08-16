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