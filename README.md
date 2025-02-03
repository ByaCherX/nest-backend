<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
</br>

# NestJS Server-side Application

This repository serves as a robust and highly scalable template for building modern web applications using the NestJS framework. Designed with flexibility, performance, and security in mind, this template integrates a variety of features and tools to accelerate your development process.

> ### About Nestjs:
> NestJS is a progressive Node.js framework that enables developers to build efficient, reliable, and scalable server-side applications. Built on TypeScript and inspired by Angular's modular structure, NestJS leverages object-oriented programming (OOP), functional programming (FP), and functional reactive programming (FRP) principles to provide a versatile and highly maintainable development environment.

## Key Features ✨

### 1. HTTP Server Flexibility
- Supports HTTP/1.1, HTTP/2.0, and multiple server frameworks:
  * Express
  * Fastify
  * HyperExpress

### 2. Database Management
- Integrated with TypeORM for seamless database interactions.
- Fully compatible with MariaDB and other relational databases.

### 3. Secure Data Transmission
- Implements AES-256-CBC encryption to ensure secure data communication.

### 4. Task Scheduling
- Includes a powerful CRON job scheduler for periodic task execution.

### 5. WebSocket Support
- Provides real-time communication with support for:
  * ws
  * socket.io

### 6. Modular and Scalable Architecture
- Dynamically creates and manages modules to support application scalability.

- Enables clustering for multi-threaded server instances.

### 7. gRPC Integration

- Fully supports gRPC for cross-platform, language-agnostic service communication.

### 8. Logging and Monitoring

- Robust logging system with support for:
  * Console output
  * File-based logging
  * HTTP endpoint logging

### 9. Authentication and Authorization

- Pre-integrated authentication module using JWT for secure endpoint access.

- Role-based access control (RBAC) for granular security.

### 10. Dynamic API Control

- Includes an API module to enable dynamic control and management of the application.


## Installation 📦

### Prerequisites
- Node.js v16 or higher
- npm or yarn package manager
- MariaDB instance (or compatible database)

### Steps

1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure environment variables:

- Copy the .env.example file to .env:
```bash
cp .env.example .env
```
- Update the .env file with your database credentials and other configuration settings.

4. Run the database migrations:
```bash
npm run migration:run
```

5. Start the application:

- Development mode:
```bash
npm run start:dev
```

- Production mode:
```bash
npm run build
npm run start:prod
```

## Usage 🚀

### Single-threaded Mode (recommended)
```bash
npm run start
```

### Debug or Dev Mode
To start in debug mode or dev mode
```bash
npm run start:debug # debug 

npm run start:dev   # dev
```

### Running in Cluster Mode (experimental 🔬)
To enable multi-threaded server instances:
```bash
npm run start:cluster
```

### Accessing the API

The API documentation is automatically generated and available at:
```bash
http://localhost:3000/api
```

### Using WebSockets

Real-time WebSocket services are accessible via the /ws endpoint.

## Contributing 📍

We welcome contributions from the community! To get started:

1. Fork this repository.

2. Create a new branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes and push the branch:
```bash
git commit -m "Add your commit message here"
git push origin feature/your-feature-name
```

4. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

