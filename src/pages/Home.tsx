import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useLicenses } from '../hooks/useLicenses';
import { licenseToProduct } from '../utils/licenseAdapter';
import { Product } from '../types';
import LicenseFormModal from '../components/LicenseFormModal';

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

const LoadingMessage = styled.div`
  text-align: center;
  color: #00ff9d;
  font-size: 1.2rem;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff3366;
  font-size: 1.2rem;
  padding: 40px;
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

const FloatingButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: linear-gradient(45deg, #00ff9d, #00cc7e);
  color: #222;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(0,255,157,0.3);
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(45deg, #00cc7e, #00ff9d);
  }
`;

const Home: React.FC = () => {
  const [editingProduct, setEditingProduct] = useState<Product|null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create'|'edit'>('create');
  const { licenses, loading, error, deleteLicense, updateLicense, createLicense, fetchLicenses } = useLicenses();
  
  // Convert licenses to products for display
  const products = licenses.map(licenseToProduct);

  // Handlers:
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormMode('edit');
    setShowFormModal(true);
  };
  const handleDelete = async (product: Product) => {
    if(window.confirm('¿Seguro que deseas eliminar esta licencia?')){
      await deleteLicense(product.id);
      fetchLicenses();
    }
  };
  const handleCreate = () => {
    setEditingProduct(null);
    setFormMode('create');
    setShowFormModal(true);
  };
  const handleFormSubmit = async (data: any) => {
    if(formMode==='edit' && editingProduct){
      await updateLicense(editingProduct.id, data);
    } else {
      await createLicense(data);
    }
    setShowFormModal(false);
    fetchLicenses();
  };

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
        
        {loading && (
          <LoadingMessage>
            <i className="fas fa-spinner fa-spin"></i> Cargando productos...
          </LoadingMessage>
        )}
        
        {error && (
          <ErrorMessage>
            <i className="fas fa-exclamation-triangle"></i> Error: {error}
          </ErrorMessage>
        )}
        
        {!loading && !error && products.length === 0 && (
          <LoadingMessage>
            No hay productos disponibles en este momento.
          </LoadingMessage>
        )}
        
        {!loading && !error && products.length > 0 && (
          <ProductGrid>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} onEdit={handleEdit} onDelete={handleDelete} showCrudButtons />
              </motion.div>
            ))}
          </ProductGrid>
        )}
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

      <FloatingButton onClick={handleCreate}>+</FloatingButton>

      {showFormModal && (
        <LicenseFormModal
          mode={formMode}
          initialData={editingProduct}
          onClose={()=>setShowFormModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default Home; 
