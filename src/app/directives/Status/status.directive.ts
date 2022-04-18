import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective {
  constructor(private el: ElementRef) {
    this.el = el;
  }
  ngAfterViewInit() {
    if(this.el.nativeElement.children[2].textContent === 'Completed') {
      this.el.nativeElement.classList.add('completed');
    }
 }
}
