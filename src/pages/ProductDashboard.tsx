import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import ProductTable from "../components/ProductTable";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddProductDialog from "../components/AddProductDialog";
import { Product } from "../types/Product";
import AssessmentIcon from '@mui/icons-material/Assessment';

const ProductDashboard = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const [newProduct, setNewProduct] = useState<Product>({
        category: "",
        name: "",
        productCode: "",
        price: 0,
        sku: "",
        stockQuantity: 0,
        dateAdded: new Date().toISOString(),
    });

    useEffect(() => {
        axios.get(`${API_URL}/product`)
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Group by category for stock quantity
    const stockPerCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + product.stockQuantity;
        return acc;
    }, {});

    const stockData = Object.entries(stockPerCategory).map(([category, quantity]) => ({ category, quantity }));

    // Group by date added for time-based analysis
    const timePeriods = { "This Week": 0, "This Month": 0, "This Year": 0 };
    const now = new Date();

    products.forEach(product => {
        const addedDate = new Date(product.dateAdded);
        const diffDays = (now - addedDate) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) timePeriods["This Week"]++;
        if (diffDays <= 30) timePeriods["This Month"]++;
        if (diffDays <= 365) timePeriods["This Year"]++;
    });

    const timeData = Object.entries(timePeriods).map(([period, count]) => ({ period, count }));

    const handleAddProduct = async () => {
        try {
            const response = await axios.post(`${API_URL}/product`, newProduct);
            if (response.status === 200) {
                setProducts([...products, newProduct]);
                setOpen(false);
                setNewProduct({
                    category: "",
                    name: "",
                    productCode: "",
                    price: 0,
                    sku: "",
                    stockQuantity: 0,
                    dateAdded: new Date().toISOString(),
                });
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleGetMockData = () => {
        try {
            axios.get(`${API_URL}/product/report`)
                .then(response => setProducts(response.data))
                .catch(error => console.error("Error fetching mock products:", error));
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
                Product Dashboard
            </Typography>

            {/* Data Table */}
            <Card sx={{ marginBottom: 4 }}>
                <CardContent>
                    <ProductTable products={products} />
                </CardContent>
            </Card>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
                sx={{ borderRadius: "20px", padding: "10px 20px", fontSize: "16px", margin: '5px' }}
            >
                Add New Product
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AssessmentIcon />}
                onClick={() => handleGetMockData()}
                sx={{ borderRadius: "20px", padding: "10px 20px", fontSize: "16px", margin: '5px' }}
            >
                Get Mock Report Data
            </Button>

            {/* Charts */}
            <Stack direction="row" spacing={1} sx={{ marginBottom: 4, marginTop: 4 }}>
                <Card sx={{ marginBottom: 4 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Stock Quantity Per Category
                        </Typography>
                        <BarChart
                            width={600}
                            height={300}
                            series={[{ data: stockData.map(d => d.quantity), label: "Stock", color: "#8884d8" }]}
                            xAxis={[{ scaleType: "band", data: stockData.map(d => d.category) }]}
                        />
                    </CardContent>
                </Card>

                <Card sx={{ marginBottom: 4 }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Product Added Over Time
                        </Typography>
                        <LineChart
                            width={600}
                            height={300}
                            series={[{ data: timeData.map(d => d.count), label: "Products Added", color: "#82ca9d" }]}
                            xAxis={[{ scaleType: "band", data: timeData.map(d => d.period) }]}
                        />
                    </CardContent>
                </Card>
            </Stack>
            <AddProductDialog
                open={open}
                handleClose={() => setOpen(false)}
                handleChange={handleChange}
                handleAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default ProductDashboard;
