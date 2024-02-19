import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

function createProxy(port: string) {
    return {
        '/api': {
            target: `http://localhost:${port}`,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
    }
}

function getProxyConfiguration(mode: string) {
    switch (mode) {
        case 'mock':
            return createProxy('1080');
        case 'kotlin':
            return createProxy('8080');
        case 'java':
            return createProxy('8081');
        case 'c#':
            return createProxy('8080');
        default:
            return undefined;
    }
}

// https://vitejs.dev/config/
export default defineConfig(({mode}: { mode: string }) => {
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true
                }
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 4200,
            proxy: getProxyConfiguration(mode),
        },
    }
})
