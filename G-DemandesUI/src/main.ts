import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LOCALE_ID } from '@angular/core';


registerLocaleData(localeFr, 'fr-FR');

const frenchPaginatorIntl = new MatPaginatorIntl();
frenchPaginatorIntl.itemsPerPageLabel = 'Éléments par page';
frenchPaginatorIntl.nextPageLabel = 'Page suivante';
frenchPaginatorIntl.previousPageLabel = 'Page précédente';
frenchPaginatorIntl.firstPageLabel = 'Première page';
frenchPaginatorIntl.lastPageLabel = 'Dernière page';
frenchPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 sur ${length}`;
  }
  const start = page * pageSize + 1;
  const end = Math.min(start + pageSize - 1, length);
  return `${start} – ${end} sur ${length}`;
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MatPaginatorIntl, useValue: frenchPaginatorIntl }
  ]
}).catch(err => console.error(err));
