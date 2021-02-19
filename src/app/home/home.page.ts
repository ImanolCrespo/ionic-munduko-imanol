import { Component, OnInit } from '@angular/core';
import { IActivity } from '../share/interfaces';
import { ActivitydbService } from '../core/activitydb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
import { ActivitycrudService } from './../core/activitycrud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  activities: any;
  activityName: string;
  activityPrice: string;
  activityDate: string;
  activityImage: string;
  activityDescription: string;

  constructor(private activitycrudService: ActivitycrudService, private route: Router) { }
  activityTapped(activity) {
    this.route.navigate(['details', activity.id]);
  }
  ngOnInit() {
    this.activitycrudService.read_Activities().subscribe(data => {
      this.activities = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          date: e.payload.doc.data()['date'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description']
        };
      })
      console.log(this.activities);
    });
  }
  
  CreateRecord() {
    let record = {};
    record['name'] = this.activityName;
    record['price'] = this.activityPrice;
    record['date'] = this.activityDate;
    record['image'] = this.activityImage;
    record['description'] = this.activityDescription;
    this.activitycrudService.create_Activity(record).then(resp => {
      this.activityName = "";
      this.activityPrice = "";
      this.activityDate = "";
      this.activityImage = "";
      this.activityDescription = "";
      this.activityDate = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
  RemoveRecord(rowID) {
    this.activitycrudService.delete_Activity(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.name;
    record.EditGenre = record.price;
    record.EditDate = record.date;
    record.EditCover = record.image;
    record.EditDescription = record.description;
  }
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['price'] = recordRow.EditGenre;
    record['date'] = recordRow.EditDate;
    record['image'] = recordRow.EditCover;
    record['descrition'] = recordRow.EditDescription;
    this.activitycrudService.update_Activity(recordRow.id, record);
    recordRow.isEdit = false;
  }
  /*public activities: IActivity[];
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
    }*/
}
