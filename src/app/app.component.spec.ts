import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
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
      `☀️How's the weather?`
    );
  });

  it('should be invalid when city is empty', () => {
    expect(app.weatherForm.valid).toBeFalse();
  });

  it('should be valid when city is not empty', () => {
    app.weatherForm.controls['city'].setValue('foo');
    expect(app.weatherForm.valid).toBeTrue();
  });

  // TODO Add form validation tests
});
