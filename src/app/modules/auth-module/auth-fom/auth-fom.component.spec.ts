import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFomComponent } from './auth-fom.component';

describe('AuthFomComponent', () => {
  let component: AuthFomComponent;
  let fixture: ComponentFixture<AuthFomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthFomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
