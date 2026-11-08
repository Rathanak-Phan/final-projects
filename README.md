# React E-Commerce Product Management

A modern, responsive E-Commerce frontend application built with **React JS, JavaScript, Tailwind CSS, and DummyJSON Products API**.

This project focuses on practicing real-world frontend development, including REST API integration, product management, searching, filtering, sorting, pagination, product details, and CRUD operations.

---

## 1. Project Overview

### Project Name
React E-Commerce Product Management

### Project Description

This application is designed to simulate a real-world e-commerce product platform.

Users can browse products, search for products, filter by category, sort products, view product details, and navigate through product pages.

The application also includes product management functionality, allowing users to practice creating, updating, and deleting products through API requests.

### Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling |
| JavaScript ES6+ | Application logic |
| React JS | Frontend development |
| Tailwind CSS | Responsive UI styling |
| React Router DOM | Page navigation |
| Fetch API | HTTP requests |
| DummyJSON API | Product data source |
| React Icons | UI icons |
| Local State | Application state management |

---

## 2. API Integration

This project uses DummyJSON as its product data source.

**Base API URL:**

```text
https://dummyjson.com
```

**Main Products Endpoint:**

```text
https://dummyjson.com/products
```

Official Documentation:

- https://dummyjson.com/docs/products

---

## 3. Complete Feature Scope

### Module 1: Product Listing

Fetch and display products from the DummyJSON API.

| Feature | Description |
|---|---|
| Fetch Products | Get all products from API |
| Product Cards | Display products in reusable cards |
| Product Image | Display product thumbnail |
| Product Title | Display product name |
| Product Price | Display product price |
| Product Rating | Display product rating |
| Product Brand | Display product brand |
| Product Category | Display product category |
| Product Discount | Display discount percentage |
| Product Stock | Display available stock |
| Loading State | Show loading indicator |
| Error Handling | Handle API request errors |
| Empty State | Display when no products exist |
| Retry Request | Fetch products again |

**API Endpoint:**

```http
GET /products
```

### Module 2: Search Products

Allow users to search products by keyword.

| Feature | Description |
|---|---|
| Search Input | Enter product keywords |
| Search Button | Submit search request |
| Live Search | Search while typing |
| Search by Title | Find products by name |
| Search by Description | Find products by description |
| Clear Search | Reset search input |
| Search Results | Display matching products |
| No Results | Display when nothing matches |

**API Endpoint:**

```http
GET /products/search?q=phone
```

### Module 3: Category Filtering

Allow users to browse products by category.

| Feature | Description |
|---|---|
| Get Categories | Fetch available categories |
| Category Dropdown | Select a category |
| Category Sidebar | Display category navigation |
| Category Cards | Display category options |
| Category Filtering | Show products in selected category |
| All Categories | Display all products |
| Active Category | Highlight selected category |

**API Endpoints:**

```http
GET /products/categories
GET /products/category/smartphones
```

### Module 4: Product Filtering

Allow users to filter products based on different conditions.

| Feature | Description |
|---|---|
| Price Filter | Filter products by price |
| Minimum Price | Set minimum price |
| Maximum Price | Set maximum price |
| Rating Filter | Filter by rating |
| Brand Filter | Select product brand |
| Stock Filter | Filter by availability |
| Discount Filter | Filter discounted products |
| Multiple Filters | Apply multiple filters together |
| Active Filters | Display selected filters |
| Clear Filters | Reset all filters |

Note: Some filtering features will be implemented using JavaScript on the fetched product data.

### Module 5: Product Sorting

Allow users to change the order of displayed products.

| Feature | Description |
|---|---|
| Default Sorting | Display default product order |
| Price Low to High | Sort by ascending price |
| Price High to Low | Sort by descending price |
| Rating Highest | Show highest-rated products first |
| Rating Lowest | Show lowest-rated products first |
| Name A-Z | Sort alphabetically |
| Name Z-A | Sort reverse alphabetically |
| Highest Discount | Show highest discounts first |
| Reset Sorting | Restore default order |

**API Example:**

```http
GET /products?sortBy=price&order=asc
```

### Module 6: Pagination

