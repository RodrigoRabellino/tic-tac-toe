import { Container, Typography, Box, useMediaQuery, Card } from "@mui/material";
import { useState } from "react";

const GamePage = () => {
  const [player, setPlayer] = useState(0);
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const mq450 = useMediaQuery("(max-width:450px)");

  const cardStyles = {
    height: mq450 ? "75px" : "100px",
    width: mq450 ? "75px" : "100px",
    borderRadius: "15px",
    padding: "1rem",
    cursor: "pointer",
  };
  return (
    <Container sx={{ paddingY: "1rem", minHeight: "100vh" }}>
      <Typography variant="h2" fontWeight={800} pt="1rem" textAlign="center">
        Lets Go!
      </Typography>
      <Typography
        variant="h5"
        fontWeight={600}
        my="1rem"
        textAlign="center"
      >{`Player: ${player === 0 ? "O" : "X"}`}</Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 0fr)"
        gap={mq450 ? 1 : 2}
        justifyContent="center"
      >
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
        <Box gridColumn="span 1">
          <Card elevation={1} sx={cardStyles}></Card>
        </Box>
      </Box>
    </Container>
  );
};

export default GamePage;
