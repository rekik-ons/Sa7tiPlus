import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {

  user = {
    nom: '',
    prenom: '',
    cin: '',
    tel: '',
    email: '',
    dateNaissance: '',
    profil: '',
    sexe: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  addUser() {
    const body = new HttpParams()
      .set('nom', this.user.nom)
      .set('prenom', this.user.prenom)
      .set('cin', this.user.cin)
      .set('tel', this.user.tel)
      .set('email', this.user.email)
      .set('date_naiss', this.user.dateNaissance)
      .set('profil', this.user.profil)
      .set('genre', this.user.sexe);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post('http://localhost:8000/users/add', body.toString(), { headers })
      .subscribe({
        next: (res) => {
          alert('Utilisateur ajouté avec succès');
          this.router.navigate(['/consulter-user']);
        },
        error: (err) => {
          console.error('Erreur complète:', err);
          alert('Erreur : ' + JSON.stringify(err.error));
        }
      });
  }

  cancel() {
    this.router.navigate(['/consulter-user']);
  }
}