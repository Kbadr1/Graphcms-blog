import React from "react";
import Head from "next/head";
import { Box, Typography, Container, Grid } from "@mui/material";
import { getCategoryArticles, getCategories } from "../../services";
import Categories from "../../components/Categories";
import ArticleCard from "../../components/ArticleCard";
import RecentArticles from "../../components/RecentArticles";

const CategoryPage = ({ articles }) => {
  return (
    <Box>
      <Head>
        <title>Front-End | {articles[0].node.category.name}</title>
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", my: 12 }}>
          <img
            src={articles[0].node.category.image.url}
            style={{ width: "120px" }}
            alt=""
          />
          <Typography
            variant="h2"
            sx={{ color: "white", mt: 4, fontWeight: "400" }}
          >
            Articles About {articles[0].node.category.name}
          </Typography>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            {articles.map((article) => (
              <ArticleCard article={article} key={article.cursor} />
            ))}
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

export default CategoryPage;

export async function getStaticProps({ params }) {
  const articles = await getCategoryArticles(params.slug);

  return {
    props: { articles },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
