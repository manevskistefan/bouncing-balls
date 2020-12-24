import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Constants } from './app.constants';
import { CanvasComponent } from './components/canvas/canvas.component';

/**
 * Unit tests for {@link AppComponent}.
 */
describe('AppComponent', () => {
    let testAppComponent: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent, CanvasComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        testAppComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should create the AppComponent with default title', () => {
        expect(testAppComponent).toBeTruthy();
        expect(testAppComponent.title).toEqual(Constants.APP_NAME);
    });
});
