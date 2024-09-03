export interface Producto {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: string;
    createdAt?: Date; 
    updatedAt?: Date; 
}

