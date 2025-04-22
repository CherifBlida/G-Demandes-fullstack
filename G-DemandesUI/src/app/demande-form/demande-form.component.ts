
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService, Demande } from '../demande.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-demande-form',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './demande-form.component.html',
    styleUrls: ['./demande-form.component.scss']
})
export class DemandeFormComponent implements OnInit {
  demandeForm: FormGroup;
  id: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.demandeForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(300)],
      status: ['', Validators.required],
      demandeurEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.demandeService.getDemande(this.id).subscribe({
        next: demande => this.demandeForm.patchValue({
          titre: demande.titre,
          description: demande.description,
          status: demande.status,
          demandeurEmail: demande.demandeurEmail
        }),
        error: err => {
          this.errorMessage = 'Demande non trouvée: ' + (err.message || 'Erreur serveur');
          console.error(err);
        }
      });
    }
  }


  onSubmit(): void {
    console.log('Form submitted:', this.demandeForm.value);
    if (this.demandeForm.valid) {
      const demande: Demande = {
        ...this.demandeForm.value,
        dateCreation: new Date().toISOString()
        // Set current date/time
      };
      const observable = this.id
        ? this.demandeService.updateDemande(this.id, demande)
        : this.demandeService.createDemande(demande);

      observable.subscribe({
        next: () => this.router.navigate(['/demandes']),
        error: err => {
          const errorMessage = err.error?.message || err.message || 'Erreur serveur';
          this.errorMessage = `Erreur lors de la sauvegarde: ${errorMessage}`;
          console.error(err);
        }
      });
    }
  }
}
