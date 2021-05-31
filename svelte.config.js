import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: vercel(),
    vite: {
      optimizeDeps: {
        include: ['clipboard-copy']
      }
    }
  }
};

export default config;