FROM node:14.18


WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#WORKDIR ./dist
RUN npm install

COPY . .

# for typescript
RUN npm run Tsc
#COPY .env ./dist/

EXPOSE 3001
CMD ["npm","start"]