import { Component } from '@angular/core';
import { Constants } from './app.constants';

/**
 * App Component.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title: string;

    constructor() {
        this.title = Constants.APP_NAME; 
    }
}
