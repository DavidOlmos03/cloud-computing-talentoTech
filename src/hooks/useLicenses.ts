import { useState, useEffect, useCallback } from 'react';
import { License, CreateLicenseRequest } from '../types/license';
import { apiService } from '../services/api';

interface UseLicensesReturn {
  licenses: License[];
  loading: boolean;
  error: string | null;
  fetchLicenses: () => Promise<void>;
  fetchActiveLicenses: () => Promise<void>;
  createLicense: (licenseData: CreateLicenseRequest) => Promise<void>;
  updateLicense: (licenseId: string, licenseData: Partial<CreateLicenseRequest>) => Promise<void>;
  deleteLicense: (licenseId: string) => Promise<void>;
  getLicenseById: (licenseId: string) => Promise<License | null>;
}

export const useLicenses = (): UseLicensesReturn => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLicenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getLicenses();
      setLicenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching licenses');
      console.error('Error fetching licenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActiveLicenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getActiveLicenses();
      setLicenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching active licenses');
      console.error('Error fetching active licenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createLicense = useCallback(async (licenseData: CreateLicenseRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newLicense = await apiService.createLicense(licenseData);
      setLicenses(prev => [...prev, newLicense]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating license');
      console.error('Error creating license:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLicense = useCallback(async (licenseId: string, licenseData: Partial<CreateLicenseRequest>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedLicense = await apiService.updateLicense(licenseId, licenseData);
      setLicenses(prev => 
        prev.map(license => 
          license.license_id === licenseId ? updatedLicense : license
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating license');
      console.error('Error updating license:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLicense = useCallback(async (licenseId: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteLicense(licenseId);
      setLicenses(prev => prev.filter(license => license.license_id !== licenseId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting license');
      console.error('Error deleting license:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLicenseById = useCallback(async (licenseId: string): Promise<License | null> => {
    try {
      const license = await apiService.getLicenseById(licenseId);
      return license;
    } catch (err) {
      console.error('Error fetching license by ID:', err);
      return null;
    }
  }, []);

  // Load licenses on mount
  useEffect(() => {
    fetchActiveLicenses();
  }, [fetchActiveLicenses]);

  return {
    licenses,
    loading,
    error,
    fetchLicenses,
    fetchActiveLicenses,
    createLicense,
    updateLicense,
    deleteLicense,
    getLicenseById,
  };
}; 