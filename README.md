# Project A - React + Vite with Docker

A React application built with Vite, containerized with Docker for both development and production environments. This project is designed to work behind an nginx reverse proxy at the base path `/projecta`.

## 🚀 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server
- **React Router** - Client-side routing

## 📁 Project Structure

```
projetoa/
├── src/               # Source code
├── public/            # Static assets
├── Dockerfile         # Production Docker image
├── Dockerfile.dev     # Development Docker image
├── docker-compose.yml # Production compose file
├── docker-compose.dev.yml # Development compose file
├── nginx.conf         # Nginx configuration for production
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies
```

## 🛠️ Development

### Local Development (without Docker)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Access at: `http://localhost:5173/projecta/`

### Development with Docker

```bash
# Build and start development container
docker-compose -f docker-compose.dev.yml up --build

# Stop container
docker-compose -f docker-compose.dev.yml down
```

Access at: `http://localhost:5173/projecta/`

**Features:**
- Hot module replacement (HMR)
- Volume mounting for live code changes
- No need to rebuild on code changes

## 🚢 Production

### Build and Run Production Container

```bash
# Build and start production container
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop container
docker-compose down
```

Access at: `http://localhost:3000/projecta/`

### Production Build Only

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Base Path Configuration

The application is configured to work at the `/projecta` base path:

- **vite.config.ts**: `base: '/projecta/'`
- **main-router.tsx** (with router): `<BrowserRouter basename="/projecta">`
- All assets and routes will be served from `/projecta/`

### Environment Variables

Create `.env` files as needed:

```bash
# .env.development
VITE_API_URL=http://localhost:3001/api

# .env.production
VITE_API_URL=https://api.example.com
```

### Nginx Reverse Proxy Configuration

To integrate with your main nginx reverse proxy, add this to your main nginx config:

```nginx
# In your main nginx.conf
location /projecta/ {
    proxy_pass http://projetoa:80/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 🐳 Docker Details

### Development Container
- Based on `node:20-alpine`
- Exposes port 5173
- Mounts source code as volume
- Runs Vite dev server with HMR

### Production Container
- Multi-stage build
- Stage 1: Build app with Node
- Stage 2: Serve with nginx:alpine
- Exposes port 80
- Optimized for size and performance

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Ports

| Environment | Port | URL |
|------------|------|-----|
| Development (local) | 5173 | http://localhost:5173/projecta/ |
| Development (Docker) | 5173 | http://localhost:5173/projecta/ |
| Production (Docker) | 3000 | http://localhost:3000/projecta/ |

## 🔍 Troubleshooting

### Docker issues

```bash
# Rebuild containers from scratch
docker-compose down -v
docker-compose up --build

# View logs
docker-compose logs -f

# Clean up Docker resources
docker system prune -a
```

### Port conflicts

If ports 5173 or 3000 are already in use, modify the port mappings in the docker-compose files:

```yaml
ports:
  - "5174:5173"  # Change host port
```

## React + Vite Notes

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
