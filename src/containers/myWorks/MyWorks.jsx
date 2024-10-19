import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { fileManagementSystemImg, shopco } from '../../assets/imgs';

const projects = [
    {
        name: "SHOP.CO",
        desc: "a Next.js E-Commerce App, with pure CSS, and static data from fakestore api and ason placeholder",
        img: shopco.url,
        link: "https://shop-co-virid-two.vercel.app/",
    },
    {
        name: "File Managment System",
        desc: "a react web application to handle and save your files, with firebase as bakend",
        img: fileManagementSystemImg.url,
        link: "https://ahmedraouane.github.io/file-management-system/",
    },
]

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
                    {projects.map((project, idx) => (
                        <Grid key={idx} item xs={12} sm={6} md={3}>
                            <Card>
                                <CardActionArea>
                                    <Link href={project.link} target="_blank" underline="none">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={project.img}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ height: 150 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {project.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {project.desc}
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Container>
    )
}

export default MyWorks