Divide products into multiple pages.

| Feature | Description |
|---|---|
| Pagination | Divide products into pages |
| Previous Button | Navigate to previous page |
| Next Button | Navigate to next page |
| Page Numbers | Navigate directly to a page |
| Active Page | Highlight current page |
| Products Per Page | Select number of products |
| Total Products | Display total product count |
| Total Pages | Calculate total pages |
| Skip Products | Skip existing products |
| Reset Pagination | Return to the first page |

**API Example:**

```http
GET /products?limit=10&skip=10
```

### Module 7: Product Details

Display detailed information about an individual product.

| Feature | Description |
|---|---|
| Single Product | Fetch product using ID |
| Product Title | Display product name |
| Description | Display product description |
| Main Image | Display primary product image |
| Image Gallery | Display multiple images |
| Image Selection | Switch product images |
| Image Zoom | Zoom product image |
| Product Price | Display product price |
| Discount Calculation | Calculate discounted price |
| Product Rating | Display product rating |
| Product Brand | Display brand |
| Product SKU | Display product SKU |
| Product Stock | Display available quantity |
| Dimensions | Display product dimensions |
| Weight | Display product weight |
| Warranty | Display warranty information |
| Shipping | Display shipping information |
| Return Policy | Display return policy |
| Related Products | Display similar products |

**API Endpoint:**

```http
GET /products/1
```

### Module 8: Product CRUD Operations

Implement product management functionality.

| Feature | HTTP Method | API Endpoint |
|---|---|---|
| Get Products | GET | `/products` |
| Get Single Product | GET | `/products/1` |
| Add Product | POST | `/products/add` |
| Update Product | PUT | `/products/1` |
| Partial Update | PATCH | `/products/1` |
| Delete Product | DELETE | `/products/1` |

#### CRUD Features

- Add Product Form
- Edit Product Form
- Delete Product
- Delete Confirmation Modal
- Form Validation
- Required Field Validation
- Price Validation
- Stock Validation
- Success Notifications
- Error Notifications
- Product Management Table
- Search Products in Table
- Product Table Pagination

**Important:** DummyJSON simulates POST, PUT, PATCH, and DELETE operations. These operations return example responses but do not permanently modify the server database.

---

## 4. Application Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Main homepage |
| Products | `/products` | Product listing |
| Product Details | `/products/:id` | Individual product information |
| Admin Products | `/admin/products` | Product management |
| Add Product | `/admin/products/add` | Add a new product |
| Edit Product | `/admin/products/edit/:id` | Edit product information |

---

## 5. Project Folder Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   ├── CategoryFilter.jsx
│   ├── PriceFilter.jsx
│   ├── SortDropdown.jsx
│   ├── Pagination.jsx
│   └── Loading.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   └── AdminProducts.jsx
│
├── services/
│   └── productService.js
│
├── App.jsx
│
└── main.jsx
```

### Folder Responsibilities

**components/**

Contains reusable UI components such as product cards, search bars, filters, and pagination.

**pages/**

Contains application pages such as Home, Products, Product Details, and Admin Products.

**services/**

Contains API functions responsible for communicating with DummyJSON.

**assets/**

Contains local images, icons, and other static resources.

---

## 6. Development Roadmap

Development will follow these phases to ensure the fundamentals are understood before moving to advanced functionality.

### Phase 1: Product Listing

- Fetch products using Fetch API.
- Understand async/await.
- Use useEffect and useState.
- Display products using map().
- Create reusable ProductCard components.
- Implement loading and error states.

### Phase 2: Search and Category

- Build search input.
- Search products through API.
- Implement live search.
- Fetch categories.
- Implement category filtering.
- Handle empty search results.

### Phase 3: Filtering and Sorting

- Filter products by price.
- Filter products by rating.
- Filter products by brand.
- Sort products by price.
- Sort products by rating.
- Combine multiple filters.

### Phase 4: Pagination

- Implement limit and skip.
- Create pagination component.
- Add previous and next buttons.
- Display page numbers.
- Calculate total pages.
- Reset pagination when filters change.

### Phase 5: Product Details

- Implement React Router.
- Navigate to product details.
- Fetch individual products using ID.
- Build image gallery.
- Display complete product information.
- Display related products.

### Phase 6: Product CRUD

- Build product management table.
- Create add product form.
- Implement POST requests.
- Create edit product form.
- Implement PUT and PATCH requests.
- Implement DELETE requests.
- Add form validation.
- Add confirmation dialogs.

### Phase 7: UI and Optimization

- Make application responsive.
- Improve mobile layouts.
- Add skeleton loading.
- Add toast notifications.
- Improve error handling.
- Organize API services.
- Optimize component rendering.
- Test application functionality.

---

## 7. React Concepts Practiced

| React / JavaScript Concept | Application |
|---|---|
| useState | Manage component state |
| useEffect | Fetch API data |
| Props | Pass product information |
| Components | Reusable UI |
| Conditional Rendering | Loading, error, and empty states |
| map() | Display product lists |
| filter() | Filter products |
| find() | Find individual products |
| sort() | Sort products |
| reduce() | Calculate totals and statistics |
| async/await | Handle asynchronous requests |
| try/catch/finally | Handle errors and loading |
| React Router | Navigate between pages |
| useParams | Get product ID from URL |
| useNavigate | Navigate programmatically |
| Controlled Inputs | Search and product forms |
| Custom Hooks | Reuse application logic |

---

## 8. Installation and Setup

### Step 1: Clone the Project

```bash
git clone <repository-url>
```

### Step 2: Navigate to Project Folder

```bash
cd react-ecommerce
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Install Required Packages

