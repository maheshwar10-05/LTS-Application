import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import LTSLayout from './components/LTS/LTSLayout'; // Import LTS Layout
import Home from './pages/Home';

import Product from './pages/Product';
import Login from './pages/login';
import Register from './pages/Register';
import Cart from './pages/Cart';

import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// LTS Imports
import LTSLogin from './pages/LTS/LTSLogin';
import LTSRegister from './pages/LTS/LTSRegister';
import LTSDashboard from './pages/LTS/LTSDashboard';
import LTSDealCreation from './pages/LTS/LTSDealCreation';
import LTSEntityForm from './pages/LTS/LTSEntityForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Default redirect to LTS Login */}
            <Route path="/" element={<Navigate to="/lts/login" replace />} />

            {/* Automation Store Routes - Wrapped in Main Layout */}
            <Route element={<Layout><Outlet /></Layout>}> {/* Using Layout as a wrapper is cleaner with Outlet, but let's stick to wrapping individual groups if standard Outlet pattern isn't used globally yet, or just group them.*/}
            </Route>

            {/* Let's use the explicit wrapping pattern for clarity since we are mixing layouts */}

            {/* Automation Store Pages */}
            <Route path="/products" element={<Layout><Home /></Layout>} />
            <Route path="/product/:id" element={<Layout><Product /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/order-confirmation/:id" element={<Layout><OrderConfirmation /></Layout>} />

            {/* LTS Routes - Wrapped in LTS Layout */}
            <Route path="/lts/login" element={<LTSLogin />} /> {/* Login typically has no layout or a simple one. If LTSLayout has nav, maybe exclude for login? The user asked for "separate layout", usually login is standalone. Let's start with NO layout for login/register as is common, or specific auth layout. But sticking to request: separate header. Let's assume Login/Register might want the LTS header? Actually usually not. Let's check LTSLayout content. It has user check. OK. */}
            <Route path="/lts/register" element={<LTSRegister />} />

            <Route path="/lts" element={<LTSLayout><LTSDashboard /></LTSLayout>} />
            <Route path="/deal-creation" element={<LTSLayout><LTSDealCreation /></LTSLayout>} />
            <Route path="/new-entity" element={<LTSLayout><LTSEntityForm /></LTSLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
