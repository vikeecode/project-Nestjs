import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { registerUser as RegisterUser } from "./pages/Auth";
import { login as Login } from "./pages/Auth/login/index";
import {forget as Forget} from "../src/pages/Auth/forgetPassword/index";

function App() {
  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/login" element={<Login />} />
               <Route path="/forgetpassword" element={<Forget />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
