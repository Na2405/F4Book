import { Component, OnInit } from '@angular/core';
import { UserAuthen } from './../../interface/UserAuthen.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage;
  usernamePattern = '^[A-Za-z0-9+_.-]+@(.+)$';
  width = 100;
  height = 100;
  myStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    'z-index': -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  myParams: object = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: '#010B30',
      },
      shape: {
        type: 'circle',
        polygon: {
          nb_sides: 7,
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.6,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#5B566E',
        opacity: 0.4,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 4,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse',
        },
        onclick: {
          enable: false,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.signIn(this.email, this.password).subscribe(
      (data: UserAuthen) => {
        localStorage.setItem('token', data.user.token);
        // localStorage.setItem('username', data.user.username);
        this.userService.changeUsername(data.user.username);
        this.userService.changeLoginState();

        this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
