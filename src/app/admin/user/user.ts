import { Component ,Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input() name: string = '';
  @Input() profil: string = '';
  @Input() email: string = '';
  @Input() tel: string = '';

}
