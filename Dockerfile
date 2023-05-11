# Build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY . .
COPY keyaccess/fullchain.pem /etc/nginx/fullchain.pem
COPY keyaccess/privkey.pem /etc/nginx/privkey.pem

RUN npm install 
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist/ .


# Copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443
