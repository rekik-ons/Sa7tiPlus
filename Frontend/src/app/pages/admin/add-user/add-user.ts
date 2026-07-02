import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

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
  const body = {
    nom: this.user.nom,
    prenom: this.user.prenom,
    cin: this.user.cin,
    tel: this.user.tel,
    email: this.user.email,
    date_naissance: this.user.dateNaissance, 
    profil: this.user.profil,
    sexe: this.user.sexe                       
  };

    this.http.post('http://localhost:8000/users/add', body)
      .subscribe({
        next: (res) => {
          alert('Utilisateur ajouté avec succès');
          this.router.navigate(['/admin/consulter-user']);
        },
        error: (err) => {
    console.error('Erreur complète:', err);

    let message: string;

    if (err.status === 0) {
      
      message = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
    } else if (err.error && typeof err.error === 'object' && !(err.error instanceof ProgressEvent)) {
      
      message = err.error.detail || err.error.message || JSON.stringify(err.error);
    } else {
      message = `Erreur ${err.status}: ${err.statusText}`;
    }

    alert('Erreur : ' + message);
  }
      });
  }
  cancel() {
    this.router.navigate(['/admin/consulter-user']);
  }
}