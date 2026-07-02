import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  login: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (!this.login || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }
    const credentials = { login: this.login.trim(), password: this.password.trim() };
    this.http.post<any>('http://localhost:8000/auth/login', credentials).subscribe({
      next: (res) => {
        localStorage.setItem("role", res.role);
        localStorage.setItem("id_user", res.id_user?.toString() || '');
        localStorage.setItem("nom", res.nom || '');
        localStorage.setItem("prenom", res.prenom || '');
        if (res.role === 'Administrateur') this.router.navigate(['/admin/consulter-user']);
        else if (res.role === 'Médecin') this.router.navigate(['/medecin/consulter-dossier']);
        else if (res.role === 'Patient') this.router.navigate(['/patient/consulter-rdv']);
        else this.errorMessage = 'Rôle inconnu : ' + res.role;
      },
      error: () => this.errorMessage = 'Login ou mot de passe incorrect !'
    });
  }
}