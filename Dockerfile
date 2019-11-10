FROM node:10-slim

EXPOSE 5000

# WORKDIR /src

COPY package.json package-lock*.json ./
RUN npm install && npm cache clean --force


COPY . .

CMD ["node", "./src/index.js"]
