import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceService } from '../../../core/service/service.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { ExpenceCategory, Expenses, PaymentMethod } from '../../../core/mdoel/expence.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-expencce-from',
  imports: [CardModule,ToastModule,MessageModule,RouterLink,ButtonModule,TextareaModule,InputTextModule ,SelectModule, DatePickerModule, ReactiveFormsModule, InputNumberModule],
  templateUrl: './expencce-from.component.html',
  styleUrl: './expencce-from.component.css',
  providers: [MessageService],
})
export class ExpencceFromComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  isEditMode = signal(false);
  id = signal <string | null>(null);
  expensesFrom!: FormGroup;
  expenceservice = inject(ServiceService);
  private massageService = inject(MessageService);

  category = Object.values(ExpenceCategory).map((category) => ({
    name:category,
    code:category
  }));

  paymentMethod=Object.values(PaymentMethod).map((payment)=>({
    name:payment,
    code:payment
  }))


  ngOnInit(): void {
    this.initExpssesFrom();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loardExpenses(id);
      this.id.set(id);
    }

  }

  private initExpssesFrom() {
    this.expensesFrom = this.fb.group({
      amount: [''],
      date: [''],
      category: [''],
      description: [''],
      type: [''],
      paymentMethod: [''],
      tag: [''],
      note: [''],
    });
  }

  private loardExpenses(id: string) {
    this.expenceservice.getExpensesById(id).subscribe({
      next: (expenses) => {
        this.expensesFrom.patchValue({
          ...expenses,
          date: new Date(expenses.date)

        })
      }
    })
  }


  onSubmit() {
    if (this.expensesFrom.valid) {
      const expensesData: Expenses = {
        ...this.expensesFrom.value,
        date: this.expensesFrom.value.date.toISOString().split('T')[0]
      }

      let request$;
      if (this.isEditMode()) {
        const expenseId = this.id();
        if (expenseId === null) {
          throw new Error('Expense ID is null in edit mode');
        }
        request$ = this.expenceservice.updateExpense(expenseId, expensesData);
      } else {
        request$ = this.expenceservice.crateExpense(expensesData);
      }
      request$.subscribe({
        next: (expenses) => {
          console.log(expenses);
          this.massageService.add({ severity: 'success', summary: 'Success', detail: 'Expenses created successfully' });     
          this.expensesFrom.reset();
          this.id.set(null)
          this.isEditMode.set(false)
          this.initExpssesFrom()
        }
      })
    }
  }


}
