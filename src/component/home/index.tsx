"use client";
import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { Api } from "@/component/api";
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
  imdbID: string;
}
const isBrowser = typeof window !== "undefined";
const MoviePage = () => {
  const [movie, setMovie] = useState<Movie[]>(() => {
    if (isBrowser) {
      const storedMovieData = localStorage.getItem("movieData");
      return storedMovieData ? JSON.parse(storedMovieData) : [];
    }
    return [];
  });

  const [searchValue, setSearchValue] = useState(
    isBrowser ? localStorage.getItem("searchValue") || "" : ""
  );
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (isBrowser) {
      localStorage.setItem("searchValue", value);
    }
  };
  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${searchValue}&apikey=55452302`
      );
      if (response?.data) {
        const responseData = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setMovie(responseData);
        localStorage.setItem("movieData", JSON.stringify(responseData));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClearSearch = () => {
    setSearchValue("");
    setMovie([]);
    if (isBrowser) {
      localStorage.removeItem("searchValue");
      localStorage.removeItem("movieData");
    }
  };
  const FooterButton = {
    "&.MuiButton-root": {
      backgroundColor: "#d1ac70",
      color: "#fff",
    },
  };
  return (
    <>
      <Box
        sx={{
          backgroundImage:
            movie && movie.length > 0 && movie[0].Poster
              ? `url(${movie[0].Poster})`
              : "url('/movieImages.webp')",
          width: "100%",
          display: "grid",
          placeItems: "center",
          gridTemplateRows: "minmax(100vh,auto)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundAttachment: "fixed",
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleButtonClick();
                }
              }}
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
          {movie && movie.length > 0
            ? movie.map((element) => {
                return element.Title ? (
                  <Box key={element.imdbID} sx={{ my: 5 }}>
                    <Card sx={{ maxWidth: 350, borderRadius: 6 }}>
                      <CardMedia sx={{ textAlign: "center", mt: 2 }}>
                        <Image
                          src={element.Poster}
                          alt={element.Title}
                          width={320}
                          height={270}
                          style={{
                            borderRadius: 15,
                          }}
                        />
                      </CardMedia>
                      <CardContent sx={{ px: 2, pt: 1, pb: "16px !important" }}>
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
                        {Api.filter(
                          (val) =>
                            val.name.toLowerCase() === searchValue.toLowerCase()
                        ).map((val, index) => (
                          <div key={index}>
                            <Typography
                              variant="body2"
                              sx={{
                                textAlign: "start",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {val.name.toLowerCase() ===
                              searchValue.toLowerCase() ? (
                                <>
                                  Link: <a href="/">Click Here</a>
                                </>
                              ) : (
                                <>Link: NA</>
                              )}
                            </Typography>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", mt: 3 }}
                    key="no-movies"
                  >
                    No movies found!
                  </Typography>
                );
              })
            : null}
        </Stack>
      </Box>
    </>
  );
};

export default MoviePage;
