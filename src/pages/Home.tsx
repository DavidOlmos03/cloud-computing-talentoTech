import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.8rem;
  margin-bottom: 20px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #ccc;
`;

const HeroButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(45deg, #00ff9d, #00cc7e);
  color: black;
  padding: 15px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 157, 0.3);
  }
`;

const ProductsSection = styled.section`
  padding: 80px 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 50px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(45deg, #00ff9d, #00cc7e);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.9);
  padding: 60px 0 30px;
  margin-top: 80px;
  border-top: 1px solid rgba(0, 255, 157, 0.3);
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ContactInfo = styled.div`
  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 20px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background: #00ff9d;
    }
  }
  
  p {
    color: #ccc;
    margin-bottom: 10px;
    font-size: 0.95rem;
  }
  
  a {
    color: #00ff9d;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Location = styled.div`
  h3 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 20px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 50px;
      height: 2px;
      background: #00ff9d;
    }
  }
  
  iframe {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    border: 1px solid rgba(0, 255, 157, 0.3);
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <HeroSection id="home">
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Descubre lo mejor de nuestra tienda
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Los mejores productos al mejor precio
          </HeroSubtitle>
          <HeroButton
            href="#productos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver productos
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <ProductsSection id="productos">
        <SectionTitle>Nuestros Productos</SectionTitle>
        <ProductGrid>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </ProductGrid>
      </ProductsSection>

      <Footer id="contacto">
        <FooterContainer>
          <ContactInfo>
            <h3>Contáctanos</h3>
            <p><strong>Soporte:</strong> <a href="mailto:Soporte@lapsusint.org">Soporte@lapsusint.org</a></p>
            <p><strong>Administración:</strong> <a href="mailto:Administracion@lapsusint.org">Administracion@lapsusint.org</a></p>
            <p><strong>Teléfonos:</strong> 320-6231768 / 666-770-37</p>
          </ContactInfo>
          
          <Location>
            <h3>Nuestra Ubicación</h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.123456789012!2d-75.5000000!3d6.0000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4a1234567890ab%3A0x1234567890abcdef!2sCra.%2017%2C%20La%20Ceja%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1616161616161" 
              allowFullScreen 
              loading="lazy"
              title="Ubicación"
            />
          </Location>
        </FooterContainer>
      </Footer>
    </>
  );
};

export default Home; 