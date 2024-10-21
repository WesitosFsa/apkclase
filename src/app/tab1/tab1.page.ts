import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  display: string = '';
  operatorPressed: boolean = false;

  constructor() {}

  press(val: string) {
    if (val === '=') {
      this.calculate();
      return;
    }
    
    if (this.operatorPressed && ['+', '-', '*', '/'].includes(val)) {
      return; // No permite dos operadores seguidos
    }

    if (val === 'C') {
      this.clear();
      return;
    }

    this.display += val;
    this.operatorPressed = ['+', '-', '*', '/'].includes(val);
  }

  clear() {
    this.display = '';
    this.operatorPressed = false; // Reiniciar el estado del operador
  }

  calculate() {
    try {
      // Usamos Function para evaluar de manera más segura
      const result = Function('"use strict";return (' + this.display + ')')();
      this.display = result.toString();
    } catch (e) {
      this.display = 'Error';
    }
  }
}
