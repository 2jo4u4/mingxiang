FROM node:14.18.1-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
