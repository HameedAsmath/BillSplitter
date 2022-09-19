import HomePage from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./userContext";

function App() {
  return (
    <UserContext.Provider value="hello world this is gautam">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
