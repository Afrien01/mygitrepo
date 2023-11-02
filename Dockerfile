FROM node:16.17.0-alpine
WORKDIR webguireactapp
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
ENV HTTPS=true
CMD ["npm", "start"]
