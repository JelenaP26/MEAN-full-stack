import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VlasnikComponent,
    DekoraterComponent,
    AdminComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangeProfileComponent,
    VlasnikFirmeComponent,
    VlasnikZakazivanjaComponent,
    VlasnikOdrzavanjeComponent,
    FirmaComponent,
    DekoraterZakazivanjaComponent,
    DekoraterOdrzavanjaComponent,
    DekoraterStatistikaComponent,
    NoviDekoraterComponent,
    NovaFirmaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
