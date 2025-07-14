import { License } from '../types/license';
import { Product } from '../types/index';

export const licenseToProduct = (license: License): Product => {
  const features: string[] = [];
  
  // Add supported platforms
  if (license.supported_platforms) {
    features.push(`🔑 ${license.supported_platforms}`);
  }
  
  // Add supported launchers
  if (license.supported_launchers) {
    features.push(`💾 ${license.supported_launchers}`);
  }
  
  // Add spoofer information
  if (license.has_spoofer) {
    features.push('🔗 Built-In Spoofer');
  }
  
  // Add recommendations
  if (license.recommendations) {
    features.push(`🏆 ${license.recommendations}`);
  }
  
  // Add version information
  if (license.product_version) {
    features.push(`📦 Version: ${license.product_version}`);
  }
  
  // Add language information
  if (license.language) {
    features.push(`🌐 Language: ${license.language}`);
  }

  return {
    id: license.license_id || `license-${Date.now()}`,
    name: license.product_name,
    price: license.price,
    image: license.image_url || '/default-product-image.png', // Fallback image
    description: license.description || `License for ${license.product_name}`,
    features: features.length > 0 ? features : [
      '🔑 Windows 10 & 11 (All Version) Supported',
      '💾 Steam, Battle.Net Supported',
      '🏆 Alternate Accounts Preffered'
    ]
  };
};

export const productToLicense = (product: Product): Partial<License> => {
  return {
    product_name: product.name,
    description: product.description,
    price: product.price,
    image_url: product.image,
    supported_platforms: 'Windows 10 & 11 (All Version) Supported',
    supported_launchers: 'Steam, Battle.Net Supported',
    recommendations: 'Alternate Accounts Preffered',
    has_spoofer: true,
    is_active: true,
    stock_quantity: 10, // Default stock
    category: 'Gaming'
  };
}; 