import React, { useState } from 'react';
import styled from 'styled-components';
import { License, CreateLicenseRequest } from '../types/license';

interface LicenseFormModalProps {
  mode: 'create' | 'edit';
  initialData: any; // Puede ser Product o License adaptado
  onClose: () => void;
  onSubmit: (data: CreateLicenseRequest) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  background: #181c1f;
  border-radius: 16px;
  padding: 32px 24px;
  min-width: 35vw;
  max-width: 95vw;
  min-height: 70vh;
  max-height: 95vh;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  color: #fff;
`;
const Title = styled.h2`
  margin-bottom: 18px;
  color: #00ff9d;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 60vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #00ff9d #222;
  &::-webkit-scrollbar {
    width: 8px;
    background: #222;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00ff9d;
    border-radius: 8px;
  }
`;
const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #00ff9d;
  background: #222;
  color: #fff;
`;
const Label = styled.label`
  font-size: 1rem;
  color: #ccc;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  width: 100%;
  justify-content: flex-start;
`;
const Button = styled.button`
  background: #00ff9d;
  color: #222;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #00cc7e; }
`;
const CancelButton = styled(Button)`
  background: #ff3366;
  color: #fff;
  &:hover { background: #d32f2f; }
`;

const defaultForm: CreateLicenseRequest = {
  product_name: '',
  description: '',
  price: 0,
  supported_platforms: '',
  supported_launchers: '',
  recommendations: '',
  product_version: '',
  has_spoofer: false,
  language: '',
  stock_quantity: 1,
  is_active: true,
  image_url: '',
  category: ''
};

const LicenseFormModal: React.FC<LicenseFormModalProps> = ({ mode, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState<CreateLicenseRequest>(
    initialData ? {
      ...defaultForm,
      ...initialData,
      product_name: initialData.name || initialData.product_name || '',
      description: initialData.description || '',
      price: initialData.price || 0,
      image_url: initialData.image || initialData.image_url || '',
      product_version: initialData.product_version || '',
      has_spoofer: initialData.has_spoofer ?? false,
      stock_quantity: initialData.stock_quantity || 1,
      is_active: initialData.is_active ?? true,
      category: initialData.category || '',
    } : defaultForm
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: any = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    setForm(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Overlay>
      <Modal>
        <Title>{mode === 'edit' ? 'Editar Licencia' : 'Crear Licencia'}</Title>
        <Form onSubmit={handleSubmit}>
          <Label>Nombre *</Label>
          <Input name="product_name" value={form.product_name} onChange={handleChange} required />
          <Label>Descripción</Label>
          <Input name="description" value={form.description} onChange={handleChange} />
          <Label>Precio *</Label>
          <Input name="price" type="number" value={form.price} onChange={handleChange} required min={0} />
          <Label>Imagen (URL)</Label>
          <Input name="image_url" value={form.image_url} onChange={handleChange} />
          <Label>Versión</Label>
          <Input name="product_version" value={form.product_version} onChange={handleChange} />
          <Label>Stock *</Label>
          <Input name="stock_quantity" type="number" value={form.stock_quantity} onChange={handleChange} required min={0} />
          <Label>Activo</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input name="is_active" type="checkbox" checked={form.is_active} onChange={handleChange} style={{ width: 18, height: 18 }} />
            <span style={{ color: '#ccc', fontSize: '1rem' }}>Activo</span>
          </div>
          <ButtonRow>
            <Button type="submit">{mode === 'edit' ? 'Guardar' : 'Crear'}</Button>
            <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
          </ButtonRow>
        </Form>
      </Modal>
    </Overlay>
  );
};

export default LicenseFormModal; 
