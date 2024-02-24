import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-listarclasesmaestro',
  templateUrl: './listarclasesmaestro.component.html',
  styleUrls: ['./listarclasesmaestro.component.css']
})
export class ListarclasesmaestroComponent implements OnInit {
 
  formu: FormGroup;
  datarouted:any;
  data:any;
  
  page: number=1;
  searchterm:string='';
  
  
  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }
  
  
  
  
  
  
  
  ngOnInit(): void {

    if(Constants.usertype!="Profesor")this.router.navigate(['/'])
  
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
  
        //this.getAlumno(this.datarouted.id);
          this.showAlumno(this.datarouted);
      }
  
  })
  //console.log(Constants.userid)
      this.getCurso(Constants.userId);// this.datarouted.id) COMEs FROM SESSION ! !
  
  }//end of init
  
  showAlumno(contentdata:any){
    this.formu.patchValue({
      id: contentdata.id,
      fullName: contentdata.fullName
  })
  
  }
  
  getCurso(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"curso"+'/maestro/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.data= res ;
              this.data = this.data['data'];
  
  
  
          },
          error:error=>console.log(error)
  
      
  
        // this.updateform(this.exs);
        
       } );
  }
  
  
  
  
  
  updateform(resp: any) {
  //console.log(res[0])
    let res= resp;//[0];
  
  this.formu.patchValue({
      id: res.id,
      fullName: res.fullName,
      birthday: res.birthday
  
  })
  
  console.log("end of patch");
  }
  
  calificarcurso(contentdata: any){
  
    console.log(contentdata);
    this.router.navigate(['CalificarClase'],{
      queryParams:{
        nombreprofesor:this.datarouted.name,
        idcurso:contentdata.id,
        namecurso:contentdata.name,
        fechadeinicio:contentdata.fechadeinicio,
        idmaestro:contentdata.idmaestro ,      
         namecarrera:contentdata.namecarrera,
         periodo:contentdata.periodo,        
       fechadefinal:contentdata.fechadefinal
      }
    })
  
  }

  Asistencia(contentdata: any){
  
    console.log(contentdata);
    this.router.navigate(['Asistencia'],{
      queryParams:{
        nombreprofesor:this.datarouted.name,
        idcurso:contentdata.id,
        namecurso:contentdata.name,
        fechadeinicio:contentdata.fechadeinicio,
        idmaestro:contentdata.idmaestro ,      
         namecarrera:contentdata.namecarrera,
         periodo:contentdata.periodo,        
       fechadefinal:contentdata.fechadefinal
      }
    })
  
  }
  
  
  }
