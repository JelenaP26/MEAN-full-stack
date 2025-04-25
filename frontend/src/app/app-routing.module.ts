import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { DekoraterComponent } from './dekorater/dekorater.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { VlasnikFirmeComponent } from './vlasnik-firme/vlasnik-firme.component';
import { VlasnikZakazivanjaComponent } from './vlasnik-zakazivanja/vlasnik-zakazivanja.component';
import { VlasnikOdrzavanjeComponent } from './vlasnik-odrzavanje/vlasnik-odrzavanje.component';
import { FirmaComponent } from './firma/firma.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterStatistikaComponent } from './dekorater-statistika/dekorater-statistika.component';
import { NoviDekoraterComponent } from './novi-dekorater/novi-dekorater.component';
import { NovaFirmaComponent } from './nova-firma/nova-firma.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'vlasnik', component: VlasnikComponent},
  { path: 'dekorater', component: DekoraterComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'adminLogin', component: AdminLoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'changeProfile', component: ChangeProfileComponent},
  { path: 'vlasnikFirme', component: VlasnikFirmeComponent},
  { path: 'vlasnikZakazivanja', component: VlasnikZakazivanjaComponent},
  { path: 'vlasnikOdrzavanje', component: VlasnikOdrzavanjeComponent},
  { path: 'firma', component: FirmaComponent},
  { path: 'dekoraterZakazivanja', component: DekoraterZakazivanjaComponent},
  { path: 'dekoraterOdrzavanja', component: DekoraterOdrzavanjaComponent},
  { path: 'dekoraterStatistika', component: DekoraterStatistikaComponent},
  { path: 'noviDekorater', component: NoviDekoraterComponent},
  { path: 'novaFirma', component: NovaFirmaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
