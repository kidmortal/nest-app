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

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
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
