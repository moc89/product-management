// filepath: /Users/busracelebi/repos/product-management/src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly REACT_APP_API_URL: string;
    // Add other environment variables here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}