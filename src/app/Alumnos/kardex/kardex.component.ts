import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

//import { AgGridAngular } from 'ag-grid-angular';

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
  


  rowData: any[];
  gridApi: any;
  columnApi: any;
 // private params:any;


  columnDefs2 = [
    {  field: 'idempleado',sortable: true, filter:true, resizable: true, width:74 },  //was "74px", pero al borrar rel=stylesheet en himl surgie esa warnin cellStyle: {color: 'red', 'background-color': 'green'}},
    {  field: 'nombre',sortable: true, filter:true, resizable: true ,cellClassRules:{   "ag-green": (params:any) =>{
      if(true) return{ background:'red' , color:'white' }    } }  //cellStyle: (params)=>{return 'test'}},// didnt work cellClass["ag-green","test"]},
  },
    {  field: 'edad',sortable: true, filter:'agNumberColumnFilter', width:111},
    
]


columnDefs = [{  field: 'namecurso',sortable: false, filter:true, headerName:'Nombre del curso' },
              {field: 'namecarrera',sortable: false, filter:true, headerName:'Nombre de la carrera',},
              {field: 'periodo',sortable: false, filter:true, headerName:'Periodo'},//unSortIcon: true},
              {field: 'calificacion',sortable: false, filter:false,headerName:'Calificacion', cellClassRules: {
                // apply red to fail
                'rag-green-outer': (params:any) => params.value < 7,
               
            },cellStyle: (params:any) => {
              if (params.value < 7 && params.value != undefined ) {
                 
                  return {color: 'white', backgroundColor: 'red'};
              }
              return null;
          }
          
          }
]




gridOptions= {

  rowData:[],
  columnDefs: this.columnDefs,

  pagination: true,
  //rowSelection: 'single', //causes error, is docu proper //https://www.ag-grid.com/angular-data-grid/grid-options/
  rowDragManaged:true,
  animateRows:true,

  rowStyle: { background: 'white' },

  onGridReady : (params:any) =>{

    var defaultSortModel = [
      { colId: 'namecarrera', sort: 'asc', sortIndex: 0 },
      { colId: 'periodo', sort: 'asc', sortIndex: 1 },
    ];

    params.api.applyColumnState({ state: defaultSortModel });


    console.log('The grid is now ready')
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

  },
  getRowStyle : (params:any)=>{
    if(params.node.rowIndex % 2 ===0){
    return{background:'lightgray'}
    }else {return{background: 'white'}
  }
  },  
  rowClassRules: {
    "ag-green": '12 < 20',
    'ag-amber': 'data.imcsignos >= 20 && data.imcsignos < 25',
    'ag-red': 'data.calificacion < 7',
    
}
}










  
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

      this.getCaliag(Constants.userId);// this.datarouted.id)  COMEs FROM SESSION ! !
  



     // fetch(Constants.URL+"inscrito"+'/alumno/'+Constants.userId)//'https://www.ag-grid.com/example-assets/small-row-data.json')
      //.then(result => result.json())
      //.then(result=>{console.log(result)})
      
      //.then(rowData => this.rowData = rowData);
      //.then(this.gridOptions.sizeColumnsToFit())
      //.then(som =>console.log(this.rowData));







  }//end of init
  
  showAlumno(contentdata:any){
    this.formu.patchValue({
      id: contentdata.id,
      fullName: contentdata.fullName
  })
  
  }


  getCaliag(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"inscrito"+'/alumno/'+index).subscribe(
      {
          next: res=> {
            
            console.log(res);
             
              this.data= res ;
             this.data = this.data['data']
             console.log(this.data)
            // this.data = JSON.stringify(this.data);
             
             //console.log(this.data)
             this.rowData = this.data
  
  
          },
          error:error=>console.log(error)
  
      
  
        // this.updateform(this.exs);
        
       } );
  }
  
  getCali(index: number) //check if number..
  { 
    this.http.get(Constants.URL+"inscrito"+'/alumno/'+index).subscribe(
      {
          next: res=> {
              console.log(res);
             
              this.data= res ;
             this.data = this.data['data']
  
  
  
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
