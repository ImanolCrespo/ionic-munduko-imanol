import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ActivitycrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_Activity(record) {
    return this.firestore.collection('Activities').add(record);
  }

  read_Activities() {
    return this.firestore.collection('Activities').snapshotChanges();
  }

  update_Activity(recordID, record) {
    this.firestore.doc('Activities/' + recordID).update(record);
  }

  delete_Activity(record_id) {
    this.firestore.doc('Activities/' + record_id).delete();
  }
}