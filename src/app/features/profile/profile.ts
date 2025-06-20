import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  authService = inject(Auth)
}
