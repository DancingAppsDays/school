import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListacursosComponent } from './listacursos/listacursos.component';
import { ListamaestrosComponent } from './component/listamaestros/listamaestros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
//import { Ng2SearchPipeModule } from 'ng2-search-filter'; //ivy problem made custom filterpipe
import { FilterPipePipe } from './filter-pipe.pipe';

import { AuthinterceptService } from './service/authintercept.service';



//import {GridComp} from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ListaAlumnoComponent } from './Alumnos/lista-alumno/lista-alumno.component';
import { EditAlumnoComponent } from './Alumnos/edit-alumno/edit-alumno.component';
import { EditmaestroComponent } from './component/editmaestro/editmaestro.component';
import { EditcursoComponent } from './component/editcurso/editcurso.component';
import { InscribiralumnoComponent } from './component/inscribiralumno/inscribiralumno.component';
import { KardexComponent } from './Alumnos/kardex/kardex.component';
import { ListarclasesmaestroComponent } from './Maestro/listarclasesmaestro/listarclasesmaestro.component';
import { CalificarclasemaestroComponent } from './Maestro/calificarclasemaestro/calificarclasemaestro.component';
import { RegistraradminComponent } from './component/registraradmin/registraradmin.component';
import { ListainscritoComponent } from './component/listainscrito/listainscrito.component';
import { AsistenciaComponent } from './Maestro/asistencia/asistencia.component';
import { PreinscripdocComponent } from './Alumnos/preinscripdoc/preinscripdoc.component';
import { ListapreregistrosComponent } from './component/listapreregistros/listapreregistros.component';
import { VerpreregistrosComponent } from './component/verpreregistros/verpreregistros.component';


//import {AggridModule} from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListacursosComponent,
    ListamaestrosComponent,
    FilterPipePipe,
    ListaAlumnoComponent,
    EditAlumnoComponent,
    EditmaestroComponent,
    EditcursoComponent,
    InscribiralumnoComponent,
    KardexComponent,
    ListarclasesmaestroComponent,
    CalificarclasemaestroComponent,
    RegistraradminComponent,
    ListainscritoComponent,
    AsistenciaComponent,
    PreinscripdocComponent,
    ListapreregistrosComponent,
    VerpreregistrosComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    
    //Ng2SearchPipeModule,//USED CUSTOM...
    HttpClientModule,

    AgGridModule
    
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptService,
      multi:true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
