import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const AddProductDialog = ({ open, handleClose, handleChange, handleAddProduct }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField label="Category" name="category" fullWidth margin="dense" onChange={handleChange} />
        <TextField label="Name" name="name" fullWidth margin="dense" onChange={handleChange} />
        <TextField label="Product Code" name="productCode" fullWidth margin="dense" onChange={handleChange} />
        <TextField label="Price" name="price" type="number" fullWidth margin="dense" onChange={handleChange} />
        <TextField label="SKU" name="sku" fullWidth margin="dense" onChange={handleChange} />
        <TextField label="Stock Quantity" name="stockQuantity" type="number" fullWidth margin="dense" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleAddProduct} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;