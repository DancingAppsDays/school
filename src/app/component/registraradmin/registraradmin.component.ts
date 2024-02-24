import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-registraradmin',
  templateUrl: './registraradmin.component.html',
  styleUrls: ['./registraradmin.component.css']
})
export class RegistraradminComponent implements OnInit {

  formu: FormGroup;
  maestrorouted:any;
  datamaestro:any;
  successdata:any;
  

  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }

  





  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])

    //this should be taken from entity
    this.formu = this.formBuilder.group({
        
        username:['',[Validators.required,]],
        email:['',[Validators.required,]],
        password:['',[Validators.required,]]
      
    });

    /*
    this.router2.queryParams.subscribe(async (params:Params) =>{

        this.maestrorouted=params
        this.formu.get('id')?.setValue(this.maestrorouted.id);
        if(this.maestrorouted.id != undefined  && this.maestrorouted.id != null ){

          this.getMaestro(this.maestrorouted.id);
        }

    })*/


  }//end of init


  getMaestro(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"users"+'/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.datamaestro= res ;
              this.datamaestro= this.datamaestro['data']
              this.updateform(this.datamaestro);



          },
          error:error=>console.log(error)

      
 
        // this.updateform(this.exs);
        
       } );
  }


  onSubmit(formudata:any){

   
  
    this.postmaestro(formudata);
  
  }


  postmaestro(customerData :any)
 {
  //console.log(customerData);
  
   this.http.post(Constants.URL+"Registro",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe({

    next:data=>
     {
      this.successdata= data;

      if(this.successdata['status']=='success'){

      window.alert("Elemento modificado correctamente");
      }else{
        //console.log(this.successdata)
        window.alert("  Registro falló, revisa que el correo no sea repetido");
      }
      //this.router.navigate(['/']);
     }, error:
    error =>{ window.alert("  Registro falló");
    console.log(error.error.message);}
     });
     
   
 }


 updateform(resp: any) {
  //console.log(res[0])
    let res= resp;//[0];

  this.formu.patchValue({
      id: res.id,
      fullName: res.fullName,
      birthday: res.birthday

  })

  //console.log("end of patch");
}


}




