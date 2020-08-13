import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
      });
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-weather'`, () => {
    expect(app.title).toEqual('angular-weather');
  });

  it('should say hello with a sun emoji', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('main h1').textContent).toContain(
      'Hello. ☀️'
    );
  });

  it('should be invalid when city is empty', () => {
    expect(app.weatherForm.valid).toBeFalse();
  });

  it('should valid when city is not empty', () => {
    app.weatherForm.controls['city'].setValue('foo');
    expect(app.weatherForm.valid).toBeTrue();
  });

  it('should submit only if form is valid', () => {
    app.onSubmit();
    expect(app.submitted).toBeFalse();
  });

  it('should get mock weather data from WeatherService', () => {
    app.weatherForm.controls['city'].setValue('bar');
    app.onSubmit();
    expect(app.forecast.length).toBe(5);
  });
});
