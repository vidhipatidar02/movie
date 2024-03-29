"use client";
import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Api } from "@/component/api";
import Image from "next/image";
const LatestUpdatePage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          mb: 4,
        }}
      >
        {Api.map((val) => {
          return (
            <>
              <Box key={val.image} sx={{ mt: 4, mx: 3 }}>
                <Card
                  sx={{
                    maxWidth: 300,
                    borderRadius: 6,
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                  }}
                >
                  <CardMedia sx={{ textAlign: "center", mt: 2, px: 2 }}>
                    <Image
                      src={val.image}
                      alt={val.name}
                      width={270}
                      height={250}
                      style={{
                        borderRadius: 15,
                      }}
                    />
                  </CardMedia>
                  <CardContent sx={{ pt: 1, pb: "16px !important" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      Movie Link : <a href="/">Click Here</a>
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default LatestUpdatePage;
