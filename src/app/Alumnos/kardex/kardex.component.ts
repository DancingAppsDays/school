import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

  
formu: FormGroup;
  datarouted:any;
  data:any;
  
  page: number=1;
  searchterm:string='';
  
  
  constructor(    private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute, /*private alertService: AlertService*/ ) {   }
  
  
  
  
  
  
  
  ngOnInit(): void {

    if(Constants.usertype!="Student")this.router.navigate(['/'])
  
    //this should be taken from entity
    this.formu = this.formBuilder.group({
        id:'',
        fullName:['',[Validators.required,]],
        birthday:0
  
  
  
    });
    this.router2.queryParams.subscribe(async (params:Params) =>{
  
      this.datarouted=params

      this.formu.get('id')?.setValue(this.datarouted.id);


      ////////
      //this.datarouted.id = 5;

      if(this.datarouted.id != undefined  && this.datarouted.id != null ){
  
        //this.getAlumno(this.datarouted.id);
          this.showAlumno(this.datarouted);
      }
  
  })

      this.getCali(Constants.userId);// this.datarouted.id)  COMEs FROM SESSION ! !
  
  }//end of init
  
  showAlumno(contentdata:any){
    this.formu.patchValue({
      id: contentdata.id,
      fullName: contentdata.fullName
  })
  
  }
  
  getCali(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"inscrito"+'/alumno/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.data= res ;
             
  
  
  
          },
          error:error=>console.log(error)
  
      
  
        // this.updateform(this.exs);
        
       } );
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
