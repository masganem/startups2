#!/bin/bash

set -euo pipefail

npm install @radix-ui/themes @radix-ui/react-icons tailwindcss postcss autoprefixer clsx @tanstack/react-query zustand react-router-dom react-hook-form zod browser-image-compression
npx tailwindcss init -p
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
