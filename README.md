# LapsusInt Store

Una tienda en línea moderna y profesional construida con React, TypeScript y conectada a un backend FastAPI con DynamoDB.

## 🚀 Características

- **Frontend Moderno**: React con TypeScript y styled-components
- **Backend Conectado**: FastAPI con DynamoDB para gestión de licencias
- **Panel de Administración**: Gestión completa de productos/licencias
- **Carrito de Compras**: Funcionalidad completa de carrito
- **Diseño Responsivo**: Interfaz moderna y adaptable
- **Animaciones**: Framer Motion para transiciones suaves

## 🛠️ Tecnologías

### Frontend
- React 18
- TypeScript
- Styled Components
- Framer Motion
- React Router DOM

### Backend
- FastAPI
- DynamoDB
- Python

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/DavidOlmos03/cloud-computing-talentoTech.git
   cd LapsusINt-Store
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8000
   REACT_APP_API_LICENSES_ENDPOINT=/licenses
   ```

4. **Iniciar el desarrollo**
   ```bash
   npm start
   ```

## 🔧 Configuración del Backend

### Variables de Entorno Requeridas

El frontend espera que el backend esté corriendo en `http://localhost:8000` con el siguiente endpoint:

- **URL Base**: `http://localhost:8000`
- **Endpoint de Licencias**: `/licenses`

### Estructura del Modelo License

El backend debe implementar el siguiente modelo:

```python
class License(BaseModel):
    license_id: Optional[str] = None
    product_name: str
    description: Optional[str] = None
    price: float
    supported_platforms: Optional[str] = None
    supported_launchers: Optional[str] = None
    recommendations: Optional[str] = None
    product_version: Optional[str] = None
    has_spoofer: bool = False
    language: Optional[str] = None
    create_at: Optional[str] = None
    update_at: Optional[str] = None
    stock_quantity: int = 0
    is_active: bool = True
    image_url: Optional[str] = None
    category: Optional[str] = None
```

### Endpoints Requeridos

- `GET /licenses/` - Obtener todas las licencias
- `GET /licenses/{license_id}` - Obtener licencia por ID
- `POST /licenses/` - Crear nueva licencia
- `PUT /licenses/{license_id}` - Actualizar licencia
- `DELETE /licenses/{license_id}` - Eliminar licencia

## 🎯 Funcionalidades

### Para Usuarios
- **Catálogo de Productos**: Visualización de licencias disponibles
- **Carrito de Compras**: Agregar/eliminar productos
- **Modal de Producto**: Detalles completos del producto
- **Navegación Responsiva**: Header con navegación y carrito

### Para Administradores
- **Panel de Administración**: `/admin`
- **Gestión de Licencias**: Crear, editar, eliminar licencias
- **Formulario Completo**: Todos los campos del modelo License
- **Lista de Licencias**: Vista de todas las licencias existentes

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AdminPanel.tsx  # Panel de administración
│   ├── CartModal.tsx   # Modal del carrito
│   ├── Header.tsx      # Header principal
│   ├── MatrixBackground.tsx # Fondo animado
│   ├── ProductCard.tsx # Tarjeta de producto
│   └── ProductModal.tsx # Modal de producto
├── config/
│   └── environment.ts  # Configuración de variables de entorno
├── context/            # Contextos de React
│   ├── CartContext.tsx # Estado del carrito
│   └── ModalContext.tsx # Estado de modales
├── hooks/              # Hooks personalizados
│   └── useLicenses.ts  # Hook para gestión de licencias
├── pages/              # Páginas principales
│   ├── Home.tsx        # Página principal
│   └── Login.tsx       # Página de login
├── services/           # Servicios de API
│   └── api.ts          # Servicio de comunicación con backend
├── types/              # Tipos TypeScript
│   ├── index.ts        # Tipos generales
│   └── license.ts      # Tipos específicos de licencias
└── utils/              # Utilidades
    └── licenseAdapter.ts # Adaptador entre modelos
```

## 🔌 Conexión con Backend

El frontend está completamente integrado con el backend FastAPI:

1. **API Service**: Manejo centralizado de todas las peticiones HTTP
2. **Custom Hook**: `useLicenses` para gestión de estado y API calls
3. **Adaptador**: Conversión entre modelos backend y frontend
4. **Variables de Entorno**: Configuración flexible para diferentes entornos

### Ejemplo de Uso

```typescript
import { useLicenses } from './hooks/useLicenses';

const { licenses, loading, error, createLicense } = useLicenses();
```

## 🚀 Scripts Disponibles

- `npm start` - Iniciar servidor de desarrollo
- `npm build` - Construir para producción
- `npm test` - Ejecutar tests
- `npm eject` - Eyectar configuración (irreversible)

## 📝 Notas Importantes

1. **Backend Requerido**: El frontend necesita que el backend esté corriendo en `http://localhost:8000`
2. **Variables de Entorno**: Configura las variables en el archivo `.env`
3. **CORS**: Asegúrate de que el backend permita peticiones desde `http://localhost:3000`
4. **DynamoDB**: El backend debe estar configurado con DynamoDB

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Soporte**: Soporte@lapsusint.org
- **Administración**: Administracion@lapsusint.org
- **Teléfonos**: 320-6231768 / 666-770-37

---

Desarrollado con ❤️ por el equipo de LapsusInt
