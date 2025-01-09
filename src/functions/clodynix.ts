// src/clodynix.ts

import axios from 'axios';
import { ClodynixOptions, GetFileOptions, CreateFileOptions, ApiResponse } from '../types';

class Clodynix {
  private apiKey: string;
  private apiBaseUrl: string;

  constructor(options: ClodynixOptions) {
    if (!options.apiKey) {
      throw new Error('Token is required to initialize Clodynix.');
    }
    this.apiKey = options.apiKey;
    this.apiBaseUrl = 'https://api.clodynix.com'; // Replace with your actual API URL
  }

  private async request<T>(endpoint: string, method: 'GET' | 'POST', data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await axios({
        url: `${this.apiBaseUrl}${endpoint}`,
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        data,
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'API request failed');
    }
  }

  public async getFile(options: GetFileOptions): Promise<ApiResponse<any>> {
    if (!options.fileId) {
      throw new Error('fileId is required.');
    }

    return this.request(`/files/${options.fileId}`, 'GET');
  }

  public async createFile(options: CreateFileOptions): Promise<ApiResponse<any>> {
    if (!options.formData) {
      throw new Error('formData is required.');
    }

    return this.request('/files', 'POST', options.formData);
  }
}

export default Clodynix;
