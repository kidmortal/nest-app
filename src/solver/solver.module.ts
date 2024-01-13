import { Module } from '@nestjs/common';
import { SolverService } from './solver.service';
import { SolverController } from './solver.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bull';
import { SolverProcessor } from './solver.processor';
import { SolverGrpc } from './solver.grpc';
import { SolverGateway } from './solver.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOLVER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'grpc:50051',
          package: 'solver',
          protoPath: './grpc/solver.proto',
        },
      },
    ]),
    BullModule.registerQueue({
      name: 'solver',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [SolverController],
  providers: [SolverService, SolverProcessor, SolverGrpc, SolverGateway],
})
export class SolverModule {}
