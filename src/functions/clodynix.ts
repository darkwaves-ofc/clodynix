import axios from "axios";
import { cdnToken, cdnFileType } from "../types";

class Clodynix {
  private apiKey: string;
  private origin: string;

  constructor({ apiKey, origin }: { apiKey: string; origin: string }) {
    this.apiKey = apiKey;
    this.origin = origin;
  }

  private getAuthToken() {
    return this.apiKey;
  }

  private getOriginLink() {
    return this.origin;
  }

  async checkFileInfo(fileId?: string, token?: string): Promise<cdnFileType | null> {
    try {
      const res = await axios.get(`${this.getOriginLink()}/v1/file/info`, {
        headers: { Authorization: this.getAuthToken() },
        data: { fileId, token },
      });
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async registerFile(token: string): Promise<cdnFileType | null> {
    try {
      const res = await axios.post(
        `${this.getOriginLink()}/v1/file/register`,
        { token },
        { headers: { Authorization: this.getAuthToken() } }
      );
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async uploadByLink(link: string): Promise<cdnFileType | null> {
    try {
      const res = await axios.put(
        `${this.getOriginLink()}/v1/file/upload/link`,
        { link },
        { headers: { Authorization: this.getAuthToken() } }
      );
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createUploadToken(
    totalChunks: number,
    fileData: { name: string; size: number; extension: string }
  ): Promise<cdnToken> {
    try {
      const res = await axios.post(
        `${this.getOriginLink()}/v1/file/upload/token/create`,
        { totalChunks, fileData },
        { headers: { Authorization: this.getAuthToken() } }
      );
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteFile(fileId: string): Promise<string> {
    try {
      const res = await axios.delete(`${this.getOriginLink()}/v1/file/delete`, {
        headers: { Authorization: this.getAuthToken() },
        data: { fileId },
      });
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async generateLink(fileId: string): Promise<string> {
    try {
      const res = await axios.post(
        `${this.getOriginLink()}/v1/link/single/create`,
        { fileId },
        { headers: { Authorization: this.getAuthToken() } }
      );
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async generateLinksBatch(fileIds: string[]): Promise<{ id: string; link: string }[]> {
    try {
      const res = await axios.post(
        `${this.getOriginLink()}/v1/link/batch/create`,
        { fileIds },
        { headers: { Authorization: this.getAuthToken() } }
      );
      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async uploadDirect(formdata: FormData): Promise<cdnFileType | null> {
    try {
      const file = formdata.get("file") as File;
      const fileBuffer = await file.arrayBuffer();
      const blob = new Blob([fileBuffer]);
      
      const form = new FormData();
      const fileData = {
        name: file.name.split(".").shift() || "",
        extention: file.name.split(".").pop() || "",
        size: file.size,
      };

      form.append("fileData", JSON.stringify(fileData));
      form.append("file", blob);

      const res = await axios.put(
        `${this.getOriginLink()}/v1/file/upload/direct`,
        form,
        { headers: { Authorization: this.getAuthToken() } }
      );

      if (res.status !== 200) throw new Error(res.data);
      return res.data.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default Clodynix;