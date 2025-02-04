# React E-commerce Frontend Application

This project is a comprehensive React-based e-commerce frontend application with features for product browsing, cart management, and user authentication.

## Repository Structure

The repository is organized as follows:

```
.
├── package.json
├── public
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── components
│   │   ├── authentication
│   │   ├── cart
│   │   ├── category
│   │   ├── layouts
│   │   ├── myAccount
│   │   ├── slider
│   │   └── ...
│   ├── context
│   ├── pages
│   ├── redux
│   ├── routes
│   ├── services
│   └── theme
└── tailwind.config.js
```

Key files and directories:

- `src/`: Contains the main application code
- `src/components/`: Reusable React components
- `src/pages/`: Individual page components
- `src/services/`: API service functions
- `src/routes/`: Routing configuration
- `src/context/`: React context providers
- `src/redux/`: Redux store and actions
- `package.json`: Project dependencies and scripts
- `tailwind.config.js`: Tailwind CSS configuration

## Usage Instructions

### Installation

1. Ensure you have Node.js (version 14 or later) installed.
2. Clone the repository.
3. Run `npm install` to install dependencies.

### Getting Started

1. Start the development server:
   ```
   npm start
   ```
2. Open `http://localhost:3000` in your browser.

### Configuration

- Environment variables can be set in a `.env` file in the root directory.
- API endpoints are configured in `src/routes/APIRoutes.jsx`.

### Common Use Cases

1. Browsing products:
   - Navigate to the home page to view featured products.
   - Use the category navigation to filter products.

2. Adding items to cart:
   - On a product detail page, select quantity and click "Add to Cart".
   - View cart by clicking the cart icon in the header.

3. Checkout process:
   - From the cart, click "Proceed to Checkout".
   - Fill in shipping details and select payment method.
   - Confirm order to complete the purchase.

### Testing & Quality

Run tests using:
```
npm test
```

### Troubleshooting

1. Issue: Products not loading
   - Check your internet connection
   - Verify API endpoint configuration in `src/routes/APIRoutes.jsx`
   - Check browser console for error messages

2. Issue: Cart not updating
   - Clear browser cache and local storage
   - Ensure you're logged in (if required)
   - Verify cart context is properly initialized

For debugging:
- Enable debug mode by setting `DEBUG=true` in `.env`
- Check browser console for detailed logs
- Inspect network requests in browser developer tools

## Data Flow

The application follows a typical React data flow:

1. User interacts with the UI (e.g., clicks "Add to Cart")
2. Event handler in the component is triggered
3. If necessary, an API call is made to the backend (e.g., `src/services/productListServices.js`)
4. The component's state or global state (Redux/Context) is updated
5. React re-renders the affected components

```
[User Interaction] -> [Component] -> [API Service] -> [State Update] -> [Re-render]
```

Important considerations:
- Cart state is managed using React Context (`src/context/CartContext.js`)
- Authentication state is handled by Redux (`src/redux/`)
- API calls are centralized in service files (`src/services/`)