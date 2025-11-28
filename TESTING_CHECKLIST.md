# 🧪 Testing Checklist - Order & Booking System

## 📋 Quick Test Guide

### **Before Testing:**
✅ **Dev Server Running:** Make sure your dev server is running (`npm run dev`)
✅ **EmailJS Configured:** Verify your EmailJS credentials are correct
✅ **Business Email Ready:** Check `businessman2124377@gmail.com` is accessible

---

## 📦 **TEST 1: ORDER FORM**

### **Step 1: Navigate to Order Form**
1. Open browser: `http://localhost:3000/order`
2. Should see 4-step order form

### **Step 2: Fill Step 1 - Contact Details**
- **Name:** Test Customer
- **Email:** test@example.com
- **Phone:** +92 300 1234567
- **Company:** Test Company
- Click **"Next"**

### **Step 3: Fill Step 2 - Project Details**
- **Service Type:** Web App
- **Budget Range:** 30k-70k
- **Description:** This is a test order for web development
- Click **"Next"**

### **Step 4: Fill Step 3 - Payment Details**
**✨ THIS IS THE KEY TEST!**

1. **Check Advance Payment Display:**
   - Should show: "Your Selected Package: 30k-70k"
   - Should show: "💰 Advance Payment Required: PKR 9,000"
   - Should show: "Payment Breakdown"
   - Advance (30%): PKR 9,000
   - Remaining (70%): PKR 21,000

2. **Enter Payment Amount:**
   - **Amount Paid:** `9500` (this should be accepted - 9k)
   - **DO NOT ENTER:** 8000 or 10000 (these will be rejected)

3. **Upload Payment Proof:**
   - Click "Click to upload payment screenshot"
   - Upload any image file (JPG/PNG)
   - Should show: "✓ filename.jpg"

4. **Click "Next"**

### **Step 5: Fill Step 4 - Final Details**
- **Deadline:** 2025-12-31 (or any future date)
- **Additional Files:** (Optional - skip for now)
- Click **"Confirm Order"**

### **Step 6: Verify Success**
✅ Should see success message with Order ID  
✅ Should show tracking link  
✅ Should redirect after 5 seconds  

### **Step 7: Check Emails**
**Check BOTH emails:**

1. **Customer Email:** (test@example.com)
   - Subject: "Order Confirmed - ORD-XXXXX | AtherWeb"
   - Should contain Order ID, payment details, tracking link

2. **Business Email:** (businessman2124377@gmail.com)
   - Subject: "Order Confirmed - ORD-XXXXX | AtherWeb"
   - Should contain all order details, admin notification flag

---

## 📅 **TEST 2: BOOKING FORM**

### **Step 1: Navigate to Booking Form**
1. Open browser: `http://localhost:3000/book-meeting`
2. Should see booking consultation form

### **Step 2: Fill Booking Form**
- **Name:** Test Booker
- **Email:** booker@example.com
- **Phone:** +92 300 7654321
- **Company:** Booking Company
- **Service:** Web App Development
- **Package:** 30k-70k
- **Preferred Date:** 2025-12-05
- **Preferred Time:** 10:00 AM
- **Message:** I want to discuss my web project
- Click **"Book Meeting"**

### **Step 3: Verify Success**
✅ Should see success message  
✅ Should redirect to homepage after 3 seconds  

### **Step 4: Check Emails**
**Check BOTH emails:**

1. **Customer Email:** (booker@example.com)
   - Subject: "Booking Confirmed - MEET-XXXXX | AtherWeb"
   - Should contain meeting details, customer info

2. **Business Email:** (businessman2124377@gmail.com)
   - Subject: "Booking Confirmed - MEET-XXXXX | AtherWeb"
   - Should contain all booking details, admin notification flag

---

## 🔍 **TEST 3: ORDER TRACKING**

### **Step 1: Get Order ID from Test 1**
- Copy the Order ID from the success message or email
- Example: `ORD-ABCD1234-XYZ789`

### **Step 2: Navigate to Tracking Page**
1. Open browser: `http://localhost:3000/track-order`
2. Or use the tracking link from email

### **Step 3: Search Order**
1. **Enter Order ID:** Paste the Order ID
2. Click **"Track"**

### **Step 4: Verify Tracking Results**
✅ Should show order details  
✅ Should show project timeline  
✅ Should show contact information  
✅ Should show project details  
✅ Should show support links  

---

## 🎮 **TEST 4: SERVICES SCROLLING**

### **Step 1: Navigate to Homepage**
1. Open browser: `http://localhost:3000`
2. Scroll down to Services section

### **Step 2: Test Scrolling**
✅ Should see services animating horizontally  
✅ Should be able to scroll with mouse wheel  
✅ Animation should pause when scrolling  
✅ Animation should resume after 3 seconds  

---

## 🚨 **COMMON ISSUES & SOLUTIONS**

### **Issue: Payment Validation Fails**
**Problem:** Entering payment amount shows error
**Solution:** 
- For 30k-70k package: Enter 9000-9999 (all = 9k)
- For 70k-150k package: Enter 21000-21999 (all = 21k)

### **Issue: Emails Not Received**
**Problem:** No emails in inbox
**Solution:**
- Check spam/promotions folder
- Verify EmailJS credentials
- Check Gmail service connection

### **Issue: Order Tracking Not Working**
**Problem:** Order not found
**Solution:**
- Copy exact Order ID (case-sensitive)
- Check localStorage has order data
- Refresh tracking page

### **Issue: Dev Server Not Running**
**Problem:** Can't access pages
**Solution:**
- Run `npm run dev` in project folder
- Wait for compilation to complete
- Access `http://localhost:3000`

---

## ✅ **SUCCESS CRITERIA**

### **Order Form Test:**
- [ ] All 4 steps work correctly
- [ ] Payment validation accepts correct amounts
- [ ] Payment proof upload works
- [ ] Order ID generated
- [ ] Customer email received
- [ ] Business email received
- [ ] Success message displayed

### **Booking Form Test:**
- [ ] Form submits successfully
- [ ] Customer email received
- [ ] Business email received
- [ ] Success message displayed
- [ ] Redirects to homepage

### **Order Tracking Test:**
- [ ] Order found by ID
- [ ] Timeline displays correctly
- [ ] All order details shown
- [ ] Support links work

### **Services Scrolling Test:**
- [ ] Horizontal scrolling works
- [ ] Animation pauses on scroll
- [ ] Animation resumes after 3 seconds
- [ ] All services visible

---

## 📊 **Expected Results**

### **Order Form Results:**
- **Order ID:** Format `ORD-XXXXX-XXXXXX`
- **Customer Email:** Professional confirmation with tracking link
- **Business Email:** Complete order details with admin flag
- **Payment Validation:** 9000-9999 accepted for 9k requirement

### **Booking Form Results:**
- **Meeting ID:** Format `MEET-XXXXX-XXXXXX`
- **Customer Email:** Meeting confirmation with details
- **Business Email:** Complete booking details with admin flag

### **Tracking Results:**
- **Order Status:** "Confirmed"
- **Timeline:** 4 stages with dates
- **Details:** All customer and project information

---

## 🎯 **Quick Test Summary**

**If ALL tests pass:** ✅ System is working perfectly!

**If some tests fail:** 📝 Note which tests failed and check the troubleshooting section.

**Need help?** 📞 Contact support with test results.

---

**Happy Testing! 🚀**

Remember: This is a complete order management system with payment validation, email notifications, and order tracking. Take your time to test each feature thoroughly.
