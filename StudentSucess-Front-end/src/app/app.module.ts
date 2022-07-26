import { parsePhoneNumber } from 'libphonenumber-js';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NovoUsuarioComponent } from './components/usuario/novo-usuario/novo-usuario.component';
import { EditUsuarioComponent } from './components/usuario/edit-usuario/edit-usuario.component';
import { ListUsuarioComponent } from './components/usuario/list-usuario/list-usuario.component';
import { NovoAlunoComponent } from './components/aluno/novo-aluno/novo-aluno.component';
import { EditAlunoComponent } from './components/aluno/edit-aluno/edit-aluno.component';
import { InfoAlunoComponent } from './components/aluno/info-aluno/info-aluno.component';
import { ListAlunoComponent } from './components/aluno/list-aluno/list-aluno.component';
import { DelAlunoComponent } from './components/aluno/del-aluno/del-aluno.component';
import { NovaEmpresaComponent } from './components/empresa/nova-empresa/nova-empresa.component';
import { EditEmpresaComponent } from './components/empresa/edit-empresa/edit-empresa.component';
import { ListEmpresaComponent } from './components/empresa/list-empresa/list-empresa.component';
import { InfoEmpresaComponent } from './components/empresa/info-empresa/info-empresa.component';
import { DelEmpresaComponent } from './components/empresa/del-empresa/del-empresa.component';
import { NovoFormularioComponent } from './components/formulario/novo-formulario/novo-formulario.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavComponent } from './components/nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ConfirmExitDialogComponent } from './shared/confirm-exit-dialog/confirm-exit-dialog.component';
import { ConfirmExitGuard } from './guards/confirm-exit.guard';
import { DelUsuarioComponent } from './components/usuario/del-usuario/del-usuario.component';
import {  AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { NovaQuestaoComponent } from './components/questoes/nova-questao/nova-questao.component';
import { EditQuestaoComponent } from './components/questoes/edit-questao/edit-questao.component';
import { InfoUsuarioComponent } from './components/usuario/info-usuario/info-usuario.component';
import { ListFormularioComponent } from './components/formulario/list-formulario/list-formulario.component';
import { CpfPipe } from './shared/cpf.pipe';
import { CnpjPipe } from './shared/cnpj.pipe';

import { EditFormularioComponent } from './components/formulario/edit-formulario/edit-formulario.component';


import { PhonePipe } from './shared/phone.pipe';
import { InfoQuestaoComponent } from './components/questoes/info-questao/info-questao.component';
import { ListQuestaoComponent } from './components/questoes/list-questao/list-questao.component';
import { PaginaPerguntasComponent } from './components/pagina-perguntas/pagina-perguntas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DelQuestaoComponent } from './components/questoes/del-questao/del-questao.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AgradecimentoFormComponent } from './components/agradecimento-form/agradecimento-form.component';



const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    NovoUsuarioComponent,
    EditUsuarioComponent,
    ListUsuarioComponent,
    NovoAlunoComponent,
    EditAlunoComponent,
    InfoAlunoComponent,
    ListAlunoComponent,
    DelAlunoComponent,
    NovaEmpresaComponent,
    EditEmpresaComponent,
    ListEmpresaComponent,
    InfoEmpresaComponent,
    DelEmpresaComponent,
    NovoFormularioComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    ConfirmExitDialogComponent,
    DelUsuarioComponent,
    NovaQuestaoComponent,
    EditQuestaoComponent,
    InfoUsuarioComponent,
    ListFormularioComponent,
    CpfPipe,
    CnpjPipe,

    EditFormularioComponent,

    PhonePipe,
    ListQuestaoComponent,
    InfoQuestaoComponent,
    PaginaPerguntasComponent,
    DashboardComponent,
    DelQuestaoComponent,
    NotFoundComponent,
    AgradecimentoFormComponent



  ],
  imports: [

    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    MatSidenavModule,





  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    ConfirmExitGuard,
    AuthInterceptorProvider,
    [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
