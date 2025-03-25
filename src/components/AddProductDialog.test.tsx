import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProductDialog from './AddProductDialog';

const mockHandleClose = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleAddProduct = jest.fn();

test('renders AddProductDialog component', () => {
    render(
        <AddProductDialog
            open={true}
            handleClose={mockHandleClose}
            handleChange={mockHandleChange}
            handleAddProduct={mockHandleAddProduct}
        />
    );

    // Check if the dialog title is rendered
    const dialogTitle = screen.getByText(/Add New Product/i);
    expect(dialogTitle).toBeInTheDocument();

    // Check if the input fields are rendered
    const categoryInput = screen.getByLabelText(/Category/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const productCodeInput = screen.getByLabelText(/Product Code/i);
    const priceInput = screen.getByLabelText(/Price/i);
    const skuInput = screen.getByLabelText(/SKU/i);
    const stockQuantityInput = screen.getByLabelText(/Stock Quantity/i);

    expect(categoryInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(productCodeInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(skuInput).toBeInTheDocument();
    expect(stockQuantityInput).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: /Add/i });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });

    expect(addButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

});

test('calls handleClose when Cancel button is clicked', () => {
    render(
        <AddProductDialog
            open={true}
            handleClose={mockHandleClose}
            handleChange={mockHandleChange}
            handleAddProduct={mockHandleAddProduct}
        />
    );

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
});

test('calls handleAddProduct when Add Product button is clicked', () => {
    render(
        <AddProductDialog
            open={true}
            handleClose={mockHandleClose}
            handleChange={mockHandleChange}
            handleAddProduct={mockHandleAddProduct}
        />
    );
    //open, handleClose, handleChange, handleAddProduct
    const addButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(addButton);

    expect(mockHandleAddProduct).toHaveBeenCalledTimes(1);
});