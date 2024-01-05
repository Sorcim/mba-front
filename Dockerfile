ARG NODE_IMAGE=node:alpine
ARG NGINX_IMAGE=nginx:alpine

FROM $NODE_IMAGE AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN npm run build

FROM $NGINX_IMAGE AS production
COPY --chown=node:node --from=build /home/node/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]