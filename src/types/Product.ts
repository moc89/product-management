export interface Product {
    category: string;
    name: string;
    productCode: string;
    price: number;
    sku: string;
    stockQuantity: number;
    dateAdded: string; // Assuming dateAdded is a string in ISO format
  }