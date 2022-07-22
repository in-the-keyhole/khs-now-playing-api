FROM node:14 as build
WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build
RUN yarn --prod

FROM node:14-alpine

RUN apk add dumb-init

ENV NODE_ENV production

ENV TMDB_API_KEY replaceme
ENV APOLLO_INTROSPECTION true

USER node

WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/build .
CMD ["dumb-init", "node", "index.js"]