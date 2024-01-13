import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Throttle } from '@nestjs/throttler';
import { ClientGrpc } from '@nestjs/microservices';
import { createHash } from 'node:crypto';

function mine(nonce: number) {
  let solution = 1;
  console.log('Mining...');

  while (true) {
    const hash = createHash('MD5');
    hash.update((nonce + solution).toString()).end();
    const attempt = hash.digest('hex');
    if (attempt.substring(0, 6) === '000000') {
      console.log(`Solved ${solution}`);
      return solution;
    }
    solution += 1;
  }
}

interface SolverService {
  SolveNonce({}): Observable<any>;
}

@Controller('users')
export class UsersController implements OnModuleInit {
  private solver: SolverService;
  constructor(
    @Inject('CHAIN_PACKAGE') private client: ClientGrpc,
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    this.solver = this.client.getService<SolverService>('SolverService');
  }

  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('node/:id')
  solveNode(@Param('id') id: string) {
    const solution = mine(+id);
    return this.solver.SolveNonce(solution);
  }

  @Get('go/:id')
  findOne(@Param('id') id: string) {
    return this.solver.SolveNonce(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
