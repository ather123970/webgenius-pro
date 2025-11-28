# Quick Start Guide - Order System

## 🚀 What's New

### 1. Enhanced Order Form (`/order`)
- **4-step process** instead of 3
- **Payment validation** with 30% advance requirement
- **Order ID generation** for tracking
- **Payment proof upload** required

### 2. Order Tracking Page (`/track-order`)
- Search orders by Order ID
- View real-time project progress
- Track 4 project stages
- Contact support directly

### 3. Services Section (Scrollable)
- Horizontal scroll with mouse wheel
- Auto-play animation
- Smooth user interaction

---

## 📋 Order Form Steps

### Step 1: Contact Details
Fill in your basic information
- Name, Email, Phone, Company

### Step 2: Project Details
Select your service and budget
- Service Type
- Budget Range
- Project Description

### Step 3: Payment Details ⭐ NEW
**This is where payment validation happens:**

1. **System shows required 30% advance** based on your selected package
   - 30k-70k package → 9k advance required
   - 70k-150k package → 21k advance required
   - 150k-300k package → 45k advance required
   - 300k+ package → 90k advance required

2. **Enter amount you paid**
   - System checks thousands only
   - 9000, 9100, 9500, 9999 all count as 9k ✓
   - 8000 or 10000 will be rejected ✗

3. **Upload payment proof screenshot**
   - JPG or PNG format
   - Shows your payment confirmation

### Step 4: Final Details
- Project deadline (optional)
- Additional files (optional)

---

## 💳 Payment Validation Logic

**Checking Thousands Only:**
```
Amount Entered: 3100 PKR
Thousands: 3100 ÷ 1000 = 3 (rounded down)

Amount Entered: 3999 PKR
Thousands: 3999 ÷ 1000 = 3 (rounded down)

Amount Entered: 4000 PKR
Thousands: 4000 ÷ 1000 = 4 (rounded down)
```

**Why this approach?**
- Flexible for users (allows 100-900 PKR variance)
- Prevents accidental rejections
- Still ensures correct payment tier

---

## 📍 Order Tracking

### How to Track:
1. Go to `/track-order`
2. Enter your Order ID (e.g., `ORD-ABCD1234-XYZ789`)
3. Click "Track"
4. View your project progress

### What You'll See:
- ✅ Order Confirmed (Payment Received)
- ⏳ In Development (Day 1+)
- 🔍 Quality Review (Day 7+)
- 📦 Delivery Ready (Day 14+)

---

## 📧 Email Confirmation

After successful order:
1. **Order confirmation email** sent to your email address
2. **Contains:**
   - Order ID
   - Payment details
   - Project details
   - Tracking link
   - Support contact info

---

## 🔑 Order ID Format

**Format:** `ORD-{TIMESTAMP}-{RANDOM}`

**Example:** `ORD-ABCD1234-XYZ789`

**Save this ID!** You'll need it to track your order.

---

## ❌ Common Issues & Solutions

### Issue: "Payment mismatch! Required: PKR 9000 (9k), You entered: PKR 8000 (8k)"
**Solution:** Enter the correct amount. For 9k requirement, enter 9000 or higher (up to 9999).

### Issue: "Please upload payment proof screenshot"
**Solution:** Upload a JPG or PNG image of your payment confirmation.

### Issue: "Order not found"
**Solution:** Check your Order ID spelling. It's case-sensitive and in format `ORD-XXXXX-XXXXXX`.

### Issue: Email not received
**Solution:** Check spam folder. Contact support via WhatsApp if still not received.

---

## 📞 Support

- **Email:** support@atherweb.agency
- **WhatsApp:** +92 300 1234567
- **Website:** atherweb.agency

---

## 🎯 Next Steps After Order

1. **Receive confirmation email** with Order ID
2. **Save your Order ID** for tracking
3. **Visit `/track-order`** to monitor progress
4. **Receive updates** as project progresses
5. **Get notified** when project is ready for delivery

---

## 💡 Tips

- ✅ Keep your Order ID safe
- ✅ Save the confirmation email
- ✅ Check order status regularly
- ✅ Contact support if you have questions
- ✅ Upload clear payment proof screenshot

---

## 🔒 Security Notes

- Payment proof is stored securely
- Order data stored in browser (localStorage)
- Use HTTPS for all transactions
- Don't share your Order ID publicly

---

**Last Updated:** November 28, 2025
**Version:** 1.0
