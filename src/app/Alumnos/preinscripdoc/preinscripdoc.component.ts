import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

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

  successdata:any;

  doc1note:string;
  doc2note:string;
  doc3note:string;
  doc4note:string;

  image1bool:boolean=false;
  image2bool:boolean=false;
  

  ngOnInit(): void {

    this.formu = this.formBuilder.group({    
      name:['',[Validators.required,]],
      phone:['',[Validators.required,]],
      email:['',[Validators.required,]],
      curp:['',[Validators.required,]],
       ine:['',[Validators.required,]],
       carta:['',[Validators.required,]],
       cv:['',[Validators.required,]],
     })
  }

  //maxSize = 800000; // mediumblob is 16mb,, so 8mb 

  maxSize= 2000000;//2mb

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

// Check file type
const fileType = file.type;
if (fileType !== 'application/pdf' && fileType !== 'image/jpeg' && fileType !== 'image/png') {
  console.log('Invalid file type. Only PDF, JPEG, and PNG files are allowed.');
  this.doc1note = 'Tipo de archivo inválido. Solo se permiten archivos PDF, JPEG y PNG.';
  return;
}
    this.image1bool=true;
    reader.readAsDataURL(file);
    reader.onload = () => {

      console.log((reader.result! as string).length);




     
      if ((reader.result! as string).length > this.maxSize) {
        this.doc1note = 'Archivo demasiado grande';
        console.log('File is too large.');
        return;        
      }else{
        
        const imgElement = document.getElementById('doc1image') as HTMLImageElement;
        imgElement.src = reader.result as string;
        
      


        this.doc1note = 'Archivo cargado';
      }

        this.formu.patchValue({curp: reader.result});
        //console.log(reader.result);
    };
}



handleUpload2(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

 // Check file type
 const fileType = file.type;
 if (fileType !== 'application/pdf' && fileType !== 'image/jpeg' && fileType !== 'image/png') {
   console.log('Invalid file type. Only PDF, JPEG, and PNG files are allowed.');
   this.doc2note = 'Tipo de archivo inválido. Solo se permiten archivos PDF, JPEG y PNG.';
   return;
 }

  this.image2bool=true;
  reader.readAsDataURL(file);
  reader.onload = () => {

    console.log((reader.result! as string).length);
   
    if ((reader.result! as string).length > this.maxSize) {
      console.log('File is too large.');
      this.doc2note = 'Archivo demasiado grande';
      return;
      
    }else{
      
      const imgElement = document.getElementById('doc2image') as HTMLImageElement;
      imgElement.src = reader.result as string;
      

      this.doc2note = 'Archivo cargado';
    }

      this.formu.patchValue({ine: reader.result});
      //console.log(reader.result);
  };
}

handleUpload3(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

 // Check file type
 const fileType = file.type;
 if (fileType !== 'application/pdf' && fileType !== 'application/msword' && fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
   console.log('Invalid file type. Only PDF and DOC files are allowed.');
   this.doc3note = 'Tipo de archivo inválido. Solo se permiten archivos PDF y DOC.';
   return;
 }
 

  reader.readAsDataURL(file);
  reader.onload = () => {

    console.log((reader.result! as string).length);
   
    if ((reader.result! as string).length > this.maxSize) {
      console.log('File is too large.');
      this.doc3note = 'Archivo demasiado grande';
      return;
      
    }else{
      /*
       // Set the download link
       const downloadLink = document.getElementById('doc3download') as HTMLAnchorElement;
       downloadLink.href = reader.result as string;
       downloadLink.download = file.name;*/

      this.doc3note = 'Archivo cargado';
    }

      this.formu.patchValue({carta: reader.result});
      //console.log(reader.result);
  };
}

handleUpload4(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

 // Check file type
 const fileType = file.type;
 if (fileType !== 'application/pdf' && fileType !== 'application/msword' && fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
   console.log('Invalid file type. Only PDF and DOC files are allowed.');
   this.doc4note = 'Tipo de archivo inválido. Solo se permiten archivos PDF y DOC.';
   return;
 }
 

  reader.readAsDataURL(file);
  reader.onload = () => {

    console.log((reader.result! as string).length);
   
    if ((reader.result! as string).length > this.maxSize) {
      console.log('File is too large.');
      this.doc4note = 'Archivo demasiado grande';
      return;
      
    }else{
      this.doc4note = 'Archivo cargado';
    }

      this.formu.patchValue({cv: reader.result});
      //console.log(reader.result);
  };
}

  onSubmit() {
    console.log(this.formu.value);
    console.log(this.formu.get('cv')?.value);
    console.log(this.formu.get('carta')?.value);
    this.http.post(Constants.URL +'preregistro',this.formu.value).subscribe(
      {
          next: res=> {
              console.log(res);
              this.successdata= res;

              if(this.successdata['status']=='success'){
      
              window.alert("Elemento modificado correctamente");
              }else{
                //console.log(this.successdata)
                window.alert("  Registro falló");
              }
              this.router.navigate(['/'])
          },
          error:error=>{console.log(error);
            window.alert("Falla de conexión: ");// + error.error.name);

          }
      }
    );
  }

   
}
