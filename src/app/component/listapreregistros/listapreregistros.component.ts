import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-listapreregistros',
  templateUrl: './listapreregistros.component.html',
  styleUrls: ['./listapreregistros.component.css']
})
export class ListapreregistrosComponent implements OnInit {

  formu: FormGroup;
  datarouted:any;
  successdata:any;
  data:any;
  
  page: number=1;
  searchterm:string='';
  


  rowData: any[];
  gridApi: any;
  columnApi: any;




columnDefs = [{  field: 'name',sortable: false, filter:true, headerName:'Nombre ' },
              {field: 'phone',sortable: false, filter:true, headerName:'Telefono',},
              {field: 'email',sortable: false, filter:true, headerName:'Correo'},//unSortIcon: true},
              {field: 'created_at',sortable: false, filter:false,headerName:'Fecha', },
              {
                headerName: 'Button Col 1',
                cellRenderer: 'buttonRenderer',
                cellRendererParams: {
                  onClick: this.onButtonClick.bind(this),
                  label: 'Click'
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

    /*
    var defaultSortModel = [
      { colId: 'created_at', sort: 'asc', sortIndex: 0 },
      { colId: 'name', sort: 'asc', sortIndex: 1 },
    ];

    params.api.applyColumnState({ state: defaultSortModel });
    */

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










onButtonClick(e:any){
  console.log('button was clicked');
}



  constructor( private formBuilder: FormBuilder ,private router: Router,  private http :HttpClient,
    private router2: ActivatedRoute,) { }

  ngOnInit(): void {
    if(Constants.usertype!="Admin")this.router.navigate(['/'])
    this.getregistros();
  }
  
  getregistros(index: number=0) //check if number..
  { 
    this.http.get(Constants.URL+"preregistro").subscribe(
      {
          next: res=> {
              console.log(res);
              this.successdata = res;

              console.log(this.successdata['data']);

              this.successdata = this.successdata['data']
              this.data = this.successdata;
              console.log(this.successdata);
              //this.rowData = this.successdata;
              console.log(this.rowData);
              //this.displayAndDownloadImage(this.successdata.doc1, "doc1");
          },
          error:error=>console.log(error)
        // this.updateform(this.exs);
        
       } );
  }

  VerRegistro(reg: any) {
    
    this.router.navigate(['/VerPreRegistro'], { queryParams: { id: reg.id } });
  }

  displayAndDownloadImage(dataUrl: string, filename: string) {
    // Display the image
    const imgElement = document.getElementById('image') as HTMLImageElement;
    imgElement.src = dataUrl;

    // Set the download link
    const downloadLink = document.getElementById('download') as HTMLAnchorElement;
    downloadLink.href = dataUrl;
    downloadLink.download = filename;
}
}
