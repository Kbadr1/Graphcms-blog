import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        px: 4,
        py: 2,
      }}
    >
      <Typography variant="h6" sx={{ py: 1, fontWeight: "500" }}>
        Categories
      </Typography>
      {categories.map((category) => (
        <Link key={category.name} href={`/category/${category.slug}`}>
          <Typography
            variant="subtitle1"
            sx={{
              borderTop: "1px solid #e6e6e6",
              py: 1,
              cursor: " pointer",
              color:
                router.asPath == `/category/${category.slug}`
                  ? "#3f049c"
                  : "#464646",
              fontWeight:
                router.asPath == `/category/${category.slug}` ? "500" : "400",
            }}
          >
            {category.name}
          </Typography>
        </Link>
      ))}
    </Box>
  );
};

export default Categories;
