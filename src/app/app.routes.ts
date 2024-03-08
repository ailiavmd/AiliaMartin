import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';
import { EditComponent } from './features/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: ':id',
        component: EditComponent
    }
];
