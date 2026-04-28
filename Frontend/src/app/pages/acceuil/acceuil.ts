import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acceuil',
  imports: [],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.css',
})
export class Acceuil {
  loaded = false;
constructor(private router: Router) {}

  ngOnInit() {
    this.loaded = true;
  }

  onConnect() {
    this.router.navigate(['/connexion']);
  }

  onImgError(event: any) {
    event.target.style.display = 'none';
  }
}