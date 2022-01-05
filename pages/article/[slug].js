import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { getArticleDetails, getArticles } from "../../services";
import Categories from "../../components/Categories";
import RecentArticles from "../../components/RecentArticles";

const ArticleDetails = ({ article }) => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                borderRadius: "10px",
                backgroundColor: "white",
                padding: "20px",
              }}
              mb={12}
            >
              <img
                src={article.image.url}
                style={{ width: "100%", borderRadius: "10px" }}
                alt=""
              />
              <Box sx={{ padding: "0" }}>
                <Typography variant="h5" sx={{ fontWeight: "600" }} mt={4}>
                  {article.title}
                </Typography>
                {article.content.raw.children.map((paragraph, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{ color: "#242424", fontWeight: "300" }}
                    pt={4}
                  >
                    {paragraph.children[0].text}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "rgb(0, 0, 0, 0.4)",
                borderRadius: "10px",
                color: "white",
                padding: "0px 30px 30px 30px",
              }}
              mb={6}
            >
              <img
                src={article.author.photo.url}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginTop: "-50px",
                }}
                alt=""
              />
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                {article.author.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgb(255, 255, 255, 0.7)", fontWeight: "300" }}
              >
                {article.author.bio}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: "40px", mb: 5 }}>
              <RecentArticles />
              <Categories />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleDetails;

export async function getStaticProps({ params }) {
  const data = await getArticleDetails(params.slug);
  return {
    props: {
      article: data,
    },
  };
}

export async function getStaticPaths() {
  const articles = await getArticles();
  return {
    paths: articles.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
