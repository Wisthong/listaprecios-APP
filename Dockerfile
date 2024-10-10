FROM node:20.12.2 as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install


FROM node:20.12.2  as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM node:20.12.2 as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/autenticacion/browser" ]

# FROM node:latest as node
# WORKDIR /app
# COPY ./ /app/
# RUN npm install
# RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=runner /app/dist/autenticacion/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
