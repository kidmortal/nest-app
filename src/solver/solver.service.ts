import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { Queue } from 'bull';

@Injectable()
export class SolverService {
  constructor(@InjectQueue('solver') private SolverQueue: Queue) {}

  addNonce(nonce: number) {
    this.SolverQueue.add('nonce', nonce);
    return {
      nonce,
      message: 'Added to queue',
    };
  }

  getCurrentQueuePending() {
    return this.SolverQueue.getJobs(['waiting'], 0, 50);
  }
  getCurrentQueueComplete() {
    return this.SolverQueue.getJobs(['completed'], 0, 50);
  }
  getCurrentQueueFailed() {
    return this.SolverQueue.getJobs(['failed'], 0, 50);
  }
}
