import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        CanvasComponent
    ],
    imports: [
        BrowserModule,
        CoreModule
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule { }
