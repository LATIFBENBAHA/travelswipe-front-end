import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login.request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  motdepass: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.motdepass).subscribe({
      next: (data) => {
        console.log('Login réussi:', data);

        if (data.user) {
          console.log('Utilisateur ID:', data.user.id);
        } else {
          console.error('Aucun utilisateur dans la réponse');
        }
  
        this.router.navigate(['/home'])
          .then(() => console.log('Navigation réussie vers /home'))
          .catch(err => console.error('Échec de la navigation:', err));
      },
      error: (error) => {
        console.error('Erreur de login:', error);
        this.errorMessage = error.error?.message || 'Une erreur est survenue';
      }
    });
  }
  
  
}