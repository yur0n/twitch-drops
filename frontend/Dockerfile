FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

ARG API_URL
ENV VITE_JSON_SERVER_URL=${API_URL}

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "serve"]