import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: WebSocket | undefined;

  public openWebSocket(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = event => {
      console.log('WebSocket Open: ', event);
    };

    this.socket.onmessage = event => {
      console.log('WebSocket Message: ', event.data);
    };

    this.socket.onclose = event => {
      console.log('WebSocket Close: ', event);
    };

    this.socket.onerror = event => {
      console.error('WebSocket Error: ', event);
    };
  }

  public closeWebSocket() {
    this.socket?.close();
  }

  public sendMessage(message: string) {
    this.socket?.send(message);
  }
}

