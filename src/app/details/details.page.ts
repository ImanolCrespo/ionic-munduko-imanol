import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitydbService } from '../core/activitydb.service';
import { IActivity } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { ActivitycrudService } from '../core/activitycrud.service';
import { element } from 'protractor';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string;
  public activity: IActivity;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private activitycrudService: ActivitycrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.activitycrudService.read_Activities().subscribe(data => {
      let activities = data.map(e => {
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
      console.log(activities);
      activities.forEach(element=>{
        if (element.id == this.id) {
          this.activity = element;
        }
      })
  });
}
  editRecord(activity) {
    this.router.navigate(['edit', activity.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar película',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.activitycrudService.delete_Activity(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
