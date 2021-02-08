import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItemSliding, ToastController } from '@ionic/angular';
import { ActivitydbService } from '../core/activitydb.service';
import { IActivity } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  editedActivity: IActivity;
  public activity: IActivity;
  activityForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private activitydbService: ActivitydbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.activitydbService.getItem(this.id).then(
      (data:IActivity) => {
        this.activity = data
        this.activityForm.get('name').setValue(this.activity.name);
        this.activityForm.get('price').setValue(this.activity.price);
        this.activityForm.get('date').setValue(this.activity.date);
        this.activityForm.get('image').setValue(this.activity.image);
        this.activityForm.get('description').setValue(this.activity.description);
      }
    );
    this.activityForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      date: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });  
  }

  async onSubmit(id) {
    const toast = await this.toastController.create({
      header: 'Editar actividad',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editActivity();
            this.router.navigate(['home']);
          }
        },
        {
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

  editActivity() {  
    this.editedActivity = this.activityForm.value;
    let nextKey = this.activity.id.trim();
    this.editedActivity.id = nextKey;
    this.activitydbService.setItem(nextKey, this.editedActivity);
    console.warn(this.activityForm.value);
  }
}
