import React from 'react';
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
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(0, 255, 157, 0.3);
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

const Title = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  text-align: center;
`;

const CartItems = styled.div`
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 255, 157, 0.1);
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  color: white;
  margin: 0 0 5px 0;
  font-size: 1rem;
`;

const ItemPrice = styled.p`
  color: #00ff9d;
  margin: 0;
  font-weight: bold;
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(0, 255, 157, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  color: white;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: rgba(255, 51, 102, 0.2);
  border: 1px solid rgba(255, 51, 102, 0.3);
  color: #ff3366;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 51, 102, 0.3);
  }
`;

const EmptyCart = styled.p`
  color: #ccc;
  text-align: center;
  font-style: italic;
  margin: 20px 0;
`;

const CartSummary = styled.div`
  border-top: 1px solid rgba(0, 255, 157, 0.3);
  padding-top: 20px;
  margin-top: 20px;
`;

const Total = styled.p`
  color: white;
  font-size: 1.3rem;
  text-align: center;
  margin: 0 0 20px 0;
  
  span {
    color: #00ff9d;
    font-weight: bold;
  }
`;

const CartActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  
  &.buy {
    background: linear-gradient(45deg, #00ff9d, #00cc7e);
    color: black;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
    }
  }
  
  &.clear {
    background: rgba(255, 51, 102, 0.2);
    color: #ff3366;
    border: 1px solid rgba(255, 51, 102, 0.3);
    
    &:hover {
      background: rgba(255, 51, 102, 0.3);
    }
  }
`;

const CartModal: React.FC = () => {
  const { state: modalState, closeCartModal } = useModal();
  const { state: cartState, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleClose = () => {
    closeCartModal();
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Funcionalidad de checkout en desarrollo');
  };

  return (
    <AnimatePresence>
      {modalState.isCartModalOpen && (
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
            
            <Title>🛒 Tu Carrito</Title>
            
            <CartItems>
              {cartState.items.length === 0 ? (
                <EmptyCart>Tu carrito está vacío.</EmptyCart>
              ) : (
                cartState.items.map((item) => (
                  <CartItem key={item.id}>
                    <ItemImage src={item.product.image} alt={item.product.name} />
                    <ItemDetails>
                      <ItemTitle>{item.product.name}</ItemTitle>
                      <ItemPrice>${item.product.price.toLocaleString('es-CO')}</ItemPrice>
                    </ItemDetails>
                    <ItemQuantity>
                      <QuantityButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </QuantityButton>
                      <QuantityText>{item.quantity}</QuantityText>
                      <QuantityButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                      >
                        +
                      </QuantityButton>
                    </ItemQuantity>
                    <RemoveButton onClick={() => handleRemoveItem(item.product.id)}>
                      Eliminar
                    </RemoveButton>
                  </CartItem>
                ))
              )}
            </CartItems>
            
            {cartState.items.length > 0 && (
              <CartSummary>
                <Total>
                  Total: <span>${cartState.total.toLocaleString('es-CO')}</span>
                </Total>
                <CartActions>
                  <ActionButton className="buy" onClick={handleCheckout}>
                    Comprar
                  </ActionButton>
                  <ActionButton className="clear" onClick={handleClearCart}>
                    Vaciar Carrito
                  </ActionButton>
                </CartActions>
              </CartSummary>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CartModal; 