```bash
npm install react-router-dom react-icons
```

### Step 5: Start Development Server

```bash
npm run dev
```

### Step 6: Open Application

```text
http://localhost:5173
```

---

## 9. API Response Structure

The main products endpoint returns an object containing products and pagination information.

Example:

```json
{
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "description": "Product description",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 10.48,
      "rating": 4.5,
      "stock": 99,
      "brand": "Example Brand",
      "thumbnail": "https://example.com/image.jpg",
      "images": [
        "https://example.com/image.jpg"
      ]
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 30
}
```

---

## 10. Project Development Rules

To maintain clean and understandable code:

1. Use reusable components.
2. Keep API logic separate from UI components when appropriate.
3. Use meaningful variable and function names.
4. Use async/await for asynchronous requests.
5. Handle loading, error, and empty states.
6. Use unique product IDs as React keys.
7. Avoid unnecessary API requests.
8. Keep components focused on one responsibility.
9. Make layouts responsive.
10. Validate forms before submitting.
11. Use semantic HTML.
12. Keep state as simple as possible.

---

## 11. Project Scope and Limitations

This project focuses exclusively on the DummyJSON Products API and its related endpoints.

### Included

- Product listing
- Product search
- Category filtering
- Product filtering
- Product sorting
- Pagination
- Product details
- Product CRUD operations

### Not Included

- User authentication
- User registration
- Shopping cart backend
- Payment processing
- Order management
- Real database management
- Real inventory management

### API Limitations

DummyJSON is a mock REST API designed for frontend development and practice.

- Product data is provided by DummyJSON.
- POST operations simulate adding products.
- PUT and PATCH operations simulate updating products.
- DELETE operations simulate deleting products.
- Server-side changes are not permanently saved.

---

## 12. Project Goals

By completing this project, the developer should be able to:

- Understand React fundamentals.
- Build reusable UI components.
- Integrate REST APIs.
- Handle asynchronous JavaScript.
- Manage component state.
- Implement search and filtering.
- Implement sorting and pagination.
- Build dynamic product detail pages.
- Implement CRUD operations.
- Design responsive interfaces.
- Organize a real-world React project.
- Debug frontend application issues.

---

## 13. Final Project Objective

Build a complete, responsive E-Commerce Product Management frontend that allows users to browse, search, filter, sort, paginate, and view products, while providing a product management interface for creating, updating, and deleting products.

**Main Focus:** React JS, JavaScript, API Integration, Component Architecture, Responsive UI, and Frontend Engineering.

---

**Data Source:** [DummyJSON Products API](https://dummyjson.com/products)

**Documentation:** [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)