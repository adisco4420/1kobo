export interface SavingsI {
    userId?: string;
    name: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    planType: 'bronze' | 'silver' | 'gold';
    amount: number;
    payoutAmount: number;
    paymentCount: number;
    duration: number;
    status: 'pending' | 'active' | 'completed';
    startDate: number;
    maturityDate?: number;
    createdDate?: number;
    virtualAct?: {
        virtualaccount: string;
        virtualaccountname: string;
    };
    lastPaymentDate?: number;
    currentDate?: any;
}