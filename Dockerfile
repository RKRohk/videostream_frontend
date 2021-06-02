FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM node:alpine as served
WORKDIR /app
RUN yarn global add serve
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json .
CMD [ "serve","-s","build" ]