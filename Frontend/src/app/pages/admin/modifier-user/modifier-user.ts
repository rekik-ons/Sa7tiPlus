import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-modifier-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modifier-user.html',
  styleUrl: './modifier-user.css',
})
export class ModifierUser implements OnInit {
  user = { tel: '', email: '' };
  id_user: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  this.id_user = Number(this.route.snapshot.queryParams['id']);
  this.http.get<any>(`http://localhost:8000/users/${this.id_user}`).subscribe({
    next: (data) => this.user = data,
    error: (err) => console.error(err)
  });
}

modifier(): void {
  this.http.put(`http://localhost:8000/users/${this.id_user}`, this.user).subscribe({
    next: () => {
      alert('User modifié avec succès !');
      this.router.navigate(['/admin/consulter-user']);
    },
    error: (err) => console.error(err)
  });
}
  cancel(): void {
    this.router.navigate(['/admin/consulter-user']);
  }
}