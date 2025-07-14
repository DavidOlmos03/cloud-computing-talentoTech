import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import Header from './components/Header';
import MatrixBackground from './components/MatrixBackground';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPanel from './components/AdminPanel';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    background-color: #000;
    color: #fff;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <ModalProvider>
          <GlobalStyle />
          <AppContainer>
            <MatrixBackground />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <ProductModal />
            <CartModal />
          </AppContainer>
        </ModalProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
