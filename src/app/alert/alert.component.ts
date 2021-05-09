import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() score: string;
  @Input() isRecord: boolean;
  @Output() close = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit();
  }

}
