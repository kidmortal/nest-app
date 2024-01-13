import { Test, TestingModule } from '@nestjs/testing';
import { SolverController } from './solver.controller';
import { SolverService } from './solver.service';

describe('SolverController', () => {
  let controller: SolverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolverController],
      providers: [SolverService],
    }).compile();

    controller = module.get<SolverController>(SolverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
