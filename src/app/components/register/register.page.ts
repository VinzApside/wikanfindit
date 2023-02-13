import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user!: FormGroup;

  public validation_messages = {
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password cannot be more than 15 characters long.',
      },
      {
        type: 'pattern',
        message: 'Your Password must contain only numbers and letters.',
      },
    ],
    email: [
      { type: 'required', message: 'Name is required.' },
      {
        type: 'pattern',
        message: 'Your email has not the correct format.',
      },
    ],
  };

  constructor(private loadingCtrl: LoadingController, private route: Router) {}

  ngOnInit(): void {
    this.user = new FormGroup({
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.pattern('^[a-z0-9A-Z]+$'),
        ],
        updateOn: 'change',
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
        updateOn: 'change',
      }),
    });
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'dots',
    });

    loading.present();
    loading.onDidDismiss().then(() => {
      this.route.navigate(['/play']);
    });
  }
}
