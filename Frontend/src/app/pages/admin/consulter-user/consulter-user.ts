import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router , RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulter-user',
  imports: [CommonModule, RouterModule],
  templateUrl: './consulter-user.html',
  styleUrl: './consulter-user.css',
})
export class ConsulterUser implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

nomPrenom: string = '';

ngOnInit() {
  if (typeof window !== 'undefined' && window.localStorage) {
    this.nomPrenom = `${localStorage.getItem('prenom')}`;
  }
  this.loadUsers();
}
loadUsers() {
  this.http.get<any[]>('http://localhost:8000/users/all')
    .subscribe({
      next: (data) => {
        console.log('data reçue:', data); 
        this.users = data.filter(u => u.profil !== 'Administrateur');
        this.filteredUsers = [...this.users];
      },
      error: (err) => console.error('Erreur API:', err)
    });
}

filterByProfil(profil: string) {
  if (profil === 'Tous') {
    this.filteredUsers = [...this.users];
  } else {
    this.filteredUsers = this.users.filter(u => u.profil === profil);
  }
}
  logout() {
  localStorage.clear();
  this.router.navigate(['/connexion']);
}
  archiver(id_user: number) {
    if (!confirm('Confirmer l\'archivage de cet utilisateur ?')) return;

    this.http.put(`http://localhost:8000/users/archive/${id_user}`, {})
      .subscribe({
        next: () => {
          alert('Utilisateur archivé avec succès');
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de l\'archivage');
        }
      });
  }

  goToAddUser() {
    this.router.navigate(['/admin/add-user']);
  }
}
