import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Coffee } from '../coffees/coffee';
import { AngularFire } from 'angularfire2';
import { CoffeeService } from '../coffees/coffee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-coffee-edit',
  templateUrl: './coffee-edit.component.html',
  styleUrls: ['./coffee-edit.component.css']
})
export class CoffeeEditComponent implements OnInit {

  // http://raydaq.com/articles/resize-images-angular2
  public file_srcs: string[] = [];

  coffeeForm: FormGroup;
  private subscription: Subscription;
  private coffee: Coffee;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private af: AngularFire,
              private coffeeService: CoffeeService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) { }

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

  // The next two lines are just to show the resize debug
  // they can be removed
  public debug_size_before: string[] = [];
  public debug_size_after: string[] = [];
  
  // This is called when the user selects new files from the upload button
  fileChange(input){
    this.readFiles(input.files);
  }
  
  readFile(file, reader, callback){
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }
    
    // Read the file
    reader.readAsDataURL(file);
  }
  
  readFiles(files, index=0){
    // Create the file reader
    let reader = new FileReader();
    
    // If there is a file
    if (index in files) {
      // Start reading this file
      this.readFile(files[index], reader, (result) =>{
        // Create an img element and add the image file data to it
        var img = document.createElement("img");
        img.src = result;
        
        // Send this img to the resize function (and wait for callback)
        this.resize(img, 250, 250, (resized_jpeg, before, after)=>{
          // For debugging (size in bytes before and after)
          this.debug_size_before.push(before);
          this.debug_size_after.push(after);

          // Add the resized jpeg img source to a list for preview
          // This is also the file you want to upload. (either as a
          // base64 string or img.src = resized_jpeg if you prefer a file). 
          this.file_srcs.push(resized_jpeg);
          
          // Read the next file;
          this.readFiles(files, index+1);
        });
      });
    }else{
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }

  
  resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      console.log("img loaded");
      // Get the images current width and height
      var width = img.width;
      var height = img.height;
      
      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
      } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
      }
      
      // create a canvas object
      var canvas = document.createElement("canvas");
    
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");  

      ctx.drawImage(img, 0, 0,  width, height); 
      
      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');
      
      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
  

  onSubmit() {
    console.log('submit');
  }


}
