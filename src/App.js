import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthSupplementsPage from "./pages/HealthSupplementsPage/HealthSupplementsPage";
import HealthSupplementDetailPage from "./pages/HealthSupplementDetailPage/HealthSupplementDetailPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import AuthProvider from "./context/auth-context";

function App() {
  return (
    <div className="App">
            <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HealthSupplementsPage />} />
          <Route path="/healthsupplements" element={<HealthSupplementsPage />} />
          <Route path="/healthsupplements/:id" element={<HealthSupplementDetailPage />} />
          <Route path="/shoppingcart" element={<ShoppingCartPage />} />
          

          <Route path="/mylist" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
