import { Controller, Get, Param } from '@nestjs/common';
import { SolverService } from './solver.service';
import { SolverGateway } from './solver.gateway';

@Controller('solver')
export class SolverController {
  constructor(
    private readonly solverService: SolverService,
    private solverWebsocket: SolverGateway,
  ) {}

  @Get('nonce/:nonce')
  addNonceToQueue(@Param('nonce') nonce: string) {
    const result = this.solverService.addNonce(+nonce);
    this.solverWebsocket.broadcastQueueStatus();
    return result;
  }
  @Get('nonce/priority/:nonce')
  addNonceToPriorityQueue(@Param('nonce') nonce: string) {
    const result = this.solverService.addHighPriorityNonce(+nonce);
    this.solverWebsocket.broadcastQueueStatus();
    return result;
  }

  @Get('queue/pending')
  getQueuePending() {
    return this.solverService.getCurrentQueuePending();
  }

  @Get('queue/complete')
  getQueueComplete() {
    return this.solverService.getCurrentQueueComplete();
  }

  @Get('queue/failed')
  getQueueFailed() {
    return this.solverService.getCurrentQueueFailed();
  }
}
