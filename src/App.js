import React from "react";
import "./App.css";
import UserPage from "./user/UserPage";
import UserProvider from "./user/UserProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <UserPage />
      </UserProvider>
    </div>
  );
}

export default App;
