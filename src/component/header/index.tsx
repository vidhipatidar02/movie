import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <Box sx={{ position: "sticky", top: 0 }}>
        <Grid container sx={{ backgroundColor: "#000", p: 1 }}>
          <Grid item xs={6}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <Image
                src="/logo.jpeg"
                alt="logo"
                width={40}
                height={40}
                style={{
                  borderRadius: "50px",
                  objectFit: "cover",
                }}
              />
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                Movie
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#d1ac70",
                "&:hover": {
                  backgroundColor: "#d1ac70",
                },
              }}
            >
              <Link
                href="/LatestUpdate"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Latest Films
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;
