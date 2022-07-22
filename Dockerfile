FROM node:latest AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build
 
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/build /usr/src/app 
CMD ["dumb-init", "node", "index.js"]