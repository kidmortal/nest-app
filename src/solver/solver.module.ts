import { Module } from '@nestjs/common';
import { SolverService } from './solver.service';
import { SolverController } from './solver.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SOLVER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'solver',
          protoPath: './grpc/solver.proto',
        },
      },
    ]),
  ],
  controllers: [SolverController],
  providers: [SolverService],
})
export class SolverModule {}
