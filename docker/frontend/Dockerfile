FROM node:12 as builder
WORKDIR /usr/src/app/
COPY frontend/package.json /usr/src/app/
COPY frontend/package-lock.json /usr/src/app/
RUN apt-get update -qq && apt-get install -y build-essential curl
RUN npm install
RUN mkdir -p node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.14.1/linux-x64-51_binding.node -o node_modules/node-sass/vendor/linux-x64-51/binding.node
RUN npm rebuild node-sass --force
ADD . /usr/src/app/
CMD ["npm","start"]