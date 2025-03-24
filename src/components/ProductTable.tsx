import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ProductTable = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Product Code</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Stock Quantity</TableCell>
            <TableCell>Date Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.productCode}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell>{new Date(product.dateAdded).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;