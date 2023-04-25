import { Component, OnInit } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';
import { TECLADO } from 'src/assets/datos/datos';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  palabraModel: Palabra = {
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    pos5: '',
  };

  word = Object.values(this.palabraModel);

  wordSend = '';
  disableKeyboard: boolean = false;
  teclado: string[] = TECLADO;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.getDisable().subscribe({
      next: (response: any) => {
        this.disableKeyboard = response;
      },
    });
  }

  sendWord() {
    this.gameService.getWordIfExist(this.buildWord()).subscribe({
      next: (response: any) => {
        if (response.wordExists) {
          this.gameService.getValidatePosition(this.palabraModel).subscribe({
            next: (response: any) => {
              console.log(response);
            },
          });
        } else {
          this.openDialog();
        }
      },
    });
  }

  buildWord() {
    return (this.wordSend =
      this.palabraModel.pos1 +
      this.palabraModel.pos2 +
      this.palabraModel.pos3 +
      this.palabraModel.pos4 +
      this.palabraModel.pos5);
  }

  writeLetter(tecla: string) {
    if (this.palabraModel.pos1 === '') {
      this.palabraModel.pos1 = tecla;
    } else if (this.palabraModel.pos2 === '') {
      this.palabraModel.pos2 = tecla;
    } else if (this.palabraModel.pos3 === '') {
      this.palabraModel.pos3 = tecla;
    } else if (this.palabraModel.pos4 === '') {
      this.palabraModel.pos4 = tecla;
    } else if (this.palabraModel.pos5 === '') {
      this.palabraModel.pos5 = tecla;
    }

    this.word = Object.values(this.palabraModel);
  }

  deleteLetter() {
    if (this.palabraModel.pos5) {
      this.palabraModel.pos5 = '';
    } else if (this.palabraModel.pos4) {
      this.palabraModel.pos4 = '';
    } else if (this.palabraModel.pos3) {
      this.palabraModel.pos3 = '';
    } else if (this.palabraModel.pos2) {
      this.palabraModel.pos2 = '';
    } else if (this.palabraModel.pos1) {
      this.palabraModel.pos1 = '';
    }

    this.word = Object.values(this.palabraModel);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { text: 'La palabra no existe', createButton: true },
    });
  }

  focus() {
    alert('hola');
  }

 buildWord(){
  return  (this.wordSend =
  this.palabraModel.pos1 +
  this.palabraModel.pos2 +
  this.palabraModel.pos3 +
  this.palabraModel.pos4 +
  this.palabraModel.pos5);
 }
 
}
