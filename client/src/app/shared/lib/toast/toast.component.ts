import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { TOAST_TEXT, TOAST_OPTIONS } from './tokens';
import { ToastOptions } from './models';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @HostBinding('class.show') show = false;
  @HostBinding('class.error') get isError(): boolean {
    return this.options.type === 'error';
  }

  constructor(
    @Inject(TOAST_TEXT) public text: string,
    @Inject(TOAST_OPTIONS) public options: ToastOptions
  ) { }

  ngOnInit() {
    setTimeout(() => this.show = true, 10);

    if (this.options.timeout) {
      setTimeout(() => {
        this.show = false;
      }, this.options.timeout);
    }

  }

}
