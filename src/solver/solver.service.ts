import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ISolverService {
  SolveNonce({}): Observable<any>;
}

@Injectable()
export class SolverService implements OnModuleInit {
  private solver: ISolverService;
  constructor(@Inject('SOLVER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.solver = this.client.getService<ISolverService>('SolverService');
  }

  SolveNonce(nonce: number) {
    return this.solver.SolveNonce(nonce);
  }
}
