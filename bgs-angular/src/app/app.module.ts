import { CalendarModule } from './calendar/calendar.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from './modal/modal.module';

import { SnotifyComponent } from './snotify/snotify.component';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';

function loadUser(auth: AuthService) {
    return () => auth.refreshUser()
}

@NgModule({
    imports: [
        AppRoutingModule,
        HttpClientModule,
        CalendarModule,
        BrowserModule,
        ModalModule,
        NgbModule
    ],
    declarations: [
        SnotifyComponent,
        AppComponent
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: loadUser, deps: [AuthService], multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
