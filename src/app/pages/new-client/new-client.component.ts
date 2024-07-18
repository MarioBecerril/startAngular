import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  formulario: FormGroup;
  clientId: number | null = null;
  isEditMode = false;

  formBuilder = inject(FormBuilder);
  clientsService = inject(ClientsService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.formulario = this.formBuilder.group({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      salary: ''
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('id')!;
      if (this.clientId) {
        this.isEditMode = true;
        this.clientsService.getById(this.clientId).subscribe(client => {
          if (client) {
            this.formulario.patchValue(client);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode && this.clientId) {
      const updatedClient: Client = { id: this.clientId, ...this.formulario.value };
      this.clientsService.update(updatedClient).subscribe(() => {
        alert('Client updated successfully');
        this.router.navigate(['/clients']);
      });
    } else {
      const newClient: Client = { id: 0, ...this.formulario.value };
      this.clientsService.create(newClient).subscribe(() => {
        alert('Client created successfully');
        this.router.navigate(['/clients']);
      });
    }
  }
}
