import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';

interface ISolverService {
  SolveNonce({}): Observable<any>;
}

export class SolverGrpc implements OnModuleInit {
  private solver: ISolverService;
  constructor(@Inject('SOLVER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.solver = this.client.getService<ISolverService>('SolverService');
  }

  async solveMonce(nonce: number) {
    const response = await lastValueFrom(this.solver.SolveNonce(nonce));
    return response;
  }
}
