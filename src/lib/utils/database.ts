import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `DL${year}${month}${day}${random}`;
}

export function calculateDeliveryDate(pickupDate: Date, serviceType: string = 'standard'): Date {
  const delivery = new Date(pickupDate);
  
  switch (serviceType) {
    case 'express':
      delivery.setDate(delivery.getDate() + 1);
      break;
    case 'same-day':
      // Same day delivery
      break;
    default:
      delivery.setDate(delivery.getDate() + 2);
  }
  
  return delivery;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getOrderStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    PICKED_UP: 'bg-purple-100 text-purple-800',
    IN_PROGRESS: 'bg-orange-100 text-orange-800',
    READY: 'bg-cyan-100 text-cyan-800',
    OUT_FOR_DELIVERY: 'bg-indigo-100 text-indigo-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

export function getPaymentStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PAID: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-blue-100 text-blue-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}