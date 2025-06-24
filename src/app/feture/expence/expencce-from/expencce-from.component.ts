import { Component, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../../core/service/service.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { ExpenceCategory, Expenses, PaymentMethod } from '../../../core/mdoel/expence.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';



@Component({
  selector: 'app-expencce-from',
  imports: [CardModule,TextareaModule,InputTextModule ,SelectModule, DatePickerModule, ReactiveFormsModule, InputNumberModule],
  templateUrl: './expencce-from.component.html',
  styleUrl: './expencce-from.component.css'
})
export class ExpencceFromComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  isEditMode = signal(false);
  id = signal(0) || null;
  expensesFrom!: FormGroup;
  expenceservice = inject(ServiceService);

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
      this.loardExpenses(+id);
      this.id.set(+id);
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

  private loardExpenses(id: number) {
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
        date: this.expensesFrom.value.date.toISOString().sprit('T')[0]
      }

      const request$ = this.isEditMode() ? this.expenceservice.updateExpense(this.id(), expensesData) :
        this.expenceservice.crateExpense(expensesData);
      request$.subscribe({
        next: (expenses) => {
          this.expensesFrom.reset();
          this.id.set(0)
          this.isEditMode.set(false)
          this.initExpssesFrom()
        }
      })
    }
  }


}
