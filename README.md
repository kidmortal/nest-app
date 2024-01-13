## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm dev

# production mode
$ pnpm start
```

## gRPC server

This project is currently using a go grpc server

Generating grpc files

```
protoc \
--go_out=grpc/solver \
--go_opt=paths=source_relative \
--go-grpc_out=grpc/solver \
--go-grpc_opt=paths=source_relative grpc/solver.proto

```

## Queue system with Bulljs - Redis

This apllication requires redis running on port 6379 (default)
Used to manage queue

## Api documentation - Swagger

located at /api

Auto generated documentation for all routes inside the application.
