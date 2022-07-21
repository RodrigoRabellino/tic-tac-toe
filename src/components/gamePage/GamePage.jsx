import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Card,
  Fade,
} from "@mui/material";
import { useState } from "react";

const GamePage = () => {
  const mq450 = useMediaQuery("(max-width:450px)");
  const [playerO, setPlayerO] = useState({
    name: "Player O",
    value: "O",
    game: [],
  });
  const [playerX, setPlayerX] = useState({
    name: "Player X",
    value: "X",
    game: [],
  });
  const items = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  const [playerTurn, setPlayerTurn] = useState(playerO);

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

  const checkWinning = (item) => {
    const auxArray = item.game;
    auxArray.sort();
    console.log(auxArray);
    for (var i = 0; i < winningConditions.length; i++) {
      if (winningConditions[i].join() === auxArray.join()) {
        console.log(auxArray);
        console.log(winningConditions[i]);
        console.log("----->", true);
      }
    }
  };

  const handleClick = (position) => {
    try {
      if (playerTurn.value === "O") {
        let aux = [...playerO.game, position];
        setPlayerO({ ...playerO, game: aux });
        checkWinning(playerO);
        setPlayerTurn(playerX);
      } else {
        let aux = [...playerX.game, position];
        setPlayerX({ ...playerX, game: aux });
        checkWinning(playerX);
        setPlayerTurn(playerO);
      }
    } catch (error) {
      console.error(error);
    }
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
      >{`Player: ${playerTurn.value}`}</Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 0fr)"
        gap={mq450 ? 1 : 2}
        justifyContent="center"
      >
        {items.map((item, i) => (
          <IconCard
            player={playerTurn}
            key={item}
            item={item}
            onClick={handleClick}
          />
        ))}
      </Box>
    </Container>
  );
};

const IconCard = ({ player, onClick, item }) => {
  const mq450 = useMediaQuery("(max-width:450px)");
  const [playerSelect, setPlayerSelect] = useState({});
  const [enabled, setEnabled] = useState(true);
  const cardStyles = {
    transition: "0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: mq450 ? "75px" : "100px",
    width: mq450 ? "75px" : "100px",
    borderRadius: "15px",
    padding: "1rem",
    cursor: "pointer",
    backgroundColor: enabled ? "transparent" : "#eaeaea",
    WebkitBoxShadow: enabled
      ? ""
      : "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
    boxShadow: enabled
      ? ""
      : "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
    ":hover": {
      backgroundColor: !enabled ? "" : "#fff",
    },
  };

  const handleClick = () => {
    if (enabled) {
      setPlayerSelect(player);
      onClick(item);
      setEnabled(false);
    }
  };

  return (
    <Box gridColumn="span 1">
      <Card elevation={0} sx={cardStyles} onClick={handleClick}>
        {Object.entries(playerSelect).length === 0 ? (
          <Typography
            fontWeight={800}
            variant="h1"
            sx={{ opacity: "0.1" }}
            component="span"
          >
            {player.value}
          </Typography>
        ) : (
          <Typography fontWeight={800} variant="h1" component="span">
            {playerSelect.value}
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default GamePage;
