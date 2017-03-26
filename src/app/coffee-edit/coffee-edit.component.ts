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
  image: string;

  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  coffeeForm: FormGroup;
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

      const storageRef = firebaseApp.storage().ref().child('image/6186.jpg');
      storageRef.getDownloadURL().then(url => {
        this.image = url;
        console.log(url);
      });
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
    console.log("cropped " + this.data1.image);
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

  onSubmit() {
    console.log('submit');
  }


}
