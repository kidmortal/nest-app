## Summary

Example of gRPC application between node and golang.

This handle high CPU tasks by assiging it to a more performantic language (golang) to do the job.

It queue pending jobs using Bull js and store the queue on Redis.

Current list of complete jobs, pending and being processed can be accessed by websocket connection.

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

### Inside grpc folder

just run

```
go run main.go
```

To start go gRPC server

## Queue system with Bulljs - Redis

This apllication requires redis running on port 6379 (default)
Used to manage queue

## Api documentation - Swagger

located at /api

Auto generated documentation for all routes inside the application.
