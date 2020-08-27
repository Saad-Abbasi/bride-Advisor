import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogeComponent } from './image-dialoge.component';

describe('ImageDialogeComponent', () => {
  let component: ImageDialogeComponent;
  let fixture: ComponentFixture<ImageDialogeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDialogeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
