import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserProfilePage } from './user-profile.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IonicModule } from '@ionic/angular';

describe('UserProfilePage', () => {
  let component: UserProfilePage;
  let fixture: ComponentFixture<UserProfilePage>;
  let authServiceMock: Partial<AuthService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
    });

    fixture = TestBed.createComponent(UserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
