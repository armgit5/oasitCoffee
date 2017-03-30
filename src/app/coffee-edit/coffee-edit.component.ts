import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFire, FirebaseApp, FirebaseRef } from 'angularfire2';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit {

  // http://raydaq.com/articles/resize-images-angular2
  // Image cropping
  name:string;
  private data1:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;
  imageUrl: string = "";
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  // FirebaseApp
  private sdkDb: any;
  private storageRef: any;
  private firebaseApp: any;
  private $imageSub: any;
  private alreadyUploaded: boolean = false;
  private storageFolderName: string = "images/";

  // Coffee
  coffeeForm: FormGroup;
  private coffeeId: string = "";
  private subscription: Subscription;
  private coffee: Coffee;

  // other
  private isNew = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(FirebaseApp) firebaseApp: any,
              @Inject(FirebaseRef) fb) { 

      // Initialize image cropping
      this.name = 'Angular2'
      this.cropperSettings1 = new CropperSettings();
      this.cropperSettings1.width = 200;
      this.cropperSettings1.height = 200;

      this.cropperSettings1.croppedWidth = 350;
      this.cropperSettings1.croppedHeight = 350;

      this.cropperSettings1.canvasWidth = 500;
      this.cropperSettings1.canvasHeight = 300;

      this.data1 = {};

      this.firebaseApp = firebaseApp;
      this.sdkDb = fb.database();
  } 

  ngOnInit() {
    // Load coffee from firebase
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.coffeeService.loadCoffee(params['id']).subscribe(
            coffee => {
              this.coffee = coffee;
              this.initForm();

              // test downloading image from firebase
              console.log(this.coffee.$key);
              this.coffeeId = this.coffee.$key;

            }
          );
        } else {
          this.isNew = true;
        }
    });

  }

  private initForm() {
    if (!this.isNew) {
      this.coffeeForm = this.formBuilder.group({
        name: [this.coffee.name, Validators.required],
        imagePath: [this.coffee.url, Validators.required],
        price: [this.coffee.price, Validators.required]
      });
    }
    
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        console.log("file changed " + image);
    };

    myReader.readAsDataURL(file);
  }
  
  testUpload() {
    let image = this.data1.image.split("base64,");
    this.firebaseApp.storage().ref().child(this.storageFolderName + this.coffee.$key + 1)
        .putString(image[1], 'base64').then(snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        let downloadURL = snapshot.downloadURL;
        this.imageUrl = downloadURL;
        
        console.log("successfully added an image and update key");
        this.updateImageKey(this.coffee.$key + 1);

    }).catch(error => {
        // Handle unsuccessful uploads
        console.log("error uploading: " + error);
    });
  }

  upload() {
    console.log('submit');
    this.imageStorageInsert(this.data1.image, this.coffee.$key);
  }

  private imageStorageInsert(inputImage, $key) {

    this.alreadyUploaded = false;

    this.$imageSub = this.af.database.object('coffees/' + $key);
    this.$imageSub.subscribe(
      data => {
        if (!this.alreadyUploaded) {
            let oldImageKey = data.imageKey;
            let newImageKey = this.addOneToImageKey(oldImageKey);
            this.addImageToStorage(inputImage, newImageKey, oldImageKey);
        }
      }
    );

  // try one shot

  //  this.sdkDb.ref(`coffees/${$key}`).once('value').then(function(snapshot) {
  //     var oldImageKey = snapshot.val().imageKey;
  //     console.log("old key " + oldImageKey);
  //     var newImageKey = this.addOneToImageKey(oldImageKey);
  //     console.log("old key " + oldImageKey);
  //     // this.addImageToStorage(inputImage, newImageKey, oldImageKey, $key); 
  //   }
  //   );

  }

  private addOneToImageKey(oldImageKey): string {
    let newNum = Number(oldImageKey.substr(oldImageKey.length-1)) + 1;
    let newImageKey = oldImageKey.slice(0, -1) + newNum;
    return newImageKey;
    // console.log("add one " + oldImageKey);
    // return "";
  }

  private addImageToStorage(inputImage, newImageKey, oldImageKey) {
    let image = inputImage.split("base64,");
    this.firebaseApp.storage().ref().child(this.storageFolderName + newImageKey)
        .putString(image[1], 'base64').then(snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        let downloadURL = snapshot.downloadURL;
        this.imageUrl = downloadURL;
        
        this.alreadyUploaded = true;
        console.log("successfully added an image and update key");
        
        console.log("unsubscribe");

        // update and delete coffee $key
        this.updateImageKey(newImageKey);
        this.deteleImageInStorage(oldImageKey);

        // this.deteleImageInStorage(oldImageKey);
    }).catch(error => {
        // Handle unsuccessful uploads
        console.log("error uploading: " + error);
    });
  }

  private updateImageKey(newImageKey) {
     this.af.database.object(`coffees/${this.coffee.$key}`).update({
        imageKey: newImageKey
      });
  }

   private deteleImageInStorage(imageKey) {
    this.firebaseApp.storage().ref().child(this.storageFolderName + imageKey)
      .delete().then(function() {
        // File deleted successfully
        console.log("successfully deleted the image");
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log("error deleting the image");
      });;
  }

}
