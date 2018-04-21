# FROM node:carbon-alpine
# RUN npm install -g yarn && \
#     chmod 774 /usr/local/bin/yarnpkg /usr/local/bin/yarn
# WORKDIR /nestjs/cli
# COPY . .
# RUN npm install --production && npm link
# WORKDIR /workspace
# EXPOSE 3000
# VOLUME [ "/workspace" ]
# CMD [ "/bin/sh" ]
FROM node:carbon-alpine as builder
WORKDIR /nestjs/cli
COPY . .
RUN npm install && npm run -s build

FROM node:carbon-alpine
RUN npm install -g yarn && \
    chmod 774 /usr/local/bin/yarnpkg /usr/local/bin/yarn
WORKDIR /nestjs/cli
RUN mkdir action bin commands lib
COPY --from=builder /nestjs/cli/. .
RUN npm install --production && npm link
WORKDIR /workspace
EXPOSE 3000
VOLUME [ "/workspace" ]
CMD [ "/bin/sh" ]