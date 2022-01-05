import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import navbarStyles from "../styles/Navbar.module.css";
import Link from "next/link";
import { getCategories } from "../services";

const Navbar = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    getCategories()
      .then((response) => setCategories(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        sx={{
          mb: 4,
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: "2px solid white",
        }}
      >
        <Toolbar disableGutters>
          <Link href="/">
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flex: 1,
                fontWeight: "600",
                cursor: "pointer",
              }}
              className={navbarStyles.lg_logo}
            >
              Front-End Blog
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.slug}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{category.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Front-End Blog
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color:
                      router.asPath == `/category/${category.slug}`
                        ? "#3f049c"
                        : "white",
                    display: "block",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    transition: "0.4s ease-in-out",
                    "&:hover": { color: "#3f049c " },
                  }}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
