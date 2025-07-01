import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';

import { CreateUserModalComponent } from './create-user-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('CreateUserModalComponent', () => {
  let component: CreateUserModalComponent;
  let fixture: ComponentFixture<CreateUserModalComponent>;
  let authServiceMock: Partial<AuthService>;
  let modalCtlMock: Partial<ModalController>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserModalComponent],
      imports: [IonicModule.forRoot()],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
