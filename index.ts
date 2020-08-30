import {
  ɵɵdefineComponent as defineComponent,
  ɵɵelement as element,
  ɵɵelementStart as elementStart,
  ɵɵelementEnd as elementEnd,
  ɵɵtext as text,
  ɵɵlistener as listener,
  ɵɵselect as select,
  ɵrenderComponent as renderComponent,
  ɵɵtextBinding as textBinding,
  ɵɵinterpolation1 as interpolation,
  enableProdMode,
  ɵdetectChanges as detectChanges,
  ɵComponentDef as ComponentDef,
  OnInit} from '@angular/core';
// import { AppModule } from './app/app.module';
// import { AppComponent } from './app/app.component';

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

function myFeature() {
  return (def: ComponentDef<any>) => {
    const originalFactory = def.factory; // original factory creating a component
    def.factory = () => {
      const cmp = originalFactory(def.type); // component instance
      if (cmp.title) {
        cmp.title = 'better title';
      }
      return cmp; // return the patched component
    };
  };
}

class AppComponent implements OnInit {
  static ngComponentDef = defineComponent({
    type: AppComponent,
    selectors: [['app-root']],
    factory: (t) => new (t || AppComponent)(),
    consts: 3,
    vars: 1,
    features: [myFeature()],
    template: (rf, ctx) => {
      if (rf & 1) {
        elementStart(0, 'div');
        text(1);
        elementEnd();
        elementStart(2, 'button');
        listener('click', () => {
          ctx.title = ctx.title + '1';
          detectChanges(ctx);
        });
        text(3, 'click');
        elementEnd();

      }
      if (rf & 2) {
        select(1),
        textBinding(1, interpolation('>', ctx.title, '<'));
      }
    },
    styles: []
  });
  title = 'ang-thang';
  ngOnInit() {
    console.log('hello ', this.title);
  }
}


renderComponent(AppComponent);

// (NgForOf as any).ngDirectiveDef = defineDirective({
//   type: NgForOfDef,
//   selectors: [['', 'ngForOf', '']],
//   factory: () => new NgForOfDef(
//                directiveInject(ViewContainerRef as any), directiveInject(TemplateRef as any),
//                directiveInject(IterableDiffers)),
//   inputs: {
//     ngForOf: 'ngForOf',
//     ngForTrackBy: 'ngForTrackBy',
//     ngForTemplate: 'ngForTemplate',
//   }
// });

// (NgIf as any).ngDirectiveDef = definedDirective({
//   type: NgIf,
//   selectors: [['', 'ngIf', '']],
//   factory: () => new NgIf(
//                directiveInject(ViewContainerRef as any), directiveInject(TemplateRef as any)),
//   inputs: {ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse'}
// });

// export class ManualComponent {
//   name = 'Component';
//   names = [];

//   updateName(newName: string) {
//     this.name = newName;
//     console.log(this.name);
//     detectChanges(this);
//   }
//   addSomething() {
//     this.names = [
//       ...this.names,
//       this.name,
//     ]
//     console.log(this.names);
//   }

//   static ngComponentDef = ɵdefineComponent({
//     type: ManualComponent,
//     selectors: [['manual-component']],
//     factory: () => new ManualComponent(),
//     directives: ()=>[],
//     consts: 8,
//     vars: 4,
//     template: (rf: ɵRenderFlags, ctx: ManualComponent) => {
//       if (rf & 1) {
//         elementStart(0, 'h2');
//         // element(1, 'h2');
//           text(1, 'Hello, ');
//           text(2);
//         elementEnd();
//         text(3, 'Your name: ');
//         elementStart(4, 'input'); 
//           eventListener('input', 
//             $event => ctx.updateName($event.target.value));
//         elementEnd();
//         elementStart(5, 'button');
//           eventListener('click', $event => ctx.addSomething());
//           text(7, 'add');
//         elementEnd();
//         // elementContainerStart(8, ['ngIf']);
//         // elementContainerEnd();
//         // containerNode(8, ifTemplate, null, ['ngIf']);
//         // containerNode(7, forTemplate, 'div', ['ngForOf']);
//         // containerNodeEnd();
//       }
//       if (rf & 2) {
//         textWithBinding(2, ctx.name);
//         elementProperty(4, 'value', ctx.name);
//         // elementProperty(8, 'ngIf', (ctx.name === 'Ben'));
//         // elementProperty(7, 'ngForOf', ctx.names); 
//         // console.log(ctx);
//         // elementProperty(7, 'ngForTemplate', forTemplate);
//       }

//       function ifTemplate(rf: ɵRenderFlags, ctx: ManualComponent) {
//         if (rf & 1) {
//           element(0, 'div');
//           element(1, 'img', ['src', 'https://pbs.twimg.com/tweet_video_thumb/C80o289UQAAKIqp.jpg']);
//           elementEnd();
//           console.log(ctx, rf);
          
//         }
//       }
//       // function forTemplate(rf: ɵRenderFlags, ctx: ManualComponent) {
//       //   console.log(ctx);
//       //   if (rf & 1) {
//       //     element(0, 'div');
//       //     text(1, 'hi');
//       //     elementEnd();
//       //   }
//       // }
//     },
//   });
// }
// ɵrenderComponent(ManualComponent);
