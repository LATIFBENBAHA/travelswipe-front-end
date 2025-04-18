import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activite } from '../../models/activite.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service'; // 👈 ajouter

@Component({
  selector: 'app-swipe-card',
  templateUrl: './swipe-card.component.html',
  styleUrls: ['./swipe-card.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class SwipeCardComponent {
  @Input() activite: Activite | null = null;
  @Output() liked = new EventEmitter<void>();
  @Output() disliked = new EventEmitter<void>();

  constructor(private http: HttpClient, private authService: AuthService) {} // 👈 injecte AuthService

  likeActivite() {
    if (!this.activite) return;

    const userId = this.authService.getUserId(); // 👈 récupère l’id

    if (!userId) {
      console.error('Aucun utilisateur connecté.');
      return;
    }

    this.http.post('http://localhost:8080/api/favorisactivites/like', {
      activiteId: this.activite.id,
      userId: userId
    }).subscribe({
      next: () => {
        console.log("Activité likée ✅");
        this.liked.emit(); // informe le parent
      },
      error: err => console.error("Erreur lors du like ❌", err)
    });
  }

  dislikeActivite() {
    this.disliked.emit(); // just notify the parent
  }
}
