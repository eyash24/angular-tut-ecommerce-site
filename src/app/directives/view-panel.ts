import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host: {
    style: `
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      background-color: #ffffff;
      display: block;
    `
  }
})
export class ViewPanel {
  constructor() {}
}
