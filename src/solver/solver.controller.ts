import { Controller, Get, Param } from '@nestjs/common';
import { SolverService } from './solver.service';

@Controller('solver')
export class SolverController {
  constructor(private readonly solverService: SolverService) {}

  @Get('nonce/:nonce')
  solveNonce(@Param('nonce') nonce: string) {
    return this.solverService.addNonce(+nonce);
  }

  @Get('queue')
  getQueue() {
    return this.solverService.getCurrentQueue();
  }
}