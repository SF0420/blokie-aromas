import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `base` debe coincidir con el nombre del repositorio en GitHub Pages.
// Si el repo se llama `<usuario>.github.io`, cámbialo a '/'.
export default defineConfig({
  base: '/blokie-aromas/',
  plugins: [react(), tailwindcss()],
})
