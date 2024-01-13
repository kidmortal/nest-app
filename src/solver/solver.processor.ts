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
import { SolverService } from './solver.service';

@Processor('solver')
export class SolverProcessor {
  private logger = new Logger('Solver Processor');
  constructor(
    private solverGrpc: SolverGrpc,
    private solverWebsocket: SolverGateway,
    private solverService: SolverService,
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
    const currentQueueState = await this.solverService.getQueueStateSummary();
    this.solverWebsocket.broadcast('queue_update', currentQueueState);
  }

  @OnQueueCompleted()
  async onComplete() {
    const currentQueueState = await this.solverService.getQueueStateSummary();
    this.solverWebsocket.broadcast('queue_update', currentQueueState);
  }
}
