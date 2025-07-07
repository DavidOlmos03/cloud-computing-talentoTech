import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginForm = styled(motion.form)`
  background: rgba(0, 0, 0, 0.9);
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(0, 255, 157, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(45deg, #00ff9d, #00cc7e);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
  
  label {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(0, 255, 157, 0.3);
    border-radius: 10px;
    padding: 15px;
    transition: all 0.3s;
    
    &:focus-within {
      border-color: #00ff9d;
      box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
    }
    
    i {
      color: #00ff9d;
      margin-right: 10px;
      font-size: 1.1rem;
    }
    
    input {
      background: none;
      border: none;
      color: white;
      flex: 1;
      font-size: 1rem;
      outline: none;
      
      &::placeholder {
        color: #ccc;
      }
    }
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(45deg, #00ff9d, #00cc7e);
  color: black;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
  }
`;

const FormLinks = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  a {
    color: #00ff9d;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s;
    
    &:hover {
      color: #00cc7e;
    }
  }
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login functionality
    console.log('Login attempt:', formData);
  };

  return (
    <LoginContainer>
      <LoginForm
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
      >
        <Title>Iniciar Sesión</Title>
        
        <FormGroup>
          <label>
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </FormGroup>
        
        <FormGroup>
          <label>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </FormGroup>
        
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Iniciar Sesión
        </SubmitButton>
        
        <FormLinks>
          <Link to="/password">¿Olvidaste tu contraseña?</Link>
          <Link to="/signup">¿No tienes cuenta? Crea una</Link>
        </FormLinks>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; 