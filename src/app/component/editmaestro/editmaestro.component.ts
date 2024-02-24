import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Constants } from 'src/app/constants';
import { Maestro } from 'src/app/models/maestro';


@Component({
  selector: 'app-editmaestro',
  templateUrl: './editmaestro.component.html',
  styleUrls: ['./editmaestro.component.css']
})


export class EditmaestroComponent implements OnInit {

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
        //id:'',
        fullName:['',[Validators.required,]],
        birthday:"2000-01-15",
        email:['',[Validators.required,]],
        password:['',[Validators.required,]]


    });


    this.router2.queryParams.subscribe(async (params:Params) =>{

        this.maestrorouted=params
        this.formu.get('id')?.setValue(this.maestrorouted.id);
        if(this.maestrorouted.id != undefined  && this.maestrorouted.id != null ){

          this.getMaestro(this.maestrorouted.id);
        }

    })


  }//end of init


  getMaestro(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"maestro"+'/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.datamaestro= res ;
              this.datamaestro=this.datamaestro['data'];
              this.updateform(this.datamaestro);



          },
          error:error=>console.log(error)

      
 
        // this.updateform(this.exs);
        
       } );
  }


  onSubmit(formudata:any){

    //console.log(formudata);

    if(this.maestrorouted.id !=undefined){     
      //console.log("not null patch no post");
      this.putmaestro(formudata,Number(this.maestrorouted.id))
  }else{
    this.postmaestro(formudata);
  }
  }


  postmaestro(customerData :any)
 {
  //console.log(customerData);
  
   this.http.post(Constants.URL+"RegistroP",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe({
    next: data =>
      {//console.log(data);
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

 putmaestro(customerData:any,idd: number)
 {  
   
   this.http.patch(Constants.URL+"maestro"+'/'+idd, customerData).subscribe(data =>
     {console.log(data);
       window.alert("Elemento modificado correctamente");
       //this.router.navigate(['/']);
      }, 
     error =>{ window.alert(" Modificación falló");console.log(error);}
     );
 }

 updateform(resp: any) {
  //console.log(res[0])
    let res= resp;//[0];

  this.formu.patchValue({
      //id: res.id,
      fullName: res.fullName,
      birthday: res.birthday,
      email: res.email,
      password:res.password

  })

  //console.log("end of patch");
}


}




