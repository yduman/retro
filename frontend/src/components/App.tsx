import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import HomePage from "./home/HomePage";
import BoardPage from "./board/BoardPage";
import ErrorPage from "./ErrorPage";
import BoardContextProvider from "../context/BoardContext";
import UserContextProvider from "../context/UserContext";
import DialogContextProvider from "../context/DialogContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424956",
      light: "#6d7483",
      dark: "#1b222d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#8452bb",
      light: "#b680ee",
      dark: "#53268a",
      contrastText: "#ffffff",
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            exact
            path="/boards/:boardId"
            render={() => (
              <UserContextProvider>
                <BoardContextProvider>
                  <DialogContextProvider>
                    <BoardPage />
                  </DialogContextProvider>
                </BoardContextProvider>
              </UserContextProvider>
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
