import { fileURLToPath, URL } from 'node:url';
import {defineConfig, ProxyOptions, UserConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

function createProxy(port: string): Record<string, ProxyOptions> {
    return {
        '/api': {
            target: `http://localhost:${port}`,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
    };
}

const getProxyConfiguration = (mode: string): Record<string, ProxyOptions> | {} => {
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
            return {}; // Return an empty object for types compatibility instead of undefined
    }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }): UserConfig => {
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true,
                },
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            port: 4200,
            proxy: getProxyConfiguration(mode),
        },
    };
});
