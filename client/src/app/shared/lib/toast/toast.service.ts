import { Injectable, Injector } from '@angular/core';
import { ToastComponent } from './toast.component';
import { DynamicComponentLoader } from '../../utils/dynamic-component-loader';
import { ToastOptions } from './models';
import { TOAST_TEXT, TOAST_OPTIONS } from './tokens';

const defaultOptions: ToastOptions = { timeout: 4000, type: 'info' };

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(private dynamicComponentLoader: DynamicComponentLoader) { }

  show(text: string, options: Partial<ToastOptions> = defaultOptions) {
    const opts = { ...defaultOptions, ...options };
    const injector = Injector.create({
      providers: [
        { provide: TOAST_TEXT, useValue: text },
        { provide: TOAST_OPTIONS, useValue: opts }
      ]
    });

    const cmpRef = this.dynamicComponentLoader.load(ToastComponent, injector);

    if (opts.timeout) {
      setTimeout(() => {
        this.dynamicComponentLoader.unload(cmpRef);
      }, opts.timeout + 1000);
    }
  }
}
