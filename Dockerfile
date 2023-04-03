# # Build stage
# FROM node:12-alpine as build-stage
# WORKDIR /app
# COPY . .
# RUN npm install 
# RUN npm run build

# # Production stage
# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# COPY --from=build-stage /app/dist/ .
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80

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

# Install Certbot
RUN apk add certbot

# Generate Let's Encrypt certificate and key pair
RUN certbot certonly --standalone -n --agree-tos -m you@example.com -d example.com

# Configure Nginx to use Let's Encrypt certificate and key pair
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -i 's|#ssl_certificate_key|ssl_certificate_key|g' /etc/nginx/nginx.conf && \
    sed -i 's|#ssl_certificate|ssl_certificate|g' /etc/nginx/nginx.conf && \
    sed -i 's|#include /etc/nginx/letsencrypt.conf|include /etc/nginx/letsencrypt.conf|g' /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443
