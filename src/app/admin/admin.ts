import { Component, signal } from '@angular/core';
import { User } from "./user/user";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, User],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  protected readonly title = signal('Admin');
  
  users = [
    { name: 'Dr. Samira Habib', profil: 'Ophtalmologue', email: 'samira.habib@example.com', tel: '29 256 789' },
    { name: 'Sonia Tounsi', profil: 'Infirmière', email: 'sonia.tounsi@example.com', tel: '50 420 312' },
    { name: 'Mahdi Sassi', profil: 'Patient', email: 'mahdi.sassi@example.com', tel: '97 586 123' }
  ];

  MEDICAL_SPECIALITIES = ['Ophtalmologue', 'Radiologue', 'Généraliste', 'Cardiologue'];
  filteredUsers = [...this.users];

  filterByProfil(profil: string) {
    // 1. CAS : TOUS
    if (profil === 'Tous') {
      this.filteredUsers = [...this.users];
    } 
    // 2. CAS : MÉDECINS (On cherche dans la liste des spécialités)
    else if (profil === 'Médecin') {
      this.filteredUsers = this.users.filter(u => 
      this.MEDICAL_SPECIALITIES.includes(u.profil));
    } 
    // 3. CAS : INFIRMIÈRES OU PATIENTS (Filtre exact sur le profil)
    else {
      this.filteredUsers = this.users.filter(u => u.profil === profil);
    }
    
    // NOTE : On ne rajoute rien après, sinon on écrase le résultat !
  }

  logout() {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      alert("Utilisateur déconnecté");
      window.location.href = ''; 
    }
  }
}
