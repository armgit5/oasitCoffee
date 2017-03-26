import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFire, FirebaseApp } from 'angularfire2';
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
  name:string;
  data1:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;
  sdkDb: any;
  imageUrl: string;
  storageRef: any;
  firebaseApp: any;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  coffeeForm: FormGroup;
  private coffeeId: string = "";
  private subscription: Subscription;
  private coffee: Coffee;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(FirebaseApp) firebaseApp: any) { 

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

      this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/images%2F-KfgNGPXpr5QuABGbS8y?alt=media&token=19f88df4-a805-4c05-932a-7ab7bdd4b56d";
     
  } 

  ngOnInit() {
    // Load coffee from firebase
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.coffeeService.loadCoffee(params['id']).subscribe(
            coffee => {
              this.coffee = coffee;
              this.initForm();

              // test downloading image from firebase
              console.log(this.coffee.$key);
              this.coffeeId = this.coffee.$key;

              this.storageRef = this.firebaseApp.storage().ref().child('images/' + this.coffee.$key);
              this.storageRef.getDownloadURL().then(function(url) {
                console.log(url);
              });
            }
          );
        }
    });

  }

  private initForm() {
    this.coffeeForm = this.formBuilder.group({
      name: [this.coffee.name, Validators.required],
      imagePath: [this.coffee.url, Validators.required],
      price: [this.coffee.price, Validators.required]
    });
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
    // console.log("cropped " + this.data1.image);
    
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

  test() {
    console.log('submit');
    let test = this.data1.image.split("base64,");
    console.log(test[1]);
    var uploadTask = this.storageRef.putString(test[1], 'base64');

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
    });
  }


}
