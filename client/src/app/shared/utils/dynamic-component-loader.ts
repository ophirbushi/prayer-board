import { Injectable, Type, Injector, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, ComponentRef } from '@angular/core';

/** Using code from https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6 */

@Injectable({
    providedIn: 'root'
})
export class DynamicComponentLoader {

    constructor(private appRef: ApplicationRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    load(component: Type<any>, injector = Injector.create({ providers: [] })) {

        // Create a component reference from the component 
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(injector);

        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.body.appendChild(domElem);

        return componentRef;
    }

    unload(componentRef: ComponentRef<any>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
