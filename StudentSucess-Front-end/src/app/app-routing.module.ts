import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaginaPerguntasComponent } from './components/pagina-perguntas/pagina-perguntas.component';
import { NovoAlunoComponent } from './components/aluno/novo-aluno/novo-aluno.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAlunoComponent } from './components/aluno/list-aluno/list-aluno.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditAlunoComponent } from './components/aluno/edit-aluno/edit-aluno.component'
import { InfoAlunoComponent } from './components/aluno/info-aluno/info-aluno.component';
import { DelAlunoComponent } from './components/aluno/del-aluno/del-aluno.component';
import { ListEmpresaComponent } from './components/empresa/list-empresa/list-empresa.component';
import { EditEmpresaComponent } from './components/empresa/edit-empresa/edit-empresa.component'
import { NovaEmpresaComponent } from './components/empresa/nova-empresa/nova-empresa.component'
import { InfoEmpresaComponent } from './components/empresa/info-empresa/info-empresa.component';
import { DelEmpresaComponent } from './components/empresa/del-empresa/del-empresa.component';
import { NovoFormularioComponent } from './components/formulario/novo-formulario/novo-formulario.component';
import { ListUsuarioComponent } from './components/usuario/list-usuario/list-usuario.component';
import { NovoUsuarioComponent } from './components/usuario/novo-usuario/novo-usuario.component';
import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
import { NavComponent } from './components/nav/nav.component';
import { ConfirmExitGuard } from './guards/confirm-exit.guard';
import { DelUsuarioComponent } from './components/usuario/del-usuario/del-usuario.component';
import { InfoUsuarioComponent } from './components/usuario/info-usuario/info-usuario.component';
import { ListFormularioComponent } from './components/formulario/list-formulario/list-formulario.component';
import { NovaQuestaoComponent } from './components/questoes/nova-questao/nova-questao.component';

import { EditFormularioComponent } from './components/formulario/edit-formulario/edit-formulario.component';

import { ListQuestaoComponent } from './components/questoes/list-questao/list-questao.component';
import { InfoQuestaoComponent } from './components/questoes/info-questao/info-questao.component';
import { EditQuestaoComponent } from './components/questoes/edit-questao/edit-questao.component';
import { DelQuestaoComponent } from './components/questoes/del-questao/del-questao.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AgradecimentoFormComponent } from './components/agradecimento-form/agradecimento-form.component';
import { AutenticacaoGuard } from './guards/autenticacao.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },


  {
    path:'',
    component: NavComponent,
     canActivate: [
      AutenticacaoGuard],
    children: [

      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'aluno/lista-aluno',
        component: ListAlunoComponent
      },
      {
        path: 'aluno/editar-aluno/:cpf',
        component: EditAlunoComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path: 'aluno/novo-aluno',
        component: NovoAlunoComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path: 'aluno/info-aluno/:cpf',
        component: InfoAlunoComponent
      },
      {
        path: 'aluno/delete-aluno/:cpf',
        component: DelAlunoComponent
      },
      {
        path: 'empresa/lista-empresa',
        component: ListEmpresaComponent
      },
      {
        path: 'empresa/editar-empresa/:cnpj',
        component: EditEmpresaComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path: 'empresa/nova-empresa',
        component: NovaEmpresaComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path: 'empresa/info-empresa/:cnpj',
        component: InfoEmpresaComponent
      },
      {
        path: 'empresa/delete-empresa/:cnpj',
        component: DelEmpresaComponent
      },
      {
        path: 'usuario/lista-usuario',
        component: ListUsuarioComponent
      },
      {
        path: 'usuario/novo-usuario',
        component: NovoUsuarioComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path: 'usuario/editar-usuario/:matricula',
        component: EditUsuarioComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path:'usuario/delete-usuario/:matricula',
        component:DelUsuarioComponent

      },
      {
        path:'usuario/info-usuario/:matricula',
        component:InfoUsuarioComponent

      },
      {
        path: 'formulario/novo-formulario',
        component: NovoFormularioComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path:'formulario/lista-formulario',
        component:ListFormularioComponent
      },

      {
        path:'formulario/editar-formulario/:id',
        component:EditFormularioComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },

      {
        path:'questoes/lista-questao',
        component: ListQuestaoComponent
      },
      {
        path:'questoes/info-questao/:id',
        component: InfoQuestaoComponent
      },
      {
        path:'questoes/nova-questao',
        component: NovaQuestaoComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path:'questoes/editar-questao/:id',
        component: EditQuestaoComponent,
        canDeactivate: [
          ConfirmExitGuard
        ]
      },
      {
        path:'questoes/delete-questao/:id',
        component: DelQuestaoComponent
        },
      {
        path:'dashboard/:id',
        component: DashboardComponent
      },
    ]

  },
  {
    path:'questionario/:id',
    component: PaginaPerguntasComponent
  },
  {
    path:'questionario-agradecimento',
    component: AgradecimentoFormComponent
  }
,
      {
        path:'**',
        component: NotFoundComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

