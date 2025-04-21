import { Component, OnInit } from '@angular/core';
import { DemandeService, Demande } from '../demande.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    FormsModule,
    DatePipe
  ],
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss']
})
export class DemandeListComponent implements OnInit {
  demandes: Demande[] = [];
  displayedColumns: string[] = ['titre', 'status', 'dateCreation', 'demandeurEmail', 'actions'];
  titreFilter: string = '';
  statusFilter: string = '';
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

  constructor(private demandeService: DemandeService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.demandeService.getDemandes(this.pageIndex, this.pageSize, this.titreFilter, this.statusFilter)
      .subscribe(data => {
        this.demandes = data.content;
        this.totalItems = data.totalElements;
      });
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.loadDemandes();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDemandes();
  }

  deleteDemande(id: number | undefined): void {
    if (id && confirm('Voulez-vous supprimer cette demande ?')) {
      this.demandeService.deleteDemande(id).subscribe(() => {
        this.loadDemandes();
      });
    }
  }
}
