import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-envio',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="p-8 bg-gray-100 min-h-screen">
      <h2 class="text-2xl font-bold mb-4">Crear Nuevo Envío</h2>
      <form [formGroup]="envioForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="destinatario" class="block text-sm font-medium text-gray-700">Destinatario</label>
          <input id="destinatario" type="text" formControlName="destinatario" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
          <input id="direccion" type="text" formControlName="direccion" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label for="paquete" class="block text-sm font-medium text-gray-700">Descripción del Paquete</label>
          <textarea id="paquete" formControlName="paquete" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md" [disabled]="envioForm.invalid">Crear Envío</button>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuevoEnvioComponent {
  envioForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.envioForm = this.fb.group({
      destinatario: ['', Validators.required],
      direccion: ['', Validators.required],
      paquete: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.envioForm.valid) {
      console.log('Nuevo Envío:', this.envioForm.value);
    }
  }
}