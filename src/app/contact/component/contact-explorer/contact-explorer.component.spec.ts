import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactExplorerComponent } from './contact-explorer.component';

describe('ContactExplorerComponent', () => {
  let component: ContactExplorerComponent;
  let fixture: ComponentFixture<ContactExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
