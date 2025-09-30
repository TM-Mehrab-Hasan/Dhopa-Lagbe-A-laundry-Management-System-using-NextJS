import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dhopalagbe.com' },
    update: {},
    create: {
      email: 'admin@dhopalagbe.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      verified: true,
      admin: {
        create: {
          level: 'SUPER_ADMIN'
        }
      }
    }
  });

  // Create Customer User
  const customer = await prisma.user.upsert({
    where: { email: 'customer@dhopalagbe.com' },
    update: {},
    create: {
      email: 'customer@dhopalagbe.com',
      name: 'John Customer',
      password: hashedPassword,
      role: 'CUSTOMER',
      verified: true,
      customer: {
        create: {
          loyaltyPoints: 100,
          totalOrders: 0,
          totalSpent: 0
        }
      }
    }
  });

  // Create Rider User
  const rider = await prisma.user.upsert({
    where: { email: 'rider@dhopalagbe.com' },
    update: {},
    create: {
      email: 'rider@dhopalagbe.com',
      name: 'Ahmed Hassan',
      password: hashedPassword,
      role: 'RIDER',
      verified: true,
      rider: {
        create: {
          vehicleType: 'Motorcycle',
          licenseNumber: 'DH123456',
          active: true,
          rating: 4.8,
          totalDeliveries: 150
        }
      }
    }
  });

  // Create sample addresses
  await prisma.address.createMany({
    data: [
      {
        userId: customer.id,
        type: 'HOME',
        title: 'Home',
        address: 'House 15, Road 12',
        city: 'Dhaka',
        area: 'Dhanmondi',
        landmark: 'Near Dhanmondi Lake',
        isDefault: true
      },
      {
        userId: customer.id,
        type: 'OFFICE',
        title: 'Office',
        address: 'Plot 456, Level 8',
        city: 'Dhaka',
        area: 'Gulshan',
        landmark: 'Gulshan Avenue',
        isDefault: false
      }
    ]
  });

  // Create sample services
  const washFoldService = await prisma.service.create({
    data: {
      name: 'Wash & Fold',
      description: 'Regular washing and careful folding',
      category: 'Basic',
      pricing: {
        create: [
          { itemType: 'shirt', price: 25, unit: 'piece' },
          { itemType: 'pants', price: 30, unit: 'piece' },
          { itemType: 'dress', price: 40, unit: 'piece' }
        ]
      }
    }
  });

  const dryCleanService = await prisma.service.create({
    data: {
      name: 'Dry Cleaning',
      description: 'Professional dry cleaning for delicate items',
      category: 'Premium',
      pricing: {
        create: [
          { itemType: 'suit', price: 200, unit: 'piece' },
          { itemType: 'dress', price: 150, unit: 'piece' },
          { itemType: 'blazer', price: 180, unit: 'piece' }
        ]
      }
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`👨‍💼 Admin: admin@dhopalagbe.com / password123`);
  console.log(`👤 Customer: customer@dhopalagbe.com / password123`);
  console.log(`🚴 Rider: rider@dhopalagbe.com / password123`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });