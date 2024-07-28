import { Routes } from '@angular/router';
import { PersonInfoComponent } from './persons/person-info/person-info.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent
    },
    {
        path: 'get/:document_id',
        component: PersonInfoComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];