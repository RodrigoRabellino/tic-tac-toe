import { LinkedIn, Language, GitHub } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import GamePage from "../gamePage/GamePage";

const MainPage = () => {
  const [gameSelected, setGameSelected] = useState("");

  const mq450 = useMediaQuery("(max-width:450px)");

  const handleNewGame = (selected) => {
    setGameSelected(selected);
  };

  const handleEndGame = () => {
    setGameSelected("");
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      {gameSelected.length === 0 ? (
        <Box
          sx={{
            paddingY: "1rem",
            width: "100%",
            maxWidth: "650px",
            margin: "auto",
          }}
        >
          <Typography
            variant={mq450 ? "h4" : "h2"}
            fontWeight={800}
            pt="1rem"
            textAlign="center"
          >
            Wanna play?
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            mb="1rem"
            mt="2rem"
            textAlign="center"
          >
            Select a game:
          </Typography>
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-evenly"
          >
            <MyButton gameType={"1 vs 1"} onClick={handleNewGame} />
            <MyButton gameType={"1 vs PC"} onClick={handleNewGame} />
          </Box>
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-evenly"
          >
            <MyLink url={"https://www.linkedin.com/in/rodrigorabellino/"}>
              <LinkedIn fontSize="large" />
            </MyLink>
            <MyLink url={"https://www.rodrigorabellino.com/"}>
              <Language fontSize="large" />
            </MyLink>
            <MyLink url={"https://github.com/RodrigoRabellino"}>
              <GitHub fontSize="large" />
            </MyLink>
          </Box>
        </Box>
      ) : (
        <Fade
          in={gameSelected.length !== 0}
          timeout={{ appear: 1000, enter: 1000, exit: 1000 }}
        >
          <Box>
            <GamePage gameSelected={gameSelected} endGame={handleEndGame} />
          </Box>
        </Fade>
      )}
    </Container>
  );
};

const MyLink = ({ url, children }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (link) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.open(url, "_blank");
    }, 400);
  };

  const btnStyles = {
    transition: "0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    width: "32px",
    borderRadius: "50%",
    padding: "0.65rem",
    cursor: "pointer",
    backgroundColor: "#eaeaea",
    WebkitBoxShadow: loading ? "" : "4px 4px 8px #c7c7c7,-4px -4px 8px #ffffff",
    boxShadow: loading ? "" : "4px 4px 8px #c7c7c7,-4px -4px 8px #ffffff;",
    ":hover": {
      transition: "0.5s",
    },
  };

  return (
    <Box display="flex" mt="5rem">
      <Box sx={btnStyles} onClick={handleClick}>
        {children}
      </Box>
    </Box>
  );
};

const MyButton = ({ gameType, onClick }) => {
  const mq450 = useMediaQuery("(max-width:450px)");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (gameType.replace(/ /g, "") === "1vs1")
        onClick(gameType.replace(/ /g, ""));
      setLoading(false);
    }, 400);
  };

  const btnStyles = {
    transition: "0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    width: mq450 ? "75px" : "100px",
    borderRadius: "15px",
    padding: "1rem",
    cursor: "pointer",
    backgroundColor: "#eaeaea",
    WebkitBoxShadow: loading
      ? ""
      : "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
    boxShadow: loading
      ? ""
      : "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
    ":hover": {
      transition: "0.5s",
    },
  };

  return (
    <Box sx={btnStyles} onClick={handleClick}>
      <Typography
        noWrap
        variant={mq450 ? "h6" : "h5"}
        fontWeight={600}
        my="1rem"
        textAlign="center"
      >
        {gameType}
      </Typography>
    </Box>
  );
};

export default MainPage;
