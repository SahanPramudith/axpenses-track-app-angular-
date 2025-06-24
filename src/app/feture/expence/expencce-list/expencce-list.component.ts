import { Component, inject, OnInit, signal } from '@angular/core';
import { ServiceService } from '../../../core/service/service.service';
import { Expenses } from '../../../core/mdoel/expence.model';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-expencce-list',
  standalone: true,
  imports: [TableModule,ButtonModule,CurrencyPipe,DatePipe,RouterLink], // Add CommonModule, etc. if needed
  templateUrl: './expencce-list.component.html',
  styleUrl: './expencce-list.component.css'
})
export class ExpencceListComponent implements OnInit {

  private expensesList = inject(ServiceService);

  // signal to hold list of expenses
  expense = signal<Expenses[]>([]);

  ngOnInit(): void {
    this.expensesList.getExpenses().subscribe({
      next: (expenses) => {
        console.log(expenses);
        this.expense.set(Array.isArray(expenses) ? expenses : [expenses]); 
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
      }
    });
  }

  deleteExpense(id:string){
    this.expensesList.deleteExpense(id).subscribe({
      next: (res) => {
        console.log("done");
        
        this.expense.set(this.expense().filter((expense) => expense.id !== id));
      },
      error: (err) => {
        console.error('Error deleting expense:', err);
      }
    });
  }
}
