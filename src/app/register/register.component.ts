import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formularioRegister: FormGroup;
  @Output() registered = new EventEmitter<boolean>();

  constructor(private form: FormBuilder, private userService: UserService) {
    this.formularioRegister = this.form.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  hasError(controlName: string, errorType: string) {
    return this.formularioRegister.get(controlName)?.hasError(errorType) && this.formularioRegister.get(controlName)?.touched;
  }

  register() {
    if (this.formularioRegister.invalid) {
      this.formularioRegister.markAllAsTouched();
      return;
    }

    const userData = this.formularioRegister.value;
    this.userService.register(userData).subscribe({
      next: (response) => {
        alert('Usuari registrat correctament');
        console.log('Resposta del servidor:', response);
        this.registered.emit(true);
      },
      error: (error) => {
        console.error('Error en el registre:', error);
        alert('Error en el registre, revisa les dades introduïdes.');
      }
    });
  }
}
