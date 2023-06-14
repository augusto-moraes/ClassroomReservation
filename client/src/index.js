import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import Root from "./routes";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#c8e6c9',
    },
  },
});

const router = createBrowserRouter([
  { path: "*", Component: Root},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

