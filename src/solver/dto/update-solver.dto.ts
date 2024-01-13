import { PartialType } from '@nestjs/swagger';
import { CreateSolverDto } from './create-solver.dto';

export class UpdateSolverDto extends PartialType(CreateSolverDto) {}
