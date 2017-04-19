import { Component, OnInit, ChangeDetectorRef, ViewChild, Inject, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFire, FirebaseApp, FirebaseRef } from 'angularfire2';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CategoryService } from '../coffees/category/category.service';

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
  imageUrl: string = "";
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
  uploaded = false;

  @Input() 
  isNew: boolean;
  @Input() 
  inputId: string;  

  @Output("hideModal")
  hideOutput = new EventEmitter();

  // FirebaseApp
  private sdkDb: any;
  private storageRef: any;
  private firebaseApp: any;
  // private alreadyUploaded: boolean = false;
  private storageFolderName: string = "images/";

  // Coffee
  coffeeForm: FormGroup;
  private coffeeId: string = "";
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
 
  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private categoryService: CategoryService,
              @Inject(FirebaseApp) firebaseApp: any,
              @Inject(FirebaseRef) fb) { 

      // Initialize image cropping
      this.name = 'Angular2'
      this.cropperSettings1 = new CropperSettings();
      this.cropperSettings1.width = 400;
      this.cropperSettings1.height = 333;

      this.cropperSettings1.canvasWidth = 400;
      this.cropperSettings1.canvasHeight = 333;

      this.cropperSettings1.croppedWidth = 240;
      this.cropperSettings1.croppedHeight = 200;

      this.data1 = {};

      this.firebaseApp = firebaseApp;
      this.sdkDb = fb.database();

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
    // Load coffee from firebase
    // this.$subscription = this.route.params.subscribe(
    //   (params: any) => {
    //     if (params.hasOwnProperty('id')) {
    //       this.isNew = false;
    //       this.coffeeService.loadCoffee(params['id']).subscribe(
    //         coffee => {
    //           this.coffee = coffee;
    //           this.imageUrl = coffee.url;
    //           this.initForm();
    //         });
    //     } else {
    //       this.isNew = true;
    //       this.initForm();
    //     }
    // });

    console.log("on init");

    this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d";
    this.isNew = true;
    this.initForm();

    this.$subscription = this.coffeeService.editCoffeeData.subscribe(
      (data: any) => {
       if (!data.isNew) {
          this.isNew = false;
          this.coffeeService.loadCoffee(data.coffeeId).subscribe(
            coffee => {
              this.coffee = coffee;
              this.imageUrl = coffee.url;
              this.selectedType = coffee.type;
              this.selectedCategory = coffee.category;
              // console.log(this.imageUrl);
              this.initForm();
          });
       } else {        
         this.isNew = true;
         this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d";
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
      name: [coffeeName, Validators.required],
      price: [price, Validators.required],
      category: [category, Validators.required],
      type: [type]
    });
    
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
    this.uploaded = true;
    console.log("cropped " + this.cropper);
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
    console.log("file change " + this.cropper);
  }

  // test() {
  //   console.log(this.imageUrl);
  // }

  createCoffee() {
    console.log(this.coffeeForm.value);

    this.spinning = true;

    if (this.isNew) {
      this.sdkDb.ref().child("coffees")
        .push(this.coffeeForm.value).then(item => {
                let coffeeId = item.key;  
                let newImageKey = this.addOneToImageKey(coffeeId);
                this.addImageToStorage(coffeeId, this.data1.image, newImageKey, null);
              });
    } else {
      this.updateCoffee();
    }
    
  }

  private updateCoffee() {
    console.log('edit');
    this.updateNameAndOthers(this.coffee.$key);
    if (this.data1.image != undefined) {
      this.imageStorageInsert(this.data1.image, this.coffee.$key);
    }

    // let test = this.addOneToImageKey("-KgZQwY1d44h_vQXBgJNaNaN");
  }

  private imageStorageInsert(inputImage, $key) {

   this.sdkDb.ref(`coffees/${$key}`).once('value').then(snapshot => {
      let oldImageKey = snapshot.val().imageKey;     
      let newImageKey = this.addOneToImageKey(oldImageKey);
      this.addImageToStorage($key, inputImage, newImageKey, oldImageKey); 
    });

  }

  private clearDataAndReturn() {
    if (!this.isNew) {
      if (this.data1.image == undefined) {
          this.hideOutput.emit();
        }
    } else {
      this.cropper.reset();
      this.data1 = {};
      this.hideOutput.emit();
      this.uploaded = false;
      this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/oasit-b6bc8.appspot.com/o/cup-of-black-coffee1.jpg?alt=media&token=94afc335-0a25-4956-aea8-6d1fe140b65d";
      this.spinning = false;
    }
    this.spinning = false;
    
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
    let image = inputImage.split("base64,");
    console.log(coffeeId, image, newImageKey, oldImageKey, this.storageFolderName);
    let storageRef = this.firebaseApp.storage().ref().child(this.storageFolderName + newImageKey);
    storageRef.putString(image[1], 'base64').then(snapshot => {

        // get imagedownload url
        let downloadURL = snapshot.downloadURL;
        this.imageUrl = downloadURL;
        console.log("successfully added an image and update key");

        // update and delete coffee $key
        if (!this.isNew) {
          this.deteleImageInStorage(oldImageKey);
        } 
        this.updateImageKeyAndUrl(coffeeId, newImageKey, downloadURL);

    }).catch(error => {
        // Handle unsuccessful uploads
        console.log("error uploading: " + error);
    });
  }

  private updateImageKeyAndUrl(coffeeId, newImageKey, downloadURL) {
     this.af.database.object(`coffees/${coffeeId}`).update({
        imageKey: newImageKey,
        url: downloadURL
      }).catch(error => {
          // Handle unsuccessful uploads
          console.log("error updating img key and url: " + error);
      });
      this.clearDataAndReturn();
  }

  private updateNameAndOthers(coffeeId) {
     this.af.database.object(`coffees/${coffeeId}`).update(this.coffeeForm.value)
        .catch(error => {
          // Handle unsuccessful uploads
          console.log("error update name and others: " + error);
        });
        this.clearDataAndReturn();
  }

  private deteleImageInStorage(imageKey) {
    this.firebaseApp.storage().ref().child(this.storageFolderName + imageKey)
      .delete().then(function() {
        // File deleted successfully
        console.log("successfully deleted the image");
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log("error deleting the image");
    });
  }

  ngOnDestroy() {
    console.log('on destroy');
    this.$subscription.unsubscribe();
    this.$categories.unsubscribe();
    this.$types.unsubscribe();
  }

}
