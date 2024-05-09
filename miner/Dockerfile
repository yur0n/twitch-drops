FROM nikolaik/python-nodejs:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN pip install -r requirements.txt

RUN npm run build

EXPOSE 5001

CMD ["node", "dist/src/index.js"]