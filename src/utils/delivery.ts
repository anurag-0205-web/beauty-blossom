import { DeliveryProvider } from '../types';

const providers: Record<string, DeliveryProvider> = {
  A: { code: 'A', name: 'Provider A', cutoffTime: '17:00', minDays: 0, maxDays: 1 },
  B: { code: 'B', name: 'Provider B', cutoffTime: '09:00', minDays: 1, maxDays: 1 },
  G: { code: 'G', name: 'General Partners', minDays: 2, maxDays: 5 }
};

export const calculateDeliveryDate = (pincode: string, productProvider: 'A' | 'B' | 'G') => {
  const provider = providers[productProvider];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  
  let deliveryDate = new Date();
  let message = '';
  
  if (provider.code === 'A') {
    const [cutoffHour, cutoffMinute] = (provider.cutoffTime || '').split(':').map(Number);
    const beforeCutoff = currentHour < cutoffHour || 
      (currentHour === cutoffHour && currentMinutes < cutoffMinute);
    
    if (beforeCutoff) {
      message = 'Same-day delivery with Provider A';
    } else {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      message = 'Next-day delivery with Provider A';
    }
  } else if (provider.code === 'B') {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    message = 'Next-day delivery with Provider B';
  } else {
    const daysToAdd = Math.floor(Math.random() * (provider.maxDays - provider.minDays + 1)) + provider.minDays;
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    message = `${daysToAdd}-day delivery with General Partners`;
  }

  return {
    date: deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }),
    logisticsProvider: provider.code,
    message
  };
};

export const getTimeRemaining = (providerCode: string) => {
  const now = new Date();
  const provider = providers[providerCode];
  
  if (!provider.cutoffTime) return '';
  
  const [cutoffHour, cutoffMinute] = provider.cutoffTime.split(':').map(Number);
  const cutoff = new Date();
  cutoff.setHours(cutoffHour, cutoffMinute, 0);
  
  if (now >= cutoff) return '';
  
  const diff = cutoff.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};