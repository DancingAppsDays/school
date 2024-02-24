import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-inscribiralumno',
  templateUrl: './inscribiralumno.component.html',
  styleUrls: ['./inscribiralumno.component.css']
})
export class InscribiralumnoComponent implements OnInit {

 
formu: FormGroup;
datarouted:any;
data:any;

page: number=1;
searchterm:string='';


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
    this.formu.get('id')?.setValue(this.datarouted.id);
    if(this.datarouted.id != undefined  && this.datarouted.id != null ){

      this.getcurso(); 
        this.showAlumno(this.datarouted);

       
    }

})


}//end of init

showAlumno(contentdata:any){

   
  this.formu.patchValue({
    id: contentdata.id,
    fullName: contentdata.nombre
})

}

getcurso() //check if number..
{ 
  this.http.get(Constants.URL+"curso").subscribe({
      
    next: res=> {
      console.log(res);       
      this.data= res ;  
      this.data = this.data['data']
  },
  error:error=>{
    console.log(error);
    window.alert("Falla de conexión: " + error.name);
    
  }
  });
}





postinscripcion(customerData :any)
{
  console.log(customerData);
 
  customerData.idcurso = customerData.id;
  customerData.namecurso =customerData.name;
  
  customerData.idalumno = this.datarouted.id;
  customerData.namealumno = this.datarouted.nombre;
  
   //customerData.id = 99;         //this modifies list values... not separarted object??      //DEBUGGIN

  let newdata = structuredClone(customerData);
  newdata.id=0;
 
  console.log(newdata)
   
  this.http.post(Constants.URL+"inscrito",newdata).subscribe({
      
  next: res=> {
    console.log(res);  
    window.alert("Inscripcion realizada: ");    
    
    console.log(this.data)

    this.data.forEach((element:any,index:number) => {
      console.log(element);
      if(element.id ==customerData.idcurso){

        console.log("conincidio" + element.id +" con  " + customerData.idcurso)
        this.data.splice(index,1);
       //this.data.delete[index];
      }
    });
    console.log(this.data)

    //this.data= res ;  
},
error:error=>{
  console.log(error);
  window.alert("Falla de conexión: " + error.name);
  
}
});
}
/*
putmaestro(customerData:any,idd: number)
{  
 
 this.http.patch(Constants.URL+"maestro"+'/'+idd, customerData).subscribe(data =>
   {console.log(data);
     window.alert("Elemento modificado correctamente");
     //this.router.navigate(['/']);
    }, 
   error =>{ window.alert(" Modificación falló");console.log(error);}
   );
}*/

updateform(resp: any) {
//console.log(res[0])
  let res= resp;

this.formu.patchValue({
    id: res.id,
    fullName: res.fullName,
    //birthday: res.birthday

})

}

inscribircurso(contentdata: any){

  if(contentdata.namemaestro == '' || contentdata.namemaestro == null || contentdata.namemaestro == undefined ){

    window.alert("Se necesita definir un maestro para el curso, edita este curso ");  
    return;  
  }
  contentdata.asistencia="0"; //stops heavy bugs at maestro asistencias
  //console.log(contentdata);
  this.postinscripcion(contentdata);

}


}