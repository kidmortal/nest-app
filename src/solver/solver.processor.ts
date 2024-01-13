import { Processor, Process } from '@nestjs/bull';
import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Job } from 'bull';
import { Observable, lastValueFrom } from 'rxjs';

interface ISolverService {
  SolveNonce({}): Observable<any>;
}

@Processor('solver')
export class SolverProcessor implements OnModuleInit {
  private solver: ISolverService;
  constructor(@Inject('SOLVER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.solver = this.client.getService<ISolverService>('SolverService');
  }

  @Process('nonce')
  async nonceSolver(job: Job<number>) {
    const nonce = job.data;
    const logger = new Logger('Solver Processor');
    logger.debug(`solving nonce ${nonce}`);
    const response = await lastValueFrom(this.solver.SolveNonce(job.data));
    logger.debug(`nonce ${nonce} solved. Result: ${response.solution}`);
    return response;
  }
}
