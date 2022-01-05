import React from "react";
import { Box, Typography, Button } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const ArticleCard = ({ article }) => {
  const { image, title, shortDescription, author, createdAt, slug } =
    article.node;
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        textAlign: "center",
      }}
      mb={5}
    >
      <img
        src={image.url}
        alt={title}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <Box px={8}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            cursor: " pointer",
            transition: "0.4s ease-in-out",
            "&:hover": { color: "#3f049c" },
          }}
          py={3}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
            }}
            px={4}
          >
            <img
              src={author.photo.url}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              alt={author.name}
            />
            <Typography
              variant="subtitle2"
              sx={{
                display: "inline",
                paddingLeft: "10px",
                color: "#474747",
                fontWeight: " 400",
              }}
            >
              {author.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: " center",
            }}
            px={4}
          >
            <CalendarTodayOutlinedIcon sx={{ color: " #3f049c" }} />
            <Typography
              variant="subtitle2"
              sx={{ paddingLeft: "10px", color: "#474747", fontWeight: " 400" }}
            >
              {moment(createdAt).format("ll")}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          component="p"
          py={3}
          sx={{ color: "#474747", fontWeight: " 300" }}
        >
          {shortDescription}
        </Typography>

        <Link href={`/article/${slug}`}>
          <Button
            sx={{
              borderRadius: "200px",
              padding: "10px 20px",
              backgroundColor: "#3f049c",
              transition: "0.4s ease-in-out",
              color: "white",
              "&:hover": { backgroundColor: "#2673FB", color: "white" },
            }}
          >
            continue reading
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ArticleCard;
