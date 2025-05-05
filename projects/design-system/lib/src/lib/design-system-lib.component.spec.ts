import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemLibComponent } from './design-system-lib.component';

describe('DesignSystemLibComponent', () => {
  let component: DesignSystemLibComponent;
  let fixture: ComponentFixture<DesignSystemLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
