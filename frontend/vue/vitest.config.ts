/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite';
import { configDefaults } from 'vitest/config'; // Make sure this import is correct
import { fileURLToPath, URL } from 'url';
import viteConfig from './vite.config'

export default defineConfig((env) => mergeConfig(
    viteConfig(env),
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/*'],
            root: fileURLToPath(new URL('./', import.meta.url))
        }
    }),
));
