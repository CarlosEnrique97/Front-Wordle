import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class MainInterceptor implements HttpInterceptor {


constructor(private dialog: MatDialog){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error)
        let data = "";
        if(error.url === "http://10.102.31.7:8080/newGame"){
          data = "Ha habido un fallo al generar la partida, ya se ve lo looser que eres, recarga anda";
        }else if (error.url === "http://10.102.31.7:8080/checkIfWordExists"){
          data="UPS, algo ha ido mal, no podremos saber lo looser que eres...";
        }
        return throwError(
         this.dialog.open(DialogComponent, {
          data: data,
        }))
      }));
  }

}
