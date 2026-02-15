// prisma/seed.ts
import { PrismaClient, Role, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

// Load env vars explicitly for the script
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Clean up
    await prisma.user.deleteMany();
    console.log('🧹 Cleaned up existing users.');

    const users = [];

    // 2. Generate
    for (let i = 0; i < 100; i++) {
        users.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement([Role.USER, Role.USER, Role.ADMIN, Role.MANAGER]),
            status: faker.helpers.arrayElement([Status.ACTIVE, Status.INACTIVE, Status.SUSPENDED]),
            lastLogin: faker.date.recent({ days: 30 }),
            createdAt: faker.date.past({ years: 1 }),
        });
    }

    // 3. Insert
    await prisma.user.createMany({
        data: users,
    });

    console.log(`✅ Seeded ${users.length} users successfully.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end(); // Close the connection pool
    });