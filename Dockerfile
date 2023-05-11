# Build stage
FROM node:12-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build

COPY ./keyaccess/fullchain.pem /etc/letsencrypt/live/rentcentral.online/fullchain.pem
COPY ./keyaccess/privkey.pem /etc/letsencrypt/live/rentcentral.online/privkey.pem;

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist/ .


# Copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443
