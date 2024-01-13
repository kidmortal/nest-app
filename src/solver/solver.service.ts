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

  getCurrentQueue() {
    return this.SolverQueue.getJobs(['waiting']);
  }
}
