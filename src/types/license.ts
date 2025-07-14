export interface License {
  license_id?: string;
  product_name: string;
  description?: string;
  price: number;
  supported_platforms?: string;
  supported_launchers?: string;
  recommendations?: string;
  product_version?: string;
  has_spoofer: boolean;
  language?: string;
  create_at?: string;
  update_at?: string;
  stock_quantity: number;
  is_active: boolean;
  image_url?: string;
  category?: string;
}

export interface CreateLicenseRequest {
  product_name: string;
  description?: string;
  price: number;
  supported_platforms?: string;
  supported_launchers?: string;
  recommendations?: string;
  product_version?: string;
  has_spoofer: boolean;
  language?: string;
  stock_quantity: number;
  is_active: boolean;
  image_url?: string;
  category?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
} 