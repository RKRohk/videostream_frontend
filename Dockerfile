FROM node:alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
ARG REACT_APP_BACKEND=http://139.59.27.253:5000
ENV REACT_APP_BACKEND=${REACT_APP_BACKEND}
RUN yarn build

FROM node:alpine as served
WORKDIR /app
RUN yarn global add serve
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json .
CMD [ "serve","-s","build" ]