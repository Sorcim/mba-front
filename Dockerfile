ARG NODE_IMAGE=node:alpine
ARG NGINX_IMAGE=nginx:alpine

FROM $NODE_IMAGE AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM $NGINX_IMAGE AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]