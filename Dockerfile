FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY prisma ./prisma

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
