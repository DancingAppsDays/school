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

  

  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }

  





  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])

    //this should be taken from entity
    this.formu = this.formBuilder.group({
        id:'',
        fullName:['',[Validators.required,]],
        birthday:0,
        //bogus:0



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
              this.updateform(this.datamaestro);



          },
          error:error=>console.log(error)

      
 
        // this.updateform(this.exs);
        
       } );
  }


  onSubmit(formudata:any){

    console.log(formudata);

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
  
   this.http.post(Constants.URL+"maestro",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe(data =>
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
       console.log(error);
       window.alert("Error: Registro falló "+ error);
     }
   );
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
    let res= resp[0];

  this.formu.patchValue({
      id: res.id,
      fullName: res.fullName,
      birthday: res.birthday

  })

  //console.log("end of patch");
}


}




