import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private localStorageKey = 'clients';

  constructor() {
    this.initializeClients();
  }

  private initializeClients() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  private getClientsFromLocalStorage(): Client[] {
    const clients = localStorage.getItem(this.localStorageKey);
    return clients ? JSON.parse(clients) : [];
  }

  private saveClientsToLocalStorage(clients: Client[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(clients));
  }

  getAll(): Observable<Client[]> {
    const clients = this.getClientsFromLocalStorage();
    return of(clients);
  }

  create(client: Client): Observable<Client> {
    const clients = this.getClientsFromLocalStorage();
    client.id = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    clients.push(client);
    this.saveClientsToLocalStorage(clients);
    return of(client);
  }

  delete(clientId: number): Observable<void> {
    let clients = this.getClientsFromLocalStorage();
    clients = clients.filter(client => client.id !== clientId);
    this.saveClientsToLocalStorage(clients);
    return of(undefined);
  }

  update(client: Client): Observable<Client> {
    const clients = this.getClientsFromLocalStorage();
    const index = clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
      clients[index] = client;
      this.saveClientsToLocalStorage(clients);
    }
    return of(client);
  }

  getById(clientId: number): Observable<Client | undefined> {
    const clients = this.getClientsFromLocalStorage();
    const client = clients.find(c => c.id === clientId);
    return of(client);
  }
}
