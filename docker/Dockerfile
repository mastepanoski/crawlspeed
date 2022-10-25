# 1. Install dependencies only when needed
FROM node:lts-alpine AS agsrvdeps
LABEL agsrvdeps=1
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN npm config set unsafe-perm true && apk add --no-cache libc6-compat && npm i --location=global pm2 --no-progress

WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile && rm -rf /var/cache/apk/*

# 2. Rebuild the source code only when needed
FROM node:lts-alpine AS agsrvbuilder
LABEL agsrvbuilder=1
WORKDIR /usr/src/app
COPY --from=agsrvdeps /usr/src/app/node_modules /usr/src/app/node_modules
COPY . /usr/src/app
# This will do the trick, use the corresponding env file for each environment.
COPY .env.production /usr/src/app/.env

ENV NODE_ENV=production
RUN yarn build

# 3. Production image, copy all the files and run next
FROM node:lts-alpine AS agsrvrunner
LABEL agsrvrunner=1
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=agsrvdeps /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=agsrvbuilder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=agsrvbuilder /usr/src/app/scripts /usr/src/app/scripts
COPY --from=agsrvbuilder /usr/src/app/build /usr/src/app/build
COPY --from=agsrvbuilder /usr/src/app/.env /usr/src/app/.env

RUN mkdir /usr/src/app/logs && mkdir /usr/src/app/public

VOLUME [ "/usr/src/app/logs" ]
VOLUME [ "/usr/src/app/public" ]

EXPOSE 3001

ENTRYPOINT ["sh", "scripts/docker-entrypoint.sh"]
CMD ["node", "build/server.js"]
