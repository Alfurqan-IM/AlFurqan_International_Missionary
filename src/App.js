import React from "react";
import AppRouter from "./routes/AppRouter";
import "./index.css";
import "react-multi-carousel/lib/styles.css";

const App = () => {
  return (
    <div className="app_container">
      <AppRouter />
    </div>
  );
};

export default App;
