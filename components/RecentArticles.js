import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getRecentArticles } from "../services";
import moment from "moment";
import Link from "next/link";

const RecentArticles = () => {
  const [recentArticles, setRecentArticles] = useState([]);

  useEffect(() => {
    getRecentArticles()
      .then((response) => setRecentArticles(response))
      .catch((error) => console.log(error));
  }, []);

  console.log(recentArticles);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        px: 4,
        py: 3,
        mb: 6,
      }}
    >
      <Typography variant="h6" sx={{ py: 1, fontWeight: "500" }}>
        Recent Articles
      </Typography>
      {recentArticles.map((article) => (
        <Link href={`/article/${article.slug}`} key={article.id}>
          <Box
            sx={{ borderTop: "1px solid #e6e6e6", py: 2, cursor: " pointer" }}
          >
            <Typography
              sx={{ color: "gray", fontWeight: "300" }}
              variant="subtitle2"
            >
              {moment(article.createdAt).format("ll")}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                transition: "0.4s ease-in-out",
                "&:hover": { color: "#3f049c" },
              }}
            >
              {article.title}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default RecentArticles;
