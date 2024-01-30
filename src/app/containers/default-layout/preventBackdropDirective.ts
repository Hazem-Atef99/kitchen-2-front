import { Directive, ElementRef, HostListener } from '@angular/core';
declare const Core: any;
@Directive({
  selector: '[preventBackdrop]'
})
export class PreventBackdropDirective  {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    document.body.classList.remove('modal-open');
    const backdrops = document.getElementsByClassName('modal-backdrop');
    for (let i = 0; i < backdrops.length; i++) {
      backdrops[i].parentNode?.removeChild(backdrops[i]);
    }

    // Trigger the modal open logic by simulating a click event on the modal trigger element
    const modalTrigger = document.querySelector('[data-target="#modalXl"]'); // Replace with your modal trigger selector
    if (modalTrigger) {
      modalTrigger.dispatchEvent(new Event('click'));
    }
  }
}
