
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), ],
  server: {

    proxy: {

      '/api': {

        target: 'https://todo-application-k3q8.onrender.com',

        changeOrigin: true,

        secure: false,

        headers: {

          'Access-Control-Allow-Origin': '*',

          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',

          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',

        },

      },

    },

  },
});