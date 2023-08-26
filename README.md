# posts

A Node TypeScript server which allows users to create and retrieve posts and comments.

---

## Built With

- Node
- Typescript
- Git
- Docker
- Express
- Mocha, chai and supertest
- Postman
- Jsonwebtoken
- PostgreSQL

## Requirements

You will need Node.js (version 16 and above) and a node global package installed in your environment.

### Node

- #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

    ##### Installation Commands

        $ sudo apt install nodejs
        $ sudo apt install npm

- #### Other Operating Systems

    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
    If the installation was successful, you should be able to run the following command.

    ##### Verify versions

        $ node -v
        v16.16.0
        $ npm -v
        v8.11.0

---
## Clone this project

    $ git clone https://github.com/lawrecks/posts.git
    $ cd posts
    
## Configure app

- Create a file named `.env` in the project root directory
- Add the environment variables as described in the `.env.example` file

## Install dependencies
    $ npm install

## Run with Docker

### Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

Run the app with following command

    $ docker-compose up -d
    
By default, the app should run on port `4001`
        
To stop the app, run
    
    $ docker-compose down
    
## Run with NPM

### Running this project locally
    $ npm run dev

### Running tests

    $ npm test

## Documentation

Postman: https://documenter.getpostman.com/view/10148336/2s9Y5YR2cr

## Database Schema

https://dbdiagram.io/d/64e9611902bd1c4a5e6f3a53

## Hosted API URL

https://posts-api-v1-da3740718cd5.herokuapp.com/api/v1

## Show your support

Give a ⭐️ if you like this project!

## Copyright

Copyright (c) 2023 Ugochukwu Ejiogu