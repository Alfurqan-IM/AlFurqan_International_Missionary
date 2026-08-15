import React from "react";
import AppRouter from "./routes/AppRouter";
import { DonationContextProvider } from "./contexts";
import "./index.css";
import "react-multi-carousel/lib/styles.css";

const App = () => {
  return (
    <div className="app_container">
      <DonationContextProvider>
        <AppRouter />
      </DonationContextProvider>
    </div>
  );
};

export default App;
