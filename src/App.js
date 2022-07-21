import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import GamePage from "./components/gamePage/GamePage";

function App() {
  const myTheme = createTheme({
    palette: {
      background: {
        default: "#e8f1ed",
        paper: "#f8f9fa",
      },
      primary: {
        main: "#3c4043",
      },
      secondary: {
        main: "#e9d5d3",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "5px 10px 5px 10px",
            transition: "0.4s",
            ":hover": {
              transition: "0.4s",
              borderRadius: "28px",
              backgroundColor: "#3c4043",
              color: "#e8f1ed",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          elevation: 0,
          root: {
            borderRadius: "15px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "15px",
            transition: "0.4s",
          },
        },
      },
    },
    typography: {
      fontFamily: "Nunito",
      allVariants: {
        color: "#3c4043",
        accentColor: "#dfebbf",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <div className="App">
        <GamePage />
      </div>
    </ThemeProvider>
  );
}

export default App;
