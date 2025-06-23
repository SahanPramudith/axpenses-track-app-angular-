import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Menubar } from 'primeng/menubar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,Menubar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
items: MenuItem[] | undefined;

  ngOnInit(){
    this.items=[
      {
        label:'Dashboard',
        icon:'pi pi-fw pi-home',
        routerLink:'/'
      },
      {
        label:'Add Expense',
        icon: PrimeIcons.PLUS,
        routerLink:'expensesForm'
      },
      {
        label:'Expense List',
        icon:'pi pi-fw pi-home',
        routerLink:'expensesList'
      }
    ]

  }
}
