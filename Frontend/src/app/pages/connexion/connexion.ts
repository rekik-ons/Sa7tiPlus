import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  login: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    console.log("1. Tentative de connexion avec :", this.login);
    
    if (!this.login || !this.password) {
      alert("Remplir tous les champs");
      return;
    }

    const credentials = {
      login: this.login.trim(),
      password: this.password.trim()
    };

    // UNE SEULE REQUÊTE ICI
    this.http.post<any>('http://localhost:8000/auth/login', credentials).subscribe({
      next: (res) => {
        console.log("2. Réponse serveur reçue :", res);
        
        // Stockage sécurisé
        localStorage.setItem("role", res.role);
        localStorage.setItem("id_user", res.id_user?.toString() || '');

      // Redirection
      if (res.role === 'Administrateur') {
        this.router.navigate(['/consulter-user']);
      } else if (res.role === 'Médecin') {
        this.router.navigate(['/medecin/consulter-dossier']);
      } else if (res.role === 'Patient') {
        this.router.navigate(['/patient/consulter-rdv']);
      } else {
        console.error("Rôle non reconnu :", res.role);
        alert("Rôle inconnu : " + res.role);
      }
      },
      error: (err) => {
        console.error("3. Erreur HTTP :", err);
        alert("Login ou mot de passe incorrect !");
      }
    });
  }
}