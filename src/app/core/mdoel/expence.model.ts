export interface Expenses {
    id?: string;
    amount: number;
    description: string;
    category: ExpenceCategory;
    date: string;
    paymentMethod: PaymentMethod;
    tag?:string[];
    note?:string
}

export  enum ExpenceCategory{
    FOOD='food',
    TRANSPORT='transport',
    UTILITY='utility',
    ENTERTAINMENT='entertainment',
    Hopping='hopping',
    HEALTH='health',
    OTHER='other'
}

export enum PaymentMethod{
    CASH='cash',
    CREDIT_CARD='credit card',
    DEBIT_CARD='debit card',
    Bank_Transfer='bank transfer',
    PAYPAL='paypal',
    OTHER='other'
}

