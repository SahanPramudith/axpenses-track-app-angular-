import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Expenses } from '../mdoel/expence.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly API_URL='http://localhost:3000/expence';

  private http=inject(HttpClient);


  getExpenses(){
    return this.http.get<Expenses>(this.API_URL);
  }

  getExpensesById(id:string){
    return this.http.get<Expenses>(`${this.API_URL}/${id}`)
  }

  crateExpense(expense:Omit<Expenses,'id'>){
    return this.http.post(this.API_URL,expense);
  }
  updateExpense(id:string,expense:Expenses){
    return this.http.put(`${this.API_URL}/${id}`,expense);
  }
  
  deleteExpense(id:string){
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
