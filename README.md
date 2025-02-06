<h1 align="center">Backend-Server</h1>

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

