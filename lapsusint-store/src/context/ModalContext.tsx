import React, { createContext, useContext, useReducer } from 'react';
import { ModalState, Product } from '../types';

interface ModalContextType {
  state: ModalState;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openCartModal: () => void;
  closeCartModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalAction =
  | { type: 'OPEN_PRODUCT_MODAL'; payload: Product }
  | { type: 'CLOSE_PRODUCT_MODAL' }
  | { type: 'OPEN_CART_MODAL' }
  | { type: 'CLOSE_CART_MODAL' };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_PRODUCT_MODAL':
      return {
        ...state,
        isProductModalOpen: true,
        selectedProduct: action.payload,
      };
    case 'CLOSE_PRODUCT_MODAL':
      return {
        ...state,
        isProductModalOpen: false,
        selectedProduct: null,
      };
    case 'OPEN_CART_MODAL':
      return {
        ...state,
        isCartModalOpen: true,
      };
    case 'CLOSE_CART_MODAL':
      return {
        ...state,
        isCartModalOpen: false,
      };
    default:
      return state;
  }
};

const initialState: ModalState = {
  isProductModalOpen: false,
  isCartModalOpen: false,
  selectedProduct: null,
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openProductModal = (product: Product) => {
    dispatch({ type: 'OPEN_PRODUCT_MODAL', payload: product });
  };

  const closeProductModal = () => {
    dispatch({ type: 'CLOSE_PRODUCT_MODAL' });
  };

  const openCartModal = () => {
    dispatch({ type: 'OPEN_CART_MODAL' });
  };

  const closeCartModal = () => {
    dispatch({ type: 'CLOSE_CART_MODAL' });
  };

  return (
    <ModalContext.Provider value={{ state, openProductModal, closeProductModal, openCartModal, closeCartModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}; 