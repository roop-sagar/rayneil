import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTestComponent } from './store-test.component';

describe('StoreTestComponent', () => {
  let component: StoreTestComponent;
  let fixture: ComponentFixture<StoreTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
