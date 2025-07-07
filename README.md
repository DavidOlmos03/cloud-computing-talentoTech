# LapsusInt Store - React Application

A professional and scalable React web application for LapsusInt Store, featuring a modern UI with Matrix-style animations and e-commerce functionality.

## 🚀 Features

- **Modern React Architecture**: Built with TypeScript, React 18, and modern hooks
- **Professional UI/UX**: Styled with styled-components and Framer Motion animations
- **State Management**: Context API for cart and modal state management
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Matrix Background**: Animated Matrix-style background effect
- **E-commerce Features**: Product catalog, shopping cart, and checkout flow
- **Authentication Ready**: Login system with form validation
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: styled-components, CSS-in-JS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── MatrixBackground.tsx
│   ├── ProductCard.tsx
│   ├── ProductModal.tsx
│   └── CartModal.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   └── Login.tsx
├── context/            # React Context providers
│   ├── CartContext.tsx
│   └── ModalContext.tsx
├── types/              # TypeScript type definitions
│   ├── index.ts
│   └── images.d.ts
├── data/               # Static data
│   └── products.ts
├── assets/             # Images and static assets
│   ├── logo.png
│   ├── warzone.png
│   └── rainbowsix.png
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lapsusint-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🎨 Design System

### Colors
- **Primary**: #00ff9d (Matrix Green)
- **Secondary**: #00cc7e (Dark Green)
- **Accent**: #ff3366 (Red)
- **Background**: #000000 (Black)
- **Text**: #ffffff (White)
- **Text Secondary**: #cccccc (Light Gray)

### Typography
- **Font Family**: Montserrat
- **Weights**: 400, 500, 600, 700

### Components

#### Header
- Sticky navigation with logo
- Social media icons
- Shopping cart with item count
- Login button

#### Product Cards
- Hover animations with Framer Motion
- Product images with overlay effects
- Price display with Colombian formatting

#### Modals
- Product detail modal with quantity selector
- Shopping cart modal with item management
- Smooth animations and transitions

## 🔧 State Management

### Cart Context
- Manages shopping cart state
- Handles add/remove/update cart items
- Persists cart data in localStorage
- Calculates totals and item counts

### Modal Context
- Manages modal visibility states
- Handles product modal and cart modal
- Provides modal control functions

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Features

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Images and components
- **Optimized Builds**: Production-ready builds
- **Caching**: localStorage for cart persistence

## 🔒 Security Features

- **TypeScript**: Type safety throughout the application
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: React's built-in XSS protection
- **HTTPS Ready**: Production-ready for HTTPS deployment

## 🧪 Testing

The application includes:
- Unit tests for components
- Integration tests for user flows
- E2E testing setup (ready for implementation)

## 📦 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files to S3 bucket
- **Docker**: Containerized deployment ready

## 🔄 Migration from Original

This React application successfully migrates the original HTML/CSS/JavaScript implementation with:

### ✅ Migrated Features
- Matrix background animation
- Product catalog with modal details
- Shopping cart functionality
- Responsive design
- Contact information and map
- Login system

### 🆕 New Features
- TypeScript for type safety
- Modern React patterns and hooks
- Improved state management
- Better performance and scalability
- Enhanced animations and transitions
- Professional code structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- **Email**: Soporte@lapsusint.org
- **Phone**: 320-6231768 / 666-770-37

---

Built with ❤️ using React and TypeScript 