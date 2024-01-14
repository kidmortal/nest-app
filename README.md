## Summary

Example of gRPC application between node and golang.

This handle high CPU tasks by assiging it to a more performantic language (golang) to do the job.

It queue pending jobs using Bull js and store the queue on Redis.

Current list of complete jobs, pending and being processed can be accessed by websocket connection.

Use this route to add a number to be processed.

and then you can watch the progress on the websocket client.

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

Run this command **while inside grpc folder**

```
protoc \
--go_out=solver/ \
--go_opt=paths=source_relative \
--go-grpc_out=solver/ \
--go-grpc_opt=paths=source_relative solver.proto
```

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

## Running with docker

```bash
# create image and containers
docker-compose create
# start server and services
docker-compose start
```

urls:

```bash
# server and api documentation
http://localhost:8000/api
# websocket client to see jobs being processed
http://localhost:3000
```
