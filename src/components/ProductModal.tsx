import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useCart } from '../context/CartContext';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: rgba(0, 0, 0, 0.95);
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(0, 255, 157, 0.3);
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #00ff9d;
  }
`;

const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h2`
  color: white;
  font-size: 2rem;
  margin: 0;
`;

const Price = styled.p`
  color: #00ff9d;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.div`
  color: #ccc;
  line-height: 1.6;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 8px;
    font-size: 0.95rem;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
`;

const QuantityButton = styled.button`
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 255, 157, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  text-align: center;
  width: 80px;
  height: 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    border-color: #00ff9d;
  }
`;

const AddToCartButton = styled.button`
  background: linear-gradient(45deg, #00ff9d, #00cc7e);
  color: black;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
  }
`;

const ProductModal: React.FC = () => {
  const { state: modalState, closeProductModal } = useModal();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    closeProductModal();
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (modalState.selectedProduct) {
      addToCart(modalState.selectedProduct, quantity);
      handleClose();
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!modalState.selectedProduct) return null;

  return (
    <AnimatePresence>
      {modalState.isProductModalOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            
            <ProductImage src={modalState.selectedProduct.image} alt={modalState.selectedProduct.name} />
            
            <ProductInfo>
              <ProductTitle>{modalState.selectedProduct.name}</ProductTitle>
              <Price>${modalState.selectedProduct.price.toLocaleString('es-CO')}</Price>
              
              <Description>
                <p>{modalState.selectedProduct.description}</p>
                <ul>
                  {modalState.selectedProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Description>
              
              <QuantitySelector>
                <QuantityButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                  -
                </QuantityButton>
                <QuantityInput
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <QuantityButton onClick={increaseQuantity}>
                  +
                </QuantityButton>
              </QuantitySelector>
              
              <AddToCartButton onClick={handleAddToCart}>
                Añadir al carrito
              </AddToCartButton>
            </ProductInfo>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ProductModal; 