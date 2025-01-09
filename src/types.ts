export type cdnToken = {
    token: string;
    name: string;
    extention: string;
    size: number;
    totalChunks: number;
    id: string;
    createdAt: Date;
    uses: Date[];
    finished: boolean;
  };
  
  export type cdnFileType = {
    uploadToken: cdnToken;
    id: string;
    registerdAt: Date | null;
    uploadedAt: number | undefined;
    createdAt: number;
    name: string | null;
    extension: string | null;
    updatedAt: number;
    size: number | null;
  };
  