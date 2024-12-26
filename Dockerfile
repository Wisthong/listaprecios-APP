# Etapa 1: Instalación de dependencias
FROM node:20.18.0 as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Etapa 2: Construcción de la aplicación
FROM node:20.18.0 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --prod

# Etapa 3: Servir con Nginx
FROM nginx:alpine
WORKDIR /app

# Copia los archivos estáticos de la construcción de Angular/Ionic
COPY --from=builder /app/www /usr/share/nginx/html

# Si tienes un archivo de configuración de Nginx personalizado, lo puedes copiar así:
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para acceder a la aplicación
EXPOSE 4444

# Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
