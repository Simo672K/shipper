import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/auth/Login";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
