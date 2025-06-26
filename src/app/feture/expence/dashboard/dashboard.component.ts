import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
//import { AppConfigService } from '@/service/appconfigservice';
import { ChartModule } from 'primeng/chart';
import { ServiceService } from '../../../core/service/service.service';
import { Expenses } from '../../../core/mdoel/expence.model';
import { groupBy } from 'rxjs';
import { MonthlyWiseAmount } from '../../../core/mdoel/mounthly.model';


@Component({
  selector: 'app-dashboard',
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  platformId = inject(PLATFORM_ID);

  private service = inject(ServiceService);
  currentDateTime = new Date();

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(private cd: ChangeDetectorRef) { }



  ngOnInit() {
   this.loardExpress()
  }

  private loardExpress() {
    this.service.getExpenses().subscribe({
      next: (expenses) => {
        const monthlyTotal = this.calculateMonthlyExpenses(Array.isArray(expenses) ? expenses : [expenses]);
        this.initChart(monthlyTotal);
      }
    })
  }
  calculateMonthlyExpenses(data: Expenses[]): MonthlyWiseAmount[] {
    const monthlyTotal = this.months.map((month) => ({
      month,
      total: 0,
    }));
    data.forEach((expenses) => {
      const date = new Date(expenses.date)
      const monthIndex = date.getMonth();
      if (this.currentDateTime.getFullYear() === date.getFullYear()) {
        monthlyTotal[monthIndex].total += expenses.amount;
      }
    });
    return monthlyTotal.map((item) => ({
      month: item.month,
      totalAmount: item.total
    }));
  }

  initChart(monthlyTotal: MonthlyWiseAmount[]) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicData = {
        labels: this.months,
        datasets: [
          {
            label: "Expenses",
            data: monthlyTotal.map((item) => item.totalAmount),
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)',
              'rgba(139, 92, 246, 0.2)',
            ],
            borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck()
    }
  }


}
