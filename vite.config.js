import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import flipGalleryPlugin from './vite-plugin-flip-gallery.js'
import galleryPlugin from './vite-plugin-gallery.js'
import heroGalleryPlugin from './vite-plugin-hero-gallery.js'
import sliderGalleryPlugin from './vite-plugin-slider-gallery.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    galleryPlugin(),
    flipGalleryPlugin(),
    sliderGalleryPlugin(),
    heroGalleryPlugin(),
  ],
})
