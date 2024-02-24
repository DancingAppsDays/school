import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.css']
})
export class EditAlumnoComponent implements OnInit {

  formu: FormGroup;
  datarouted:any;
  dataalumno:any;
  successdata:any;


  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }

  





  ngOnInit(): void {

   // if(Constants.usertype!="Admin")this.router.navigate(['/'])

    //this should be taken from entity
    this.formu = this.formBuilder.group({
        //id:'',
        fullName:['',[Validators.required,]],
        birthday:"2000-01-15",
        email:['',[Validators.required,]],
        password:['',[Validators.required,]]



    });
    this.router2.queryParams.subscribe(async (params:Params) =>{

      this.datarouted=params
      console.log(this.datarouted);
      this.formu.get('id')?.setValue(this.datarouted.id); //FUcking important? ? ? 
      if(this.datarouted.id != undefined  && this.datarouted.id != null ){

        this.getAlumno(this.datarouted.id);
      }

  })


}//end of init


getAlumno(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"alumno"+'/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.dataalumno= res ;
              this.dataalumno = this.dataalumno['data']
              //console.log(this.dataalumno)
              this.updateform(this.dataalumno);



          },
          error:error=>console.log(error)

      
 
        // this.updateform(this.exs);
        
       } );
  }


  onSubmit(formudata:any){

    if(this.datarouted.id !=undefined){     
      //console.log("not null patch no post");
      this.putmaestro(formudata,Number(this.datarouted.id))
  }else{
    this.postmaestro(formudata);
  }
  }


  postmaestro(customerData :any)
 {
  //var data:Responsetype;
 
  
   this.http.post(Constants.URL+"RegistroA",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe({
    next: data =>
      {//console.log(data);
        //window.alert("Elemento modificado correctamente");
        //this.router.navigate(['/']);
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
      console.log(error);}
       });
   
     }

 putmaestro(customerData:any,idd: number)
 {  
   
   this.http.patch(Constants.URL+"alumno"+'/'+idd, customerData).subscribe(data =>
     {console.log(data);
       window.alert("Elemento modificado correctamente");
       //this.router.navigate(['/']);
      }, 
     error =>{ window.alert(" Modificación falló");console.log(error);}
     );
 }

 updateform(resp: any) {
  //console.log(res[0])
    let res= resp;

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