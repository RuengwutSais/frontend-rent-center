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

# Install Certbot and Nginx plugin
RUN apk add --no-cache certbot certbot-nginx

# Copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# # Set up Certbot
# RUN certbot certonly --agree-tos --non-interactive --email panupong.kong@bumail.net --webroot -w /usr/share/nginx/html -d rentcentral.online

# # Set up Nginx to use Let's Encrypt SSL certificate
# RUN sed -i 's/# server {/server {/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*listen\s*80/listen 80/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*listen\s*\[::\]:80/listen [::]:80/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*listen\s*443\s*ssl/listen 443 ssl/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*listen\s*\[::\]:443\s*ssl/listen [::]:443 ssl/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*ssl_certificate/ssl_certificate/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*ssl_certificate_key/ssl_certificate_key/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*include\s*.*ssl_dhparams.pem/ssl_protocols TLSv1.2 TLSv1.3;\n    include \/etc\/letsencrypt\/options-ssl-nginx.conf;\n    ssl_dhparam \/etc\/letsencrypt\/ssl-dhparams.pem;/' /etc/nginx/nginx.conf \
#     && sed -i 's/#\s*server_name\s*example.com/server_name rentcentral.online/' /etc/nginx/nginx.conf \
#     && echo "0 12 * * * root certbot renew --quiet --nginx --agree-tos --non-interactive" > /etc/crontabs/root
