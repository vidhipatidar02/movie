"use client";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import productStyle from "./page.module.css";
interface Movie {
  Title: string;
  Poster: any;
  Released: string;
  Director: string;
  Writer: string;
  Language: string;
  Country: string;
  Awards: string;
  Actors: string;
}
const MoviePage = () => {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${searchValue}&apikey=55452302`
      );
      if (response?.data) {
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setMovie(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClearSearch = () => {
    setSearchValue("");
  };
  const FooterButton = {
    "&.MuiButton-root": {
      backgroundColor: "#d1ac70",
      color: "#fff",
    },
  };
  return (
    <Box
      sx={{
        backgroundImage:
          movie && movie.length > 0 && movie[0].Poster
            ? `url(${movie[0].Poster})`
            : "url('/movieImages.webp')",
        width: "100%",
        display: "grid",
        placeItems: "center",
        gridTemplateRows: "minmax(100vh, auto)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "rgba(0,0,0,0.6)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            mt: "5%",
            width: { lg: "30%", md: "40%", sm: "50%", xs: "70%" },
          }}
        >
          <InputBase
            value={searchValue}
            onChange={handleInputChange}
            sx={{
              ml: "10px",
              flex: 1,
              py: "8px",
              fontSize: "14px",
              color: "#171a1c",
              fontWeight: 500,
            }}
            placeholder="Search Movie"
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleClearSearch}
          >
            <CloseIcon />
          </IconButton>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            sx={{
              py: "12px",
              ...FooterButton,
              borderRadius: "10px",
              textTransform: "capitalize",
            }}
          >
            Search
          </Button>
        </Paper>
        <Box sx={{ my: 5 }}>
          {movie && movie.length > 0
            ? movie.map((element) => {
                return element.Title ? (
                  <>
                    <Card sx={{ maxWidth: 350 }}>
                      <CardHeader
                        avatar={
                          <Avatar alt="Remy Sharp" src={element.Poster} />
                        }
                        title={element.Title}
                        subheader={element.Released}
                      />
                      <CardMedia>
                        <Image
                          src={element.Poster}
                          alt={element.Title}
                          width={370}
                          height={300}
                        />
                      </CardMedia>
                      <CardContent>
                        <Typography variant="body2">
                          Director : {element.Director}
                        </Typography>
                        <Typography variant="body2">
                          Writer : {element.Writer}
                        </Typography>
                        <Typography variant="body2">
                          Actors : {element.Actors}
                        </Typography>
                        <Typography variant="body2">
                          Language : {element.Language}
                        </Typography>
                        <Typography variant="body2">
                          Country : {element.Country}
                        </Typography>
                        <Typography variant="body2">
                          Awards : {element.Awards}
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    No movies found!
                  </Typography>
                );
              })
            : null}
        </Box>
      </Stack>
    </Box>
  );
};

export default MoviePage;
{
  /* <Grid container>
<Grid item lg={3} md={4} sm={6} xs={12}>
  <Card
    sx={{
      position: "relative",
      maxWidth: 295,
      borderRadius: "20px",
    }}
    className={productStyle.productContainer}
  >
    <CardActionArea
      className={productStyle.productCard}
      disableTouchRipple={true}
      sx={{
        position: "relative",
        height: "450px",
        bgcolor: "#232323",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "context-menu",
      }}
    >
      <CardMedia
        className={productStyle.productImageBox}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          height: "0px",
          transition: "1s",
        }}
      >
        <Image
          src={element.Poster}
          alt={element.Title}
          width={370}
          height={300}
        />
      </CardMedia>
      <CardContent
        className={productStyle.productContainBox}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100px",
          textAlign: "center",
          transition: "1s",
          zIndex: 10,
        }}
      >
        <Typography variant="body2">
          Director : {element.Director}
        </Typography>
        <Typography variant="body2">
          Writer : {element.Writer}
        </Typography>
        <Typography variant="body2">
          Actors : {element.Actors}
        </Typography>
        <Typography variant="body2">
          Language : {element.Language}
        </Typography>
        <Typography variant="body2">
          Country : {element.Country}
        </Typography>
        <Typography variant="body2">
          Awards : {element.Awards}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
</Grid>
</Grid> */
}
