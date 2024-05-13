import {Routes,Route} from 'react-router-dom'
import axios from 'axios'
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import EmailVerify from "./pages/EmailVerify.jsx";
import Login from "./pages/Login.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext.jsx";
import { ValidationFailure } from "./pages/ValidationFailure.jsx";
import Profile from "./pages/Profile.jsx";
import { CartProvider} from "./context/cart";
import { Shoppingcart } from "./pages/Shoppingcart";
import SellerDash from "./pages/SellerDash";
import Landing from "./pages/Landing";
axios.defaults.baseURL =`http://localhost:8000`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
    <UserContextProvider>
    <CartProvider>
    <Routes>
    
    <Route path='/' element={<Home/>}
      />
      <Route path='/login' element={<Login/>}
      />
      <Route path='/register' element={<Register/>}
      />
      <Route
            path="/verify/:id/:expirationTimestamp"
            element={<EmailVerify />}
          />
          <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route
        path="/ForgotPassword/:id/:token"
        element={<ForgotPassword />}
      />
      <Route
        path="/google/auth/ValidationFailure"
        element={<ValidationFailure />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/shoppingcart"
        element={<Shoppingcart />}
        />
        <Route
        path="/dash"
        element={<SellerDash />}
      />
      <Route
        path="/home"
        element={<Landing/>}
      />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
    

    {/*  example 
    <Route
            path="/verify/:id/:expirationTimestamp"
            element={<EmailVerify />}
          /> */}
          </CartProvider>
    </UserContextProvider>
    </>
  );
}
export default App;
