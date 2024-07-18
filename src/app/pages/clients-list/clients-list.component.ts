import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent {

  arrClients: Client[] = [];
  clientsService = inject(ClientsService);
  router = inject(Router);

  showConfirmDialog = false;
  selectedClientId: number | null = null;
  actionType: 'edit' | 'delete' | '' = '';

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getAll().subscribe((data: Client[]) => {
      this.arrClients = data;
    });
  }
  
  trackByClientId(index: number, client: Client): number {
    return client.id;
  }

  editClient(clientId: number) {
    this.router.navigate(['/nuevo-cliente', clientId]);
  }

  confirmDeleteClient(clientId: number) {
    this.actionType = 'delete';
    this.selectedClientId = clientId;
    this.showConfirmDialog = true;
  }

  performAction() {
    if (this.actionType === 'delete' && this.selectedClientId !== null) {
      this.clientsService.delete(this.selectedClientId).subscribe(() => {
        this.cancelAction();
        this.loadClients();
      });
    }
  }

  cancelAction() {
    this.showConfirmDialog = false;
    this.selectedClientId = null;
    this.actionType = '';
  }
}
