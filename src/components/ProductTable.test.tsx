import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable';
import { Product } from '../types/Product';

const products: Product[] = [
    {
        category: 'Electronics',
        name: 'Smartphone',
        productCode: 'SP123',
        price: 699,
        sku: 'SKU123',
        stockQuantity: 50,
        dateAdded: '2023-01-01T00:00:00.000Z',
    },
    {
        category: 'Home Appliances',
        name: 'Vacuum Cleaner',
        productCode: 'VC456',
        price: 299,
        sku: 'SKU456',
        stockQuantity: 30,
        dateAdded: '2023-02-01T00:00:00.000Z',
    },
];

test('renders ProductTable component', () => {
    render(<ProductTable products={products} />);

    // Check if the table headers are rendered
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Stock Quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/Date Added/i)).toBeInTheDocument();

    // Check if the product data is rendered
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Smartphone/i)).toBeInTheDocument();
    expect(screen.getByText(/SP123/i)).toBeInTheDocument();
    expect(screen.getByText(/699/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/1\/2023/i)).toBeInTheDocument();

    expect(screen.getByText(/Home Appliances/i)).toBeInTheDocument();
    expect(screen.getByText(/Vacuum Cleaner/i)).toBeInTheDocument();
    expect(screen.getByText(/VC456/i)).toBeInTheDocument();
    expect(screen.getByText(/299/i)).toBeInTheDocument();
    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/1\/2023/i)).toBeInTheDocument();
});