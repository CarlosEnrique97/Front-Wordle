import { Component, OnInit } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  palabraModel: Palabra = {
    nombre: '',
  };

  wordExist: Boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  formularioEnviado() {
    console.log('El formulario fue enviado y la palabra es: ');
    alert('Enviado');
    this.gameService.getInfoWord(this.palabraModel.nombre);
    this.wordExist = this.gameService.wordExist;
  }

  Teclado: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  enviarLetra(Tecla: string) {
    console.log(Tecla);
    if (this.palabraModel.nombre.length < 5) {
      this.palabraModel.nombre += Tecla;
    }
  }

  deleteCharacter() {
    this.palabraModel.nombre = this.palabraModel.nombre.slice(0, -1);
  }
}
