import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-rdv',
  imports: [FormsModule],
  templateUrl: './create-rdv.html',
  styleUrl: './create-rdv.css',
})
export class CreateRdv {
  Nom :string=''
  Prenom :string=''
  Date :string=''
  Heure : string='' 
  Specialite : string=''

}
