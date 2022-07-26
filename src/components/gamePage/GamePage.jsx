import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Card,
  Modal,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

const GamePage = ({ endGame, gameSelected }) => {
  const mq450 = useMediaQuery("(max-width:450px)");
  const [thinking, setThinking] = useState(false);

  const [playerO, setPlayerO] = useState({
    name: "Player O",
    value: "O",
    game: [],
    user: "user",
  });
  const [playerX, setPlayerX] = useState({
    name: "Player X",
    value: "X",
    game: [],
    user: gameSelected === "1vsPC" ? "pc" : "user",
  });
  const [openModal, setOpenModal] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(playerO);
  const [items, setItems] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    endGame();
  };

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

    for (var i = 0; i < winningConditions.length; i++) {
      if (
        winningConditions[i].join() === auxArray.slice(0, 3).join() ||
        winningConditions[i].join() === auxArray.join() ||
        winningConditions[i].join() === auxArray.slice(1, 4).join()
      ) {
        return true;
      }
    }
    return false;
  };

  const pcTurn = () => {
    setThinking(true);
    let flag = true;
    let gridItem = {};
    const itemsSelected = [...playerO.game, ...playerX.game];
    let counter = 0;

    while (flag) {
      if (counter <= 8) {
        counter++;
      } else {
        flag = false;
        break;
      }
      let randomNum = Math.floor(Math.random() * (9 - 1) + 1) - 1;
      if (!itemsSelected.includes(randomNum.toString())) {
        console.log("randomNum", randomNum);
        gridItem = document.getElementById(randomNum);
        flag = false;
      }
    }
    setTimeout(() => {
      if (Object.entries(gridItem).length !== 0) {
        setThinking(false);
        return gridItem.click();
      }
      setThinking(false);
      handleOpenModal();
    }, 1000);
  };

  const handleClick = (position) => {
    try {
      if (playerTurn.value === "O") {
        playerO.game.push(position);
        setPlayerO({ ...playerO });
        if (checkWinning(playerO)) return handleOpenModal();
        if (gameSelected === "1vsPC") pcTurn();
        setPlayerTurn(playerX);
      } else {
        playerX.game.push(position);
        setPlayerX({ ...playerX });
        if (checkWinning(playerX)) return handleOpenModal();
        setPlayerTurn(playerO);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container
        sx={{
          paddingY: "1rem",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h2" fontWeight={800} pt="1rem" textAlign="center">
          Lets Go!
        </Typography>
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <Typography
            variant="h5"
            fontWeight={600}
            my="1rem"
          >{`Player: ${playerTurn.value}`}</Typography>
          {thinking ? <CircularProgress /> : <Box></Box>}
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 0fr)"
          gap={mq450 ? 1 : 2}
          justifyContent="center"
          sx={{ PointerEvents: thinking ? "none" : "" }}
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
        <Box
          onClick={endGame}
          sx={{
            mt: "3rem",
            p: "3rem",
            width: "fit-content",
            borderRadius: "15px",
            padding: "1rem",
            cursor: "pointer",
            backgroundColor: "#eaeaea",
            fontWeight: "600",
            WebkitBoxShadow: "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
            boxShadow: "12px 12px 24px #c7c7c7, -12px -12px 24px #ffffff",
          }}
        >
          Go Back
        </Box>
      </Container>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          sx={{
            transition: "0.4s",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            p: "3rem",
            ":hover": {
              transition: "0.4s",
              opacity: "0.5",
            },
          }}
        >
          <Typography
            textAlign="center"
            fontWeight={600}
            variant="h3"
          >{`${playerTurn.name} win!`}</Typography>
        </Paper>
      </Modal>
    </>
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
      <Card elevation={0} sx={cardStyles} onClick={handleClick} id={item}>
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
