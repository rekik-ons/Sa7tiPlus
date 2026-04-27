import { Component,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  login: string ='';
  password:string='';

  constructor(private router: Router) {}
  async onSubmit() {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // 1. On peut stocker les infos en local pour s'en souvenir sur les autres pages
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userId', data.id_profil);
        // 2. Redirection selon le rôle reçu du backend
        if (data.role === 'Administrateur') {
          this.router.navigate(['/admin']);
        } else if (data.role === 'Medecin') {
          this.router.navigate(['/medecin']);
        }else if (data.role === 'Patient') {
          this.router.navigate(['/patient']);
        }
         else {
          this.router.navigate(['/connexion']);
          alert("Login ou mot de passe invalide");
        }
      } else {
        // Affiche l'erreur renvoyée par FastAPI (ex: "Login ou mot de passe invalide")
        alert("Login ou mot de passe invalide !");
      }
    }catch (error) {
      console.error("Erreur réseau", error);
      alert("Le serveur ne répond pas. Vérifie uvicorn !");
    }
  }
}

