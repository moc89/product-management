# Product Management Dashboard

This is a Product Management Dashboard application built with React and Vite. It allows users to view, add, create mock data and analyze products.

## Features

- View a list of products
- Add new products
- Create mock data for visualisation
- Analyze stock quantity per category
- Analyze products added over time

## Technologies Used

- React
- Vite
- Axios
- Material-UI
- MUI X Charts

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/moc89/product-management.git
   cd product-management

2. Install dependencies:
    npm install
        or
    yarn install

3. Start the development server:
    npm run dev
    
4. Open your browser and navigate to 
    http://localhost:5173/

5. Project Structure
components: Contains reusable components such as ProductTable and AddProductDialog.
pages: Contains the main page of the application, ProductDashboard.
types: Contains TypeScript type definitions.
src/vite-env.d.ts: Contains type definitions for environment variables.

6. Environment Variables
Ensure you have the following environment variables set in your .env file:
REACT_APP_API_URL=http://localhost:5276/api