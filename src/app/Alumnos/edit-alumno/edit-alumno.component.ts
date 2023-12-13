import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.css']
})
export class EditAlumnoComponent implements OnInit {

  formu: FormGroup;
  datarouted:any;
  dataalumno:any;


  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }

  





  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])

    //this should be taken from entity
    this.formu = this.formBuilder.group({
        id:'',
        fullName:['',[Validators.required,]],
        birthday:0



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
 
  
   this.http.post(Constants.URL+"alumno",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe(data =>
     {
       let response : any = data;

       console.log(response);
       /*
       if(response["data"] == "success"){

       console.log(response);
     window.alert(response['mensaje']);   //debe decir agregadooo
     this.router.navigate(['/']);}
     else{

       window.alert(response['mensaje']  + "  Registro falló");// + '    No autorizado');
       //this.router.navigate(['/']);

     }*/
    }, 
     error =>{
       console.log(error.error.name);
       window.alert("Error: Registro falló "+ error.error.name);
     }
   );
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
    let res= resp[0];

  this.formu.patchValue({
      id: res.id,
      fullName: res.fullName,
      birthday: res.birthday

  })

  //console.log("end of patch");
}


}