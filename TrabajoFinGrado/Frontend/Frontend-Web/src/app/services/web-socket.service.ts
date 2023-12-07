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
      // Aquí puedes manejar los datos recibidos
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

  // Método para enviar mensajes al servidor, si es necesario
  public sendMessage(message: string) {
    this.socket?.send(message);
  }
}
/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-contact',
  template: `
    <!-- Tu código HTML aquí -->
  `
})
export class ContactComponent implements OnInit, OnDestroy {

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // Reemplaza con la URL de tu WebSocket
    this.webSocketService.openWebSocket('ws://your-websocket-url');
  }

  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
  }
}
*/
