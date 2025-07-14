import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLicenses } from '../hooks/useLicenses';
import { CreateLicenseRequest } from '../types/license';

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
`;

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 157, 0.3);
`;

const SectionTitle = styled.h2`
  color: #00ff9d;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00ff9d;
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #00ff9d;
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00ff9d;
  }
  
  option {
    background: #000;
    color: white;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #00ff9d;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff9d, #00cc7e);
  color: black;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LicensesList = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 157, 0.3);
  max-height: 600px;
  overflow-y: auto;
`;

const LicenseItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid rgba(0, 255, 157, 0.1);
`;

const LicenseTitle = styled.h3`
  color: #00ff9d;
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const LicenseDetails = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const LicenseActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  
  &.edit {
    background: rgba(0, 255, 157, 0.2);
    color: #00ff9d;
    border: 1px solid rgba(0, 255, 157, 0.3);
  }
  
  &.delete {
    background: rgba(255, 51, 102, 0.2);
    color: #ff3366;
    border: 1px solid rgba(255, 51, 102, 0.3);
  }
  
  &:hover {
    opacity: 0.8;
  }
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  color: ${props => props.type === 'success' ? '#00ff9d' : '#ff3366'};
  background: ${props => props.type === 'success' ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 51, 102, 0.1)'};
`;

const AdminPanel: React.FC = () => {
  const { licenses, loading, error, createLicense, deleteLicense } = useLicenses();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState<CreateLicenseRequest>({
    product_name: '',
    description: '',
    price: 0,
    supported_platforms: '',
    supported_launchers: '',
    recommendations: '',
    product_version: '',
    has_spoofer: false,
    language: '',
    stock_quantity: 0,
    is_active: true,
    image_url: '',
    category: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLicense(formData);
      setMessage({ type: 'success', text: 'Licencia creada exitosamente!' });
      setFormData({
        product_name: '',
        description: '',
        price: 0,
        supported_platforms: '',
        supported_launchers: '',
        recommendations: '',
        product_version: '',
        has_spoofer: false,
        language: '',
        stock_quantity: 0,
        is_active: true,
        image_url: '',
        category: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al crear la licencia' });
    }
  };

  const handleDelete = async (licenseId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta licencia?')) {
      try {
        await deleteLicense(licenseId);
        setMessage({ type: 'success', text: 'Licencia eliminada exitosamente!' });
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al eliminar la licencia' });
      }
    }
  };

  return (
    <AdminContainer>
      <Title>Panel de Administración</Title>
      
      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}
      
      <AdminGrid>
        <FormSection>
          <SectionTitle>Crear Nueva Licencia</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nombre del Producto *</Label>
              <Input
                name="product_name"
                value={formData.product_name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Descripción</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Precio *</Label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Plataformas Soportadas</Label>
              <Input
                name="supported_platforms"
                value={formData.supported_platforms}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Launchers Soportados</Label>
              <Input
                name="supported_launchers"
                value={formData.supported_launchers}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Recomendaciones</Label>
              <Input
                name="recommendations"
                value={formData.recommendations}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Versión del Producto</Label>
              <Input
                name="product_version"
                value={formData.product_version}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Idioma</Label>
              <Select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar idioma</option>
                <option value="Spanish">Español</option>
                <option value="English">Inglés</option>
                <option value="Portuguese">Portugués</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Categoría</Label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar categoría</option>
                <option value="Gaming">Gaming</option>
                <option value="Software">Software</option>
                <option value="Tools">Herramientas</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>URL de la Imagen</Label>
              <Input
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Cantidad en Stock</Label>
              <Input
                name="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <CheckboxContainer>
              <Checkbox
                name="has_spoofer"
                type="checkbox"
                checked={formData.has_spoofer}
                onChange={handleInputChange}
              />
              <Label>Incluye Spoofer</Label>
            </CheckboxContainer>
            
            <CheckboxContainer>
              <Checkbox
                name="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={handleInputChange}
              />
              <Label>Activo</Label>
            </CheckboxContainer>
            
            <SubmitButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creando...' : 'Crear Licencia'}
            </SubmitButton>
          </Form>
        </FormSection>
        
        <LicensesList>
          <SectionTitle>Licencias Existentes</SectionTitle>
          {loading ? (
            <div style={{ color: '#00ff9d', textAlign: 'center' }}>
              <i className="fas fa-spinner fa-spin"></i> Cargando...
            </div>
          ) : error ? (
            <div style={{ color: '#ff3366', textAlign: 'center' }}>
              Error: {error}
            </div>
          ) : licenses.length === 0 ? (
            <div style={{ color: '#ccc', textAlign: 'center' }}>
              No hay licencias disponibles
            </div>
          ) : (
            licenses.map(license => (
              <LicenseItem key={license.license_id}>
                <LicenseTitle>{license.product_name}</LicenseTitle>
                <LicenseDetails>
                  <div>Precio: ${license.price?.toLocaleString('es-CO')}</div>
                  <div>Stock: {license.stock_quantity}</div>
                  <div>Categoría: {license.category}</div>
                  <div>Estado: {license.is_active ? 'Activo' : 'Inactivo'}</div>
                </LicenseDetails>
                <LicenseActions>
                  <ActionButton className="edit">
                    Editar
                  </ActionButton>
                  <ActionButton 
                    className="delete"
                    onClick={() => license.license_id && handleDelete(license.license_id)}
                  >
                    Eliminar
                  </ActionButton>
                </LicenseActions>
              </LicenseItem>
            ))
          )}
        </LicensesList>
      </AdminGrid>
    </AdminContainer>
  );
};

export default AdminPanel; 