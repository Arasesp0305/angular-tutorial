import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResumeComponent } from './components/task/resume/resume.component';

export const routes: Routes = [
    
    {path:'navbar', component:NavbarComponent},
    {path:'resume', component:ResumeComponent},
    {path:'', redirectTo:'/navbar', pathMatch:'full'}

];
