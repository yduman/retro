# Retro - Make Retrospectives Great Again

![CircleCI (all branches)](https://img.shields.io/circleci/project/github/yduman/retro.svg?style=flat-square) ![GitHub release](https://img.shields.io/github/release/yduman/retro.svg?style=flat-square) ![GitHub](https://img.shields.io/github/license/yduman/retro.svg?style=flat-square) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

![demo](./assets/retro.png)

## Table of Contents

- [What is Retro?](#what-is-retro)
- [Usage Locally](#usage-locally)
- [Branching](#branching)
- [Deployment Examples](#deployment-examples)
  - [PM2](#pm2)
  - [Docker](#docker)
- [Contributing](#contributing)
- [Project State](#project-state)

## What is Retro?

Retro is a tool that you can use for your retrospectives. The goal of Retro is to aid teams in remote retrospectives.

At work, we were using third party retrospective tools, which meant we couldn't express ourselves freely because of privacy reasons. Retro provides an open-source solution, where you can host the app on your own servers, so you can discuss freely again, since you own the data!

## Usage Locally

Install dependencies

```console
$ cd backend && yarn && cd ..
$ cd frontend && yarn && cd ..
```

Run servers

```console
$ cd backend && yarn start:dev && cd ..
$ cd frontend && yarn start && cd ..
```

## Branching

- The `master` branch is always the latest development stage
- Stable releases are tagged with their respective version number

## Deployment Examples

### PM2

- Install [PM2](https://pm2.keymetrics.io/) on your server
- Clone this project on your server
- Install the dependencies by running `yarn` on `backend` and `frontend`
- Check if the proxy settings are correct
  - Check `backend/src/config/config.js`
  - Check `frontend/src/setupProxy.js`
  - Check `frontend/src/utils/index.js`
- Provide an `.env.production.local` file inside of `frontend`
    ```
    # Example
    REACT_APP_PROD_URL=http://mydomain.com
    REACT_APP_PROD_PORT=80
    ```
- Build the frontend by running `yarn deploy`
- Go to the `backend` folder and run `pm2 start processes.json`

### Docker

- There is a `Dockerfile` on the project root which builds everything and runs the server
- You might want to define your own restart policy then
- The server runs without process managers. You can read [here](https://www.docker.com/blog/keep-nodejs-rockin-in-docker/) why.

## Contributing

- This project uses [Yarn](https://yarnpkg.com/lang/en/), [Prettier](https://prettier.io) and the latest LTS version of [Node.js](https://nodejs.org/en/)
- Test your stuff manually or better, provide tests
- If you developed a whole user scenario, then please provide E2E tests
- You can also develop with the provided Docker containers!
  - on Linux, make sure to set an environment variable, since `host.docker.internal` is not working: 
    - `export DOCKER_HOST_IP=$(docker network inspect bridge --format='{{(index .IPAM.Config 0).Gateway}}')`

## Project State

- You can always watch the current state of the project at [Trello](https://trello.com/b/AhEZ0aLs/retro)
