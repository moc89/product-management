import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductDashboard from './ProductDashboard';
import { Product } from '../types/Product';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: products });
});

test('renders ProductDashboard component', async () => {
    render(<ProductDashboard />);

    // Check if the heading is rendered
    const headingElement = screen.getByText(/Product Dashboard/i);
    expect(headingElement).toBeInTheDocument();

    // Wait for the product data to be fetched and rendered
    await waitFor(() => {
        expect(screen.getByText(/Smartphone/i)).toBeInTheDocument();
        expect(screen.getByText(/SP123/i)).toBeInTheDocument();
        expect(screen.getByText(/699/i)).toBeInTheDocument();
        expect(screen.getByText(/SKU123/i)).toBeInTheDocument();
        expect(screen.getByText(/1\/1\/2023/i)).toBeInTheDocument();

        expect(screen.getByText(/Vacuum Cleaner/i)).toBeInTheDocument();
        expect(screen.getByText(/VC456/i)).toBeInTheDocument();
        expect(screen.getByText(/299/i)).toBeInTheDocument();
        expect(screen.getByText(/SKU456/i)).toBeInTheDocument();
        expect(screen.getByText(/2\/1\/2023/i)).toBeInTheDocument();
    });
});
