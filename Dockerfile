FROM node:16

WORKDIR /app

COPY package*.json ./

# COPY decorate-angular-cli.js ./

COPY . .

RUN npm install -g @nestjs/cli

RUN npm run build

ENV POST=8080

EXPOSE 8080

CMD ["npm", "run", "start"]
