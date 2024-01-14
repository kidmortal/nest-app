import { Controller, Get, Param } from '@nestjs/common';
import { SolverService } from './solver.service';
import { SolverGateway } from './solver.gateway';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Solver')
@Controller('solver')
export class SolverController {
  constructor(
    private readonly solverService: SolverService,
    private solverWebsocket: SolverGateway,
  ) {}

  @ApiOperation({ summary: 'Adds a number to the queue to be processed' })
  @Get('nonce/:nonce')
  addNonceToQueue(@Param('nonce') nonce: number) {
    const result = this.solverService.addNonce(+nonce);
    this.solverWebsocket.broadcastQueueStatus();
    return result;
  }
  @ApiOperation({
    summary:
      'Adds a number to the queue to be processed but with high priority',
  })
  @Get('nonce/priority/:nonce')
  addNonceToPriorityQueue(@Param('nonce') nonce: number) {
    const result = this.solverService.addHighPriorityNonce(+nonce);
    this.solverWebsocket.broadcastQueueStatus();
    return result;
  }

  @ApiOperation({
    summary: 'Get a list of all jobs that are waiting to be processed',
  })
  @Get('queue/pending')
  getQueuePending() {
    return this.solverService.getCurrentQueuePending();
  }

  @ApiOperation({
    summary: 'Get a list of all jobs that has been processed',
  })
  @Get('queue/complete')
  getQueueComplete() {
    return this.solverService.getCurrentQueueComplete();
  }
  @ApiOperation({
    summary: 'Get a list of all jobs that failed',
  })
  @Get('queue/failed')
  getQueueFailed() {
    return this.solverService.getCurrentQueueFailed();
  }

  @ApiOperation({
    summary:
      'Returns first 10 pending jobs, 10 last finished jobs and current being processed job, open for more info',
    description: `
     you can also receive this by using a websocket connection,
     just open a socket.io connection and listen to "queue_update" events
     `,
  })
  @Get('queue/status')
  currentQueueStatus() {
    return this.solverService.getQueueStateSummary();
  }
}
