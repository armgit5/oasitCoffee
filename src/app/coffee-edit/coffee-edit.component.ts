import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFireDatabase } from 'angularfire2/database';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CategoryService } from '../coffees/category/category.service';
import * as firebase from 'firebase/app';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';
import { apiMethods } from '../../environments/environment';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from "aws-sdk/clients/s3";

@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit, OnDestroy {

  // http://raydaq.com/articles/resize-images-angular2
  // Image cropping
  name:string;
  private data1:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;
  imageUrl: string = '';
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  uploaded = false;

  @Input()
  isNew: boolean;
  @Input()
  inputId: string;

  @Output('hideModal')
  hideOutput = new EventEmitter();

  // private alreadyUploaded: boolean = false;
  private storageFolderName: string = 'images/';

  // Coffee
  coffeeForm: FormGroup;
  private coffeeId: string = '';
  private $subscription: Subscription;
  private coffee: Coffee;
  categories: any[];
  selectedCategory: string;
  private $categories: Subscription;
  types: any[];
  selectedType: string;
  private $types: Subscription;

  // Other
  spinning: boolean = false;
  notReady = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private db: AngularFireDatabase,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private categoryService: CategoryService,
              private loginService: LoginService) {

      // Initialize image cropping
      this.name = 'Angular2';
      this.cropperSettings1 = new CropperSettings();
      this.cropperSettings1.width = 400;
      this.cropperSettings1.height = 333;

      this.cropperSettings1.canvasWidth = 400;
      this.cropperSettings1.canvasHeight = 333;

      this.cropperSettings1.croppedWidth = 330;
      this.cropperSettings1.croppedHeight = 275;

      this.data1 = {};

      this.$categories = this.categoryService.loadCategories().subscribe(categories => {
            this.categories = categories;
      });

      this.$types = this.categoryService.loadTypes().subscribe(types => {
        this.types = types;
      });

      // for testing
      // const storageRef = firebaseApp.storage().ref().child('images/-KgsGiSv3bOdKv2Oc4221');
      // storageRef.getDownloadURL().then(url => console.log(url));
  }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    if (apiMethods.vWuth) {
      this.imageUrl = 'https://s3-ap-southeast-1.amazonaws.com/oasit/coffee330x275.jpg';
    } else {
      this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d';
    }
    this.isNew = true;
    this.initForm();

    this.$subscription = this.coffeeService.editCoffeeData.subscribe(
      (data: any) => {
        this.spinning = false;
        this.notReady = true;

       if (!data.isNew) {
          this.isNew = false;
          this.coffeeService.loadCoffee(data.coffeeId).subscribe(
            coffee => {
              this.coffee = coffee;
              this.imageUrl = coffee.url;
              this.selectedType = coffee.type;
              this.selectedCategory = coffee.category;
              this.notReady = false;
              this.initForm();
          });
       } else {
         this.isNew = true;
         // tslint:disable-next-line:max-line-length
         this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d';
         this.initForm();
       }
    });

  }

  private initForm() {
    let coffeeName = '';
    let price = null;
    let category = '';
    let type = '';

    // console.log(this.isNew);
    if (!this.isNew) {
      coffeeName = this.coffee.name;
      price = this.coffee.price;
      type = this.selectedType;
      category = this.selectedCategory;
    }

    this.coffeeForm = this.formBuilder.group({
      name: [coffeeName,  Validators.compose([Validators.required, Validators.maxLength(13)])],
      price: [price, Validators.compose([Validators.required, Validators.maxLength(5)])],
      category: [category, Validators.required],
      type: [type, Validators.required]
    });

  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
    this.uploaded = true;
    this.notReady = false;
    // console.log("cropped " + this.cropper);
    // console.log(!this.isNew, !this.uploaded, !(!this.isNew && !this.uploaded), this.spinning);
  }

  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        console.log('file changed ' + image);
    };

    myReader.readAsDataURL(file);
    console.log('file change ' + this.cropper);
  }

  // test() {
  //   console.log(this.imageUrl);
  // }

  createCoffee() {
    // console.log(this.coffeeForm.value);

    this.spinning = true;

    if (this.isNew) {
      if (apiMethods.v1) {
        this.db.list('coffees')
        .push(this.coffeeForm.value).then(item => {
                let coffeeId = item.key;
                let newImageKey = this.addOneToImageKey(coffeeId);
                this.addImageToStorage(coffeeId, this.data1.image, newImageKey, null);
              });
      }
      if (apiMethods.vCompanies) {
        // console.log(this.loginService.user);
        this.db.list(`/companies/${this.loginService.user.companyName}/coffees`)
        .push(this.coffeeForm.value).then(item => {
          let coffeeId = item.key;
          let newImageKey = this.addOneToImageKey(coffeeId);
          this.addImageToStorage(coffeeId, this.data1.image, newImageKey, null);
        });
      }

      if (apiMethods.vWuth) {
        let image = this.data1.image.split('base64,');
        let buf = new Buffer(image[1], 'base64');

        let AWSService = AWS;
        AWSService.config.region = '***';
        AWSService.config.accessKeyId = '***';
        AWSService.config.secretAccessKey = '***';
        let bucket = new AWSService.S3();
        let params = {Bucket: 'oasit/images', Key: 'key123.png', Body: buf};
        bucket.upload(params, function (err, data) {
            console.log('err ' + err);
            console.log(data);
        });

        // console.log(image[1]);
      }

    } else {
      console.log(this.spinning);
      this.updateCoffee();
    }

  }

  private updateCoffee() {;
    this.updateNameAndOthers(this.coffee.$key);
    if (this.data1.image !== undefined) {
      this.imageStorageInsert(this.data1.image, this.coffee.$key);
    }

    // let test = this.addOneToImageKey("-KgZQwY1d44h_vQXBgJNaNaN");
  }

  private imageStorageInsert(inputImage, $key) {

    if (apiMethods.v1) {
      firebase.database().ref(`coffees/${$key}`).once('value').then(snapshot => {
        let oldImageKey = snapshot.val().imageKey;
        let newImageKey = this.addOneToImageKey(oldImageKey);
        this.addImageToStorage($key, inputImage, newImageKey, oldImageKey);
      });
    }

    if (apiMethods.vCompanies) {
      firebase.database().ref(`/companies/${this.loginService.user.companyName}/coffees/${$key}`).once('value').then(snapshot => {
        let oldImageKey = snapshot.val().imageKey;
        let newImageKey = this.addOneToImageKey(oldImageKey);
        this.addImageToStorage($key, inputImage, newImageKey, oldImageKey);
      });
    }


  }

  private clearDataAndReturn() {
    this.notReady = true;
    this.cropper.reset();
    this.data1 = {};
    this.hideOutput.emit();
    this.uploaded = false;
    this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d';
    this.spinning = false;

}

