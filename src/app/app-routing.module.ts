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

const routes: Routes = [

    {path: 'Login', component:LoginComponent},
  {path: 'ListaMaestro', component:ListamaestrosComponent},
  {path: 'EditMaestro', component:EditmaestroComponent},
  {path: 'EditAlumno', component:EditAlumnoComponent},
  {path: 'ListaAlumno', component:ListaAlumnoComponent},
  {path: 'InscribirAlumno',component:InscribiralumnoComponent},
  {path: 'ListaInscrito',component:ListainscritoComponent},

  {path: 'ListaCurso', component:ListacursosComponent},
  {path:'EditCurso',component:EditcursoComponent},

  {path:'KardexAlumno',component:KardexComponent},
  {path:'ListaClaseMaestro',component:ListarclasesmaestroComponent},
  {path:'CalificarClase',component:CalificarclasemaestroComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
