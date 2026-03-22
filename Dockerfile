# -------- Build Stage --------
FROM node:18 AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

RUN npm install

# Copy rest of the app
COPY . .

# Build Vite app
RUN npm run build


# -------- Production Stage --------
FROM nginx:alpine

# Copy build output to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]