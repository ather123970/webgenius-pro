# Order System Documentation

## Overview
Complete order management system with payment validation, order tracking, and email confirmations.

---

## Features Implemented

### 1. **4-Step Order Form** (`/order`)
The order form now has 4 steps:

#### Step 1: Contact Details
- Full Name
- Email
- Phone
- Company

#### Step 2: Project Details
- Service Type (Web App, Shopify, SEO, UI/UX Design)
- Budget Range (30k-70k, 70k-150k, 150k-300k, 300k+)
- Project Description

#### Step 3: Payment Details (30% Advance)
- **Automatic calculation** of required 30% advance payment based on selected service and budget
- **Payment amount input** field where user enters amount paid
- **Payment validation** - checks thousands only (ignores hundreds and below)
  - Example: If 30k package requires 9k advance, user can enter 9000, 9100, 9200, etc. (all round to 9k)
- **Payment proof screenshot upload** (JPG/PNG)
- **Error messages** if payment doesn't match

#### Step 4: Final Details
- Project deadline (optional)
- Additional files upload (optional)

### 2. **Payment Validation System**

**Package Pricing Configuration:**
```javascript
PACKAGES = {
    'web-app': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    },
    // Same for shopify, seo, design
}
```

**Validation Logic:**
- Extracts thousands from payment amount: `Math.floor(amount / 1000)`
- Compares only thousands (ignores hundreds and below)
- Example: 3100 PKR → 3k, 3500 PKR → 3k, 3999 PKR → 3k (all valid for 3k requirement)
- Requires payment proof screenshot before order submission

### 3. **Order ID Generation**

**Format:** `ORD-{TIMESTAMP}-{RANDOM}`
- Example: `ORD-ABCD1234-XYZ789`
- Unique for each order
- Displayed to user after successful order

### 4. **Order Confirmation Email**

**Template:** `template_1ubs0z8` (EmailJS)

**Email Variables:**
- `order_id` - Unique order ID
- `from_name` - Customer name
- `from_email` - Customer email
- `phone` - Customer phone
- `company` - Company name
- `service` - Service type
- `budget` - Budget range
- `advance_payment` - 30% advance amount
- `payment_received` - Amount actually paid
- `description` - Project description
- `deadline` - Project deadline
- `order_date` - Order submission date/time
- `order_status` - "Confirmed - Payment Received"
- `tracking_link` - Link to track order

### 5. **Order Tracking Page** (`/track-order`)

**Features:**
- Search orders by Order ID
- Real-time order status display
- Project progress timeline with 4 stages:
  1. Order Confirmed (Payment Received)
  2. In Development (Day 1+)
  3. Quality Review (Day 7+)
  4. Delivery Ready (Day 14+)
- Contact information display
- Project details summary
- Support contact options (Email & WhatsApp)

**Data Storage:**
- Orders stored in browser's `localStorage` under key `"orders"`
- Each order contains:
  ```javascript
  {
    orderId: "ORD-...",
    name, email, phone, company,
    serviceType, budget, description, deadline,
    paymentAmount, paymentProof,
    status: "Confirmed",
    createdAt: ISO timestamp
  }
  ```

---

## How It Works

### User Flow:

1. **User fills order form** (4 steps)
2. **Step 3 validation:**
   - System shows required 30% advance based on selected package
   - User enters amount paid
   - System validates payment (thousands only)
   - User uploads payment proof screenshot
3. **Order submission:**
   - System generates unique Order ID
   - Sends confirmation email via EmailJS
   - Stores order in localStorage
   - Shows success message with Order ID
4. **Order tracking:**
   - User visits `/track-order` page
   - Enters Order ID to search
   - Views real-time project progress
   - Sees contact and project details

---

## Payment Validation Examples

### ✅ Valid Payments (for 9k requirement):
- 9000 PKR → 9k ✓
- 9100 PKR → 9k ✓
- 9500 PKR → 9k ✓
- 9999 PKR → 9k ✓

### ❌ Invalid Payments (for 9k requirement):
- 8000 PKR → 8k ✗ (too low)
- 10000 PKR → 10k ✗ (too high)
- 8500 PKR → 8k ✗ (too low)

---

## EmailJS Configuration

**Service ID:** `service_bopwq39`
**Template ID:** `template_1ubs0z8` (Order Confirmation)
**Public Key:** `NP2Sat5tqcJqQqoQ2`

### Email Template Content (in EmailJS):

```
Subject: New Order from {{from_name}} [{{order_id}}]

Content:
Customer Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}

Order Details:
Service: {{service}}
Budget: {{budget}}
Description: {{description}}
Deadline: {{deadline}}

Payment Details:
Required Advance (30%): {{advance_payment}} PKR
Amount Received: {{payment_received}} PKR
Order Date: {{order_date}}
Status: {{order_status}}

Tracking Link: {{tracking_link}}

---
Sent from AtherWeb Order Form
```

---

## File Structure

```
app/
├── components/sections/
│   └── OrderForm.tsx (Updated with payment validation)
├── track-order/
│   └── page.tsx (New - Order tracking page)
├── book-meeting/
│   └── page.tsx (Booking consultation)
└── globals.css (Updated with scrollbar-hide utility)
```

---

## Key Functions

### `validatePayment()`
- Validates payment amount against selected package
- Checks thousands only
- Requires payment proof
- Returns boolean

### `generateOrderId()`
- Creates unique Order ID
- Format: `ORD-{TIMESTAMP}-{RANDOM}`
- Returns string

### `getThousands(amount: number)`
- Extracts thousands from amount
- Example: 3100 → 3
- Returns number

---

## Testing Checklist

- [ ] Fill order form with all details
- [ ] Verify 30% advance calculation on Step 3
- [ ] Test payment validation with valid amounts
- [ ] Test payment validation with invalid amounts
- [ ] Upload payment proof screenshot
- [ ] Submit order and verify Order ID generation
- [ ] Check email confirmation received
- [ ] Visit `/track-order` page
- [ ] Search order by Order ID
- [ ] Verify order timeline displays correctly
- [ ] Check contact information displays correctly
- [ ] Verify support links work (Email & WhatsApp)

---

## Future Enhancements

1. **Backend Integration:**
   - Replace localStorage with database
   - Add real payment gateway integration
   - Implement admin dashboard for order management

2. **Additional Features:**
   - Email notifications for status updates
   - SMS notifications
   - File attachment support in emails
   - Order history page for logged-in users
   - Payment receipt generation (PDF)

3. **Security:**
   - Add CSRF protection
   - Implement rate limiting
   - Add file upload validation
   - Encrypt sensitive data

---

## Support

For issues or questions:
- Email: support@atherweb.agency
- WhatsApp: +92 300 1234567