private clearWhenNoImage() {
  this.spinning = false;
  this.notReady = true;
  if (this.data1.image === undefined) {
          this.hideOutput.emit();
  }
}

  private addOneToImageKey(oldImageKey): string {
    if (this.isNew) {
      return oldImageKey + 1;
    }
    let newNum = Number(oldImageKey.substr(oldImageKey.length-1)) + 1;
    let newImageKey = oldImageKey.slice(0, -1) + newNum;
    return newImageKey;
  }

  private addImageToStorage(coffeeId, inputImage, newImageKey, oldImageKey) {

    // add new image to storage
    let image = inputImage.split('base64,');

    if (apiMethods.vCompanies) {
      this.storageFolderName = `${this.loginService.user.companyName}/images/`;
    }

    console.log(coffeeId, image, newImageKey, oldImageKey, this.storageFolderName);
    let storageRef = firebase.storage().ref().child(this.storageFolderName + newImageKey);
    storageRef.putString(image[1], 'base64').then(snapshot => {

        // get imagedownload url
        let downloadURL = snapshot.downloadURL;
        this.imageUrl = downloadURL;
        console.log('successfully added an image and update key');

        // update and delete coffee $key
        if (!this.isNew) {
          this.deteleImageInStorage(oldImageKey);
        }
        this.updateImageKeyAndUrl(coffeeId, newImageKey, downloadURL);

    }).catch(error => {
        // Handle unsuccessful uploads
        console.log('error uploading');
        console.log(error);
    });
  }

  private updateImageKeyAndUrl(coffeeId, newImageKey, downloadURL) {

    if (apiMethods.v1) {
      this.db.object(`coffees/${coffeeId}`).update({
        imageKey: newImageKey,
        url: downloadURL
      })
      .then(() => this.clearDataAndReturn())
      .catch(error => {
          // Handle unsuccessful uploads
          console.log('error updating img key and url: ' + error);
      });
    }

    if (apiMethods.vCompanies) {
      this.db.object(`/companies/${this.loginService.user.companyName}/coffees/${coffeeId}`).update({
        imageKey: newImageKey,
        url: downloadURL
      })
      .then(() => this.clearDataAndReturn())
      .catch(error => {
          // Handle unsuccessful uploads
          console.log('error updating img key and url: ' + error);
      });
    }


  }

  private updateNameAndOthers(coffeeId) {
    if (apiMethods.v1) {
      this.db.object(`coffees/${coffeeId}`).update(this.coffeeForm.value).then(
        () => this.clearWhenNoImage()
      ).catch(error => {
        // Handle unsuccessful uploads
        console.log('error update name and others: ' + error);
      });
    }

    if (apiMethods.vCompanies) {
      this.db.object(`/companies/${this.loginService.user.companyName}/coffees/${coffeeId}`).update(this.coffeeForm.value).then(
        () => this.clearWhenNoImage()
      ).catch(error => {
        // Handle unsuccessful uploads
        console.log('error update name and others: ' + error);
      });
    }


  }

  private deteleImageInStorage(imageKey) {
    firebase.storage().ref().child(this.storageFolderName + imageKey)
      .delete().then(function() {
        // File deleted successfully
        console.log('successfully deleted the image');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('error deleting the image');
    });
  }

  ngOnDestroy() {
    console.log('on destroy');
    this.$subscription.unsubscribe();
    this.$categories.unsubscribe();
    this.$types.unsubscribe();
  }

}
