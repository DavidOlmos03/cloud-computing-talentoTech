import { License, CreateLicenseRequest, ApiResponse } from '../types/license';
import { config } from '../config/environment';

const API_BASE_URL = config.API_BASE_URL;
const LICENSES_ENDPOINT = config.API_LICENSES_ENDPOINT;

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all licenses
  async getLicenses(): Promise<License[]> {
    return this.request<License[]>(LICENSES_ENDPOINT);
  }

  // Get license by ID
  async getLicenseById(licenseId: string): Promise<License> {
    return this.request<License>(`${LICENSES_ENDPOINT}/${licenseId}`);
  }

  // Create new license
  async createLicense(licenseData: CreateLicenseRequest): Promise<License> {
    return this.request<License>(LICENSES_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(licenseData),
    });
  }

  // Update license
  async updateLicense(licenseId: string, licenseData: Partial<CreateLicenseRequest>): Promise<License> {
    return this.request<License>(`${LICENSES_ENDPOINT}/${licenseId}`, {
      method: 'PUT',
      body: JSON.stringify(licenseData),
    });
  }

  // Delete license
  async deleteLicense(licenseId: string): Promise<void> {
    return this.request<void>(`${LICENSES_ENDPOINT}/${licenseId}`, {
      method: 'DELETE',
    });
  }

  // Get active licenses only
  async getActiveLicenses(): Promise<License[]> {
    return this.request<License[]>(`${LICENSES_ENDPOINT}?is_active=true`);
  }

  // Get licenses by category
  async getLicensesByCategory(category: string): Promise<License[]> {
    return this.request<License[]>(`${LICENSES_ENDPOINT}?category=${encodeURIComponent(category)}`);
  }
}

export const apiService = new ApiService(); 