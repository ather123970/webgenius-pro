import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_PATH, 'orders.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH, { recursive: true });
}

// Ensure database file exists
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

export const localDb = {
    getAll: () => {
        try {
            const data = fs.readFileSync(DB_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading local DB:', error);
            return [];
        }
    },

    getById: (id: string) => {
        const orders = localDb.getAll();
        return orders.find((o: any) => o.orderId === id) || null;
    },

    create: (order: any) => {
        const orders = localDb.getAll();
        // Add timestamps
        const newOrder = {
            ...order,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        orders.push(newOrder);
        fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
        return newOrder;
    },

    update: (id: string, updates: any) => {
        const orders = localDb.getAll();
        const index = orders.findIndex((o: any) => o.orderId === id);

        if (index === -1) return null;

        orders[index] = {
            ...orders[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2));
        return orders[index];
    },

    delete: (id: string) => {
        const orders = localDb.getAll();
        const filteredOrders = orders.filter((o: any) => o.orderId !== id);

        if (orders.length === filteredOrders.length) return false;

        fs.writeFileSync(DB_FILE, JSON.stringify(filteredOrders, null, 2));
        return true;
    }
};
