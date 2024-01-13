import {
  Processor,
  Process,
  OnQueueCompleted,
  OnQueueActive,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

import { SolverGrpc } from './solver.grpc';
import { SolverGateway } from './solver.gateway';

@Processor('solver')
export class SolverProcessor {
  private logger = new Logger('Solver Processor');
  constructor(
    private solverGrpc: SolverGrpc,
    private solverWebsocket: SolverGateway,
  ) {}

  @Process('nonce')
  async nonceSolver(job: Job<number>) {
    const nonce = job.data;
    const response = await this.solverGrpc.solveMonce(job.data);
    this.logger.debug(`nonce ${nonce} solved. Result: ${response.solution}`);
    return response;
  }

  @OnQueueActive()
  async onActive(job: Job) {
    this.logger.debug(
      `solving nonce ${job.data} - priority: ${job.opts.priority}`,
    );
    this.solverWebsocket.broadcastQueueStatus();
  }

  @OnQueueCompleted()
  async onComplete() {
    this.solverWebsocket.broadcastQueueStatus();
  }
}
