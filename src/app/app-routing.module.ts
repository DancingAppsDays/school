import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListamaestrosComponent } from './component/listamaestros/listamaestros.component';
import { EditmaestroComponent } from './component/editmaestro/editmaestro.component';
import { EditAlumnoComponent } from './Alumnos/edit-alumno/edit-alumno.component';
import { ListaAlumnoComponent } from './Alumnos/lista-alumno/lista-alumno.component';
import { InscribiralumnoComponent } from './component/inscribiralumno/inscribiralumno.component';
import { ListacursosComponent } from './listacursos/listacursos.component';
import { EditcursoComponent } from './component/editcurso/editcurso.component';
import { KardexComponent } from './Alumnos/kardex/kardex.component';
import { ListarclasesmaestroComponent } from './Maestro/listarclasesmaestro/listarclasesmaestro.component';
import { CalificarclasemaestroComponent } from './Maestro/calificarclasemaestro/calificarclasemaestro.component';
import { LoginComponent } from './login/login.component';
import { ListainscritoComponent } from './component/listainscrito/listainscrito.component';
import { RegistraradminComponent } from './component/registraradmin/registraradmin.component';
import { AsistenciaComponent } from './Maestro/asistencia/asistencia.component';
import { PreinscripdocComponent } from './Alumnos/preinscripdoc/preinscripdoc.component';


const routes: Routes = [

    {path: 'Login', component:LoginComponent},
    {path:'RegistrarAdmin',component:RegistraradminComponent},
  {path: 'ListaMaestro', component:ListamaestrosComponent},
  {path: 'EditMaestro', component:EditmaestroComponent},
  {path: 'EditAlumno', component:EditAlumnoComponent},
  {path: 'ListaAlumno', component:ListaAlumnoComponent},
  {path: 'InscribirAlumno',component:InscribiralumnoComponent},
  {path: 'ListaInscrito',component:ListainscritoComponent},

  {path: 'ListaCurso', component:ListacursosComponent},
  {path:'EditCurso',component:EditcursoComponent},

  {path:'KardexAlumno',component:KardexComponent},

  {path:'Preinscripdoc',component:PreinscripdocComponent},



  {path:'ListaClaseMaestro',component:ListarclasesmaestroComponent},
  {path:'CalificarClase',component:CalificarclasemaestroComponent},
  {path:'Asistencia',component:AsistenciaComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
