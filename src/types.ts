// src/types.ts

export interface ClodynixOptions {
    apiKey: string;
  }
  
  export interface GetFileOptions {
    fileId: string;
  }
  
  export interface CreateFileOptions {
    formData: FormData;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
  }
  