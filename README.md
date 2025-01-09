# Clodynix

A lightning-fast CDN solution powered by modern technology to deliver your content seamlessly.

![npm version](https://img.shields.io/npm/v/clodynix)
![npm downloads](https://img.shields.io/npm/dm/clodynix)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📦 Installation

```bash
npm install clodynix
# or
yarn add clodynix
# or
pnpm add clodynix
```

## 🔧 Usage

```javascript
import { Clodynix } from 'clodynix';

const clodynix = new Clodynix({
  apiKey: process.env.ClodynixSecret || '',
});

// Get a file
const file = await clodynix.getFile({ fileId: 'your-file-id' });

// Upload a file
const formData = new FormData();
formData.append('file', someFile);
const createdFile = await clodynix.createFile({ formData });
```

## 🔑 Authentication

Set your Clodynix secret token as an environment variable:
```bash
export ClodynixSecret=your-secret-token
```

## 📚 API Reference

### `getFile(options)`
Retrieves a file by ID
- `options.fileId`: string - The ID of the file to retrieve

### `createFile(options)`
Uploads a new file
- `options.formData`: FormData - Form data containing the file to upload

## 📝 License

MIT © Clodynix Team