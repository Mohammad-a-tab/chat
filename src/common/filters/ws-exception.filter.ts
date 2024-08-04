import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    client.emit('exception', {
      status: 'error',
      message: exception.getError(),
    });
  }
}
