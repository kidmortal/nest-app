import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

import { SolverGrpc } from './solver.grpc';
import { SolverGateway } from './solver.gateway';
import { SolverService } from './solver.service';

@Processor('solver')
export class SolverProcessor {
  constructor(
    private solverGrpc: SolverGrpc,
    private solverWebsocket: SolverGateway,
    private solverService: SolverService,
  ) {}

  @Process('nonce')
  async nonceSolver(job: Job<number>) {
    const nonce = job.data;
    const logger = new Logger('Solver Processor');
    logger.debug(`solving nonce ${nonce} - priority: ${job.opts.priority}`);
    const currentQueueState = await this.solverService.getQueueStateSummary();
    this.solverWebsocket.broadcast('queue_update', currentQueueState);
    const response = await this.solverGrpc.solveMonce(job.data);
    logger.debug(`nonce ${nonce} solved. Result: ${response.solution}`);
    return response;
  }
}
