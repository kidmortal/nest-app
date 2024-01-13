import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';

import { Job } from 'bull';

import { SolverGrpc } from './solver.grpc';

@Processor('solver')
export class SolverProcessor {
  constructor(private solverGrpc: SolverGrpc) {}

  @Process('nonce')
  async nonceSolver(job: Job<number>) {
    const nonce = job.data;
    const logger = new Logger('Solver Processor');
    logger.debug(`solving nonce ${nonce}`);
    const response = await this.solverGrpc.solveMonce(job.data);
    logger.debug(`nonce ${nonce} solved. Result: ${response.solution}`);
    return response;
  }
}
