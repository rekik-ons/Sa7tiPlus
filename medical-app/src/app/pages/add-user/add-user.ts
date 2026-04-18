import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-user',
  imports: [FormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  constructor(private http: HttpClient) {}
 user = {
  name: '',
  cin: '',
  email: '',
  dateNaissance: '',
  profil: '',
  tel: '',
  sexe: ''
};


addUser() {
  const formData = new FormData();

  formData.append('name', this.user.name);
  formData.append('cin', this.user.cin);
  formData.append('mail', this.user.email);
  formData.append('date_naissance', this.user.dateNaissance);
  formData.append('profil', this.user.profil);
  formData.append('tel', this.user.tel);
  formData.append('sexe', this.user.sexe);

  this.http.post('http://localhost:8000/add_user', formData)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert('User ajouté avec succès');
      },
      error: (err) => {
        console.error(err);
        alert('Erreur');
      }
    });
}
cancel() {
    console.log('Annulé');
  }
}