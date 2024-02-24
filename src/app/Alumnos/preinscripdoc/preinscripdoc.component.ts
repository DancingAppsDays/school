import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preinscripdoc',
  templateUrl: './preinscripdoc.component.html',
  styleUrls: ['./preinscripdoc.component.css']
})
export class PreinscripdocComponent implements OnInit {

  constructor( private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute,) { }

  formu: FormGroup;
  file: File | null = null;

  ngOnInit(): void {

    this.formu = this.formBuilder.group({    
      doc1:new FormControl(null),
       doc2:'',
     })
  }

  //maxSize = 800000; // mediumblob is 16mb,, so 8mb 

  maxSize= 2000000;//2mb

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      console.log((reader.result! as string).length);
     
      if ((reader.result! as string).length > this.maxSize) {
        console.log('File is too large.');
        return;
        
      }

        this.formu.patchValue({doc1: reader.result});
        //console.log(reader.result);
    };
}

  onSubmit() {

  }
   
}
