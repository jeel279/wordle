FROM node:16-alpine
WORKDIR /
COPY . .
RUN npm install
CMD ["node", "main.js"]