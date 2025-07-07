import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useModal } from '../context/ModalContext';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid rgba(0, 255, 157, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 157, 0.3);
    box-shadow: 0 10px 30px rgba(0, 255, 157, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ProductTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Price = styled.p`
  color: #00ff9d;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal } = useModal();

  const handleClick = () => {
    openProductModal(product);
  };

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <ProductImage src={product.image} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <Price>${product.price.toLocaleString('es-CO')}</Price>
    </Card>
  );
};

export default ProductCard; 