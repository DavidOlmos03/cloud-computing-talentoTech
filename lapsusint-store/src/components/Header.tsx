import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import logoImage from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const HeaderContainer = styled.header`
  background: rgba(0, 0, 0, 0.9);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0, 255, 157, 0.3);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 25px;
  }
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 5px 0;
    position: relative;
    transition: color 0.3s;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #00ff9d;
      transition: width 0.3s;
    }
    
    &:hover {
      color: #00ff9d;
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-right: 10px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  &.fa-instagram:hover {
    color: #E1306C;
    background: rgba(225, 48, 108, 0.1);
  }
  
  &.fa-twitter:hover {
    color: #1DA1F2;
    background: rgba(29, 161, 242, 0.1);
  }
  
  &.fa-facebook-f:hover {
    color: #1877F2;
    background: rgba(24, 119, 242, 0.1);
  }
`;

const CartIcon = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 255, 157, 0.2);
    transform: translateY(-3px);
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff3366;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 255, 157, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 255, 157, 0.3);
  }
`;

const Header: React.FC = () => {
  const { state: cartState } = useCart();
  const { openCartModal } = useModal();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo to="/">
          <LogoImage src={logoImage} alt="Logo" />
        </Logo>
        
        <Nav>
          <ul>
            <li><a href="/#home">Inicio</a></li>
            <li><a href="/#productos">Productos</a></li>
            <li><a href="/#contacto">Contacto</a></li>
          </ul>
        </Nav>
        
        <HeaderIcons>
          <SocialIcons>
            <SocialIcon href="#" className="fa-instagram">
                <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
            <SocialIcon href="#" className="fa-twitter">
                <FontAwesomeIcon icon={faTwitter} />
            </SocialIcon>
            <SocialIcon href="#" className="fa-facebook-f">
                <FontAwesomeIcon icon={faFacebookF} />
            </SocialIcon>
          </SocialIcons>
          
          <CartIcon onClick={openCartModal}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartState.itemCount > 0 && (
              <CartCount>{cartState.itemCount}</CartCount>
            )}
          </CartIcon>
          
          <LoginButton to="/login">
            <i className="fas fa-user"></i>
            <span>Iniciar sesión</span>
          </LoginButton>
        </HeaderIcons>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header; 
