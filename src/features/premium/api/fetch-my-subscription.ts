// src/features/premium/api/fetch-my-subscription.ts
import { api, unwrap } from '@/lib/axios';

export type SubscriptionInfo = {
  planName: string;
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  merchantUid: string;
  impUid: string;
  status: string;
  amount: number;
  payMethod: string;
};

export const fetchMySubscription = async (): Promise<SubscriptionInfo | null> => {
  try {
    const response = await api.get('/api/subscription/me');
    return unwrap<SubscriptionInfo>(response);
  } catch (error: any) {
    if (error.response?.status === 403) {
      return null;
    }
    throw error;
  }
};
