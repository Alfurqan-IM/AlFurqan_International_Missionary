import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./contexts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ToastContainer /> */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
