import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private el: ElementRef
  ) { }


  @HostListener('click') onClick() {
    this.highlight(null);
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
