import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração padrão e estável do Vite
export default defineConfig({
  plugins: [react()],
})