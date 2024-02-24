import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editcurso',
  templateUrl: './editcurso.component.html',
  styleUrls: ['./editcurso.component.css'],
 providers: [DatePipe]
})
export class EditcursoComponent implements OnInit {

  formu: FormGroup;
  datarouted: any;
  datacurso:any;
  successdata:any;

  maestros:any;
  maesid:Number;
  currentmae:any;


  
  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, private datepipe: DatePipe /*private alertService: AlertService*/ ) {   }

  ngOnInit(): void {

    if(Constants.usertype!="Admin")this.router.navigate(['/'])
 
    let today =  new Date();
    let todays = this.datepipe.transform(today, 'yyyy-MM-dd'); 

    this.formu = this.formBuilder.group({
     // id:'',
      name:['',[Validators.required,]],
     idmaestro:0,
      fechadeinicio:todays,
      fechadefinal:todays,
      namecarrera:'',
      periodo:'',
      namemaestro:'',//['',[Validators.required,]], //was gonna leave for inscripcion check but...

     



  });


  this.router2.queryParams.subscribe(async (params:Params) =>{

     
      this.datarouted=params
      //console.log(this.datarouted);
      this.formu.get('id')?.setValue(this.datarouted.id); //turns id value to somehting readable on mysql, other that nan or incompatible string/char maybe

      if(this.datarouted.id != undefined  && this.datarouted.id != null ){

        this.getCurso(this.datarouted.id);
        //this.updateform(this.datarouted);
      }

      this.getmaestros();

  })
  }

  getCurso(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"curso"+'/'+index).subscribe(
      {
          next: res=> {
              console.log(res);

              
              this.datacurso= res ;
              this.datacurso = this.datacurso['data']
              this.maesid = this.datacurso.idmaestro;

              //console.log(this.maesid)
              this.updateform(this.datacurso);



          },
          error:error=>console.log(error)

      
 
        // this.updateform(this.exs);
        
       } );
  }



  
  onSubmit(formudata:any){

    if(this.datarouted.id !=undefined){     
      //console.log("not null patch no post");
      this.putcurso(formudata,Number(this.datarouted.id))
  }else{
    //console.log(formudata)
    this.postcurso(formudata);


  }
  }


  postcurso(customerData :any)
 {
   //var data:Responsetype;
    //console.log(customerData);
  
   this.http.post(Constants.URL+"curso",customerData/*,  { headers: { Authorization:localStorage.getItem('token') } }*/).subscribe(
     {
      next: res=> {
        this.successdata= res;

        if(this.successdata['status']=='success'){

        window.alert("Elemento modificado correctamente");
        }else{
          //console.log(this.successdata)
          window.alert("  Registro falló");
        }
        //this.router.navigate(['/']);
       }, error:
      error =>{ window.alert("  Registro falló");
      console.log(error.error.message);}
       });
 }

 putcurso(customerData:any,idd: number)
 {  
    ///maestr 



   this.http.patch(Constants.URL+"curso"+'/'+idd, customerData).subscribe(
    {next: data =>
     {//console.log(data);
       window.alert("Elemento modificado correctamente");
       //this.router.navigate(['/']);
      }, error:
     error =>{ window.alert("  Registro falló");
     console.log(error.name);
     console.log(error);
        }
      });
  
    }

 updateform(resp: any) {
  //console.log(res[0])
    let curso= resp;//[0];

  this.formu.patchValue({
    id:curso.id,
    name:curso.name,
    fechadeinicio:curso.fechadeinicio,
    fechadefinal:curso.fechadefinal,
    namecarrera:curso.namecarrera,
    periodo:curso.periodo,
    idmaestro:curso.idmaestro,
    namemaestro:curso.namemaestro

  })

 // console.log("end of patch");
}


 getmaestros(){

  this.http.get(Constants.URL+"maestro").subscribe({

    next: res=>{
   
    this.maestros = res;
    this.maestros =this.maestros['data'];
    
  },error:error =>{ window.alert("Error de conexión");   //error.message);
  //console.log(error.error.message);
  window.alert(error.error.message)

  }
 });
  }

  onMaestroChange(event:any,value:any){

    //console.log(selected);
    console.log(value.id);
    console.log(value)
    console.log(value.fullName);
    this.formu.controls['idmaestro'].setValue(value.id)
    this.formu.controls['namemaestro'].setValue(value.fullName)
  }


  periodos = [
    '', 'I','II','III','IV','V','VI','VII','VIII','IX','X'
  ]

}
