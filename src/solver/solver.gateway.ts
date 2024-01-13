import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { SolverService } from './solver.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class SolverGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  wsClients: Socket[] = [];
  private logger = new Logger('Websocket');

  constructor(private solverService: SolverService) {}

  async broadcastQueueStatus() {
    const status = await this.solverService.getQueueStateSummary();
    this.broadcast('queue_update', status);
  }

  broadcast(event, message: any) {
    for (const c of this.wsClients) {
      c.emit(event, message);
    }
  }

  async handleConnection(client: Socket) {
    this.logger.debug(`socket ${client.id} connected`);
    this.wsClients.push(client);
    const summary = await this.solverService.getQueueStateSummary();
    client.emit('queue_update', summary);
  }

  handleDisconnect(client: Socket) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        const disconnectedSocket = this.wsClients.splice(i, 1);
        this.logger.debug(`socket ${disconnectedSocket[0].id} disconnected`);
        break;
      }
    }
  }
}
