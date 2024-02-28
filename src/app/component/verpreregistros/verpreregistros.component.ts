import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-verpreregistros',
  templateUrl: './verpreregistros.component.html',
  styleUrls: ['./verpreregistros.component.css']
})
export class VerpreregistrosComponent implements OnInit {


  formu: FormGroup;
  datarouted: any;
  data:any;
  successdata:any;

  constructor( private formBuilder: FormBuilder,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, ) { }

  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/']);

    this.formu = this.formBuilder.group({
      // id:'',
       name:'',
      phone:'',
      email:'',
    });


    this.router2.queryParams.subscribe(async (params:Params) =>{

      //this.maestrorouted=params
      //this.formu.get('id')?.setValue(this.maestrorouted.id);
      if(params['id'] != undefined  && params['id'] != null ){

        this.getReg(params['id']);
      }

  })
  }

  
getReg(index: number) //check if number..
{ 
  this.http.get(Constants.URL+"PreRegistro"+'/'+index).subscribe(
    {
        next: res=> {
            console.log(res);
           
            this.data= res ;
            this.data = this.data['data'];
           // this.dataalumno = this.dataalumno['data']
            //console.log(this.dataalumno)
            this.showReg(this.data);



        },
        error:error=>console.log(error)

    

      // this.updateform(this.exs);
      
     } );
}


showReg(data:any){
  this.formu.patchValue({
    
    name:data.name,
   phone:data.phone,
    email:data.email,
  });

  this.displayAndDownloadImage(data.curp, data.name+"_"+"curp");
  this.displayAndDownloadImage2(data.ine, data.name+"_"+"ine");
  this.displayAndDownloadFile1(data.carta, data.name+"_"+"carta");
  this.displayAndDownloadFile2(data.cv, data.name+"_"+"cv");
}

  displayAndDownloadImage(dataUrl: string, filename: string) {
    // Display the image
    const imgElement = document.getElementById('image1') as HTMLImageElement;
    imgElement.src = dataUrl;

    // Set the download link
    const downloadLink = document.getElementById('download1') as HTMLAnchorElement;
    downloadLink.href = dataUrl;
    downloadLink.download = filename;
}

displayAndDownloadImage2(dataUrl: string, filename: string) {
  // Display the image
  const imgElement = document.getElementById('image2') as HTMLImageElement;
  imgElement.src = dataUrl;

  // Set the download link
  const downloadLink = document.getElementById('download2') as HTMLAnchorElement;
  downloadLink.href = dataUrl;
  downloadLink.download = filename;
}

displayAndDownloadFile1(dataUrl: string, filename: string) {
  // Display the image
 // const imgElement = document.getElementById('image1') as HTMLImageElement;
  //imgElement.src = dataUrl;

  // Set the download link
  const downloadLink = document.getElementById('download3') as HTMLAnchorElement;
  downloadLink.href = dataUrl;
  downloadLink.download = filename;
}
displayAndDownloadFile2(dataUrl: string, filename: string) {
  // Display the image
 // const imgElement = document.getElementById('image1') as HTMLImageElement;
  //imgElement.src = dataUrl;

  // Set the download link
  const downloadLink = document.getElementById('download4') as HTMLAnchorElement;
  downloadLink.href = dataUrl;
  downloadLink.download = filename;
}




}
