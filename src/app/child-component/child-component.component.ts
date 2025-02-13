import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  standalone: false,
  templateUrl: './child-component.component.html',
  styleUrl: './child-component.component.css'
})
export class ChildComponentComponent {

  @Output() messageEvent = new EventEmitter<string>();

  @Input() childMessage!: string;

  public sendMessage(): void {
    this.messageEvent.emit('Hello This Message is from Child Component');
    console.log('Message sent from Child Component');
  }

  public message: string = '';

  public receiveMessage(message: string): void {
    this.message = message;
  }
}
