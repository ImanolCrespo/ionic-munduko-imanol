import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivitydbService } from '../core/activitydb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IActivity } from '../share/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  activity: IActivity;
  activityForm: FormGroup;
  constructor(
    private router: Router,
    private activitydbService: ActivitydbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.activityForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      date: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar actividad',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveActivity();
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
  saveActivity() {
    this.activity = this.activityForm.value;
    let nextKey = this.activity.name.trim();
    this.activity.id = nextKey;
    this.activitydbService.setItem(nextKey, this.activity);
    console.warn(this.activityForm.value);
  }
}
