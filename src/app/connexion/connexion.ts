import { Component, signal } from '@angular/core';
import { Router } from '@angular/router'; // Importe le Router
import { Login} from './login/login'

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [Login],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class Connexion {
  protected readonly title = signal('Connexion');
  constructor(private router: Router) {} // Injecte le Router

  onLoginSuccess() {
    this.router.navigate(['/admin']); // Change l'URL vers /admin
  }
}
