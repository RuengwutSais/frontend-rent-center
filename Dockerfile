# Build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build

# Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist/ .

# Install OpenSSL
RUN apk add openssl

# Generate self-signed SSL certificate and key pair
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.pem -subj "/CN=localhost"

# Copy nginx config and certificate files
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-selfsigned.conf /etc/nginx/conf.d/default.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

