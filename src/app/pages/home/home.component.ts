import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../../services/activite.service';
import { Activite } from '../../models/activite.model';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SwipeCardComponent } from '../../components/swipe-card/swipe-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, SwipeCardComponent]
})
export class HomeComponent implements OnInit {
  activites: Activite[] = [];
  liked: Activite[] = [];
  index = 0;
  destinations: Destination[] = [];
  user: any;



  constructor(
    private activiteService: ActiviteService,
    private destinationService: DestinationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activiteService.getAllActivites().subscribe((data) => {
      this.activites = data;
    });
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
  

  like() {
    if (this.activites[this.index]) {
      this.liked.push(this.activites[this.index]);
    }
    this.index++;
    if (this.index >= this.activites.length) {
      this.getDestinations();
    }
  }

  dislike() {
    const current = this.activites[this.index];
    if (current) {
      // Supprimer si l'activité était déjà likée
      this.activiteService.dislikeActivite(current.id, this.authService.getUserId()).subscribe();
    }
  
    this.index++;
  
    if (this.index >= this.activites.length) {
      this.getDestinations();
    }
  }
  

  getDestinations() {                                                                                                                                                                                                     
    this.destinationService.getDestinationsFinales(this.authService.getUserId()).subscribe(
      (data: Destination[]) => {
        this.destinations = data;
      },
      (error) => {
        console.error('Error loading destinations', error);
      }
    );
  }

  get currentActivite(): Activite | null {
    return this.activites[this.index] || null;
  }
  recommencerSwipe() {
    this.index = 0;
    this.liked = [];
    this.destinations = [];
    this.activiteService.getAllActivites().subscribe((data) => {
      this.activites = data;
    });
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
}
