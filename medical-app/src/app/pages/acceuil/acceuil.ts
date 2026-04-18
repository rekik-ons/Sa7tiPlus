import { Component } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  imports: [],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.css',
})
export class Acceuil {
  loaded = false;

  ngOnInit() {
    this.loaded = true;
  }

  onConnect() {
    // Handle connect action, e.g., navigate to login
  }

  onImgError(event: any) {
    // Handle image error
  }
}
