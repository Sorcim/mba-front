ARG NODE_IMAGE=node:alpine
ARG NGINX_IMAGE=nginx:alpine

FROM $NODE_IMAGE AS base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install
COPY . ./

FROM dependencies AS build

RUN npm run build

FROM $NGINX_IMAGE AS production
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]