import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  standalone: false
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSeleccionado = new EventEmitter<string>();

  @Input() avatarUsuario: string | null = 'av-1.png';

  @ViewChild('swiperRef', { static: false }) swiperRef!: any;

  get swiper() {
    return this.swiperRef.nativeElement.swiper;
  }


  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  slideIndex = 0;

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(av => av.seleccionado = false);

    for (let i = 0; i < this.avatars.length; i++) {
      if (this.avatars[i].img === this.avatarUsuario) {
        this.avatars[i].seleccionado = true;
        this.slideIndex = i;
        break;
      }
    }
  }

  ngAfterViewInit() {
    // Esperamos a que el swiper esté inicializado
    setTimeout(() => {
        this.swiper.slideTo(this.slideIndex, 0); // 0ms sin animación
    }, 0);
  }


  seleccionarAvatar(avatar: any) {

    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;

    this.avatarSeleccionado.emit(avatar.img)

  }

}
