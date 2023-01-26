import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelectElement]'
})
export class SelectElementDirective {
  private selected: boolean;
  private originalBackground: string;

  constructor(
    private elementRef: ElementRef
  ) {
    this.selected = false;
    this.originalBackground = this.elementRef.nativeElement.style.backgroundColor;
  }

  @HostListener('click')
  onClick(): void {
    this.selected = !this.selected;
    this.toggleBackground();
  }

  toggleBackground(): void {
    this.elementRef.nativeElement.style.backgroundColor = this.selected ? '#212121' : this.originalBackground;
  }

}
