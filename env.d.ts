/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_ENABLE_ANALYTICS: string
  // Bổ sung các biến môi trường khác tại đây...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
