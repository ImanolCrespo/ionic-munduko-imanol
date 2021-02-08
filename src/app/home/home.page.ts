import { Component, OnInit } from '@angular/core';
import { IActivity } from '../share/interfaces';
import { ActivitydbService } from '../core/activitydb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public activities: IActivity[];
  activitiesinit: IActivity[] = [
    {
      id: '1',
      name: 'Campamento',
      price: 120,
      date: '14/07/2021',
      image:
        'https://www.mujerhoy.com/noticias/201804/23/media/cortadas/campamentos-de-verano-como-elegir-bien-kt7D-U501702292163jFE-560x420@MujerHoy.jpg',
      description: "Campamento en Arizkun, un pequeño pueblo de Navarra. Durante 9 días."
    },
    {
      id: '2',
      name: 'Guerra de agua',
      price: 0,
      date: '03/06/2021',
      image:
        'https://static.lasprovincias.es/www/multimedia/201804/20/media/cortadas/123926215--624x452.jpg',
      description: "Coje tus pistolas, globos y ganas de pasarlo bien y vente a una refrescante tarde en Huarte!"
    }
  ]
  constructor(private activitydbService: ActivitydbService, private route:
    Router) { }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }

  ionViewDidEnter(){
    // Remove elements if it already has values
    if(this.activities !== undefined ){
    this.activities.splice(0);
    }
    this.retrieveValues();
    }
    inicialization() {
    if (this.activitydbService.empty()) {
    this.activitiesinit.forEach(movie => {
    this.activitydbService.setItem(movie.id, movie);
    });
    }
    }
    retrieveValues(){
    // Retrieve values
    this.activitydbService.getAll().then(
    (data) => this.activities = data
    );
    }
    activityTapped(movie) {
    this.route.navigate(['details', movie.id]);
    }
}
