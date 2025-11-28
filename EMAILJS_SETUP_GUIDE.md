# 📧 EmailJS Setup Guide for AtherWeb - Complete

## Your Current Configuration

```
Service ID: service_bopwq39
Public Key: NP2Sat5tqcJqQqoQ2
Order Template ID: template_1ubs0z8
Booking Template ID: template_wkgimvt
```

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account
1. Visit **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email address

### Step 2: Add Gmail Service
1. **Login** to EmailJS Dashboard
2. Go to **"Email Services"** (left sidebar)
3. Click **"Add New Service"**
4. Select **"Gmail"**
5. Click **"Connect Account"**
6. Sign in with your Gmail account
7. Allow EmailJS permissions
8. Give it a name: **"Gmail Orders"**
9. **COPY YOUR SERVICE ID** (looks like: `service_abc123`)

### Step 3: Get Your Public Key
1. Go to **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find **"Public Key"** section
4. **COPY YOUR PUBLIC KEY** (looks like: `Abc123XyZ-_456`)

---

## 📧 Template 1: ORDER CONFIRMATION

### Create Template in EmailJS:

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name**: `Order Confirmation`
4. **Template ID**: `template_1ubs0z8` (or auto-generated)

### Template Content:

```html
Subject: Order Confirmed - {{order_id}} | AtherWeb

<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066FF 0%, #00D4FF 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #0066FF; }
        .section h3 { margin-top: 0; color: #0066FF; }
        .payment-box { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .payment-amount { font-size: 24px; font-weight: bold; color: #0066FF; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 12px 30px; background: #0066FF; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Order Confirmed!</h1>
            <p>Your order has been received and payment verified</p>
        </div>

        <div class="section">
            <h3>📋 Order Information</h3>
            <p><strong>Order ID:</strong> {{order_id}}</p>
            <p><strong>Order Date:</strong> {{order_date}}</p>
            <p><strong>Status:</strong> {{order_status}}</p>
        </div>

        <div class="section">
            <h3>👤 Customer Details</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Company:</strong> {{company}}</p>
        </div>

        <div class="section">
            <h3>💼 Project Details</h3>
            <p><strong>Service:</strong> {{service}}</p>
            <p><strong>Budget:</strong> {{budget}}</p>
            <p><strong>Deadline:</strong> {{deadline}}</p>
            <p><strong>Description:</strong> {{description}}</p>
        </div>

        <div class="payment-box">
            <h3>💳 Payment Information</h3>
            <p><strong>Required Advance (30%):</strong> <span class="payment-amount">PKR {{advance_payment}}</span></p>
            <p><strong>Amount Received:</strong> <span class="payment-amount">PKR {{payment_received}}</span></p>
        </div>

        <div class="section">
            <h3>📍 Track Your Order</h3>
            <p>Click the button below to track your project progress:</p>
            <a href="{{tracking_link}}" class="button">Track Your Order</a>
        </div>

        <div class="footer">
            <p>Thank you for choosing AtherWeb! We'll start working on your project right away.</p>
            <p>If you have any questions, contact us at support@atherweb.agency or WhatsApp: +92 300 1234567</p>
            <p>&copy; 2025 AtherWeb. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### Template Variables (Used in Code):
```javascript
{
    order_id: "ORD-ABCD1234-XYZ789",
    from_name: "Customer Name",
    from_email: "customer@email.com",
    phone: "+92 300 1234567",
    company: "Company Name",
    service: "Web App",
    budget: "30k-70k",
    advance_payment: "9000",
    payment_received: "9000",
    description: "Project description",
    deadline: "2025-12-31",
    order_date: "11/28/2025, 4:30 AM",
    order_status: "Confirmed - Payment Received",
    tracking_link: "https://atherweb.agency/track-order?id=ORD-ABCD1234-XYZ789"
}
```

---

## 📧 Template 2: BOOKING CONFIRMATION (NEW)

### Create Template in EmailJS:

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name**: `Booking Confirmation`
4. **Template ID**: `template_wkgimvt` (YOUR TEMPLATE)

### Template Content:

```html
Subject: Booking Confirmed - {{meeting_id}} | AtherWeb

<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10B981 0%, #34D399 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #10B981; }
        .section h3 { margin-top: 0; color: #10B981; }
        .meeting-box { background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid #10B981; }
        .meeting-time { font-size: 18px; font-weight: bold; color: #10B981; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 12px 30px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📅 Consultation Booking Confirmed!</h1>
            <p>Your free 30-minute consultation has been scheduled</p>
        </div>

        <div class="meeting-box">
            <h3>🕐 Meeting Details</h3>
            <p><strong>Meeting ID:</strong> {{meeting_id}}</p>
            <p><strong>Preferred Date:</strong> <span class="meeting-time">{{preferred_date}}</span></p>
            <p><strong>Preferred Time:</strong> <span class="meeting-time">{{preferred_time}}</span></p>
            <p><strong>Duration:</strong> 30 minutes</p>
        </div>

        <div class="section">
            <h3>👤 Your Information</h3>
            <p><strong>Name:</strong> {{from_name}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Phone:</strong> {{phone}}</p>
            <p><strong>Company:</strong> {{company}}</p>
        </div>

        <div class="section">
            <h3>💼 Consultation Details</h3>
            <p><strong>Service:</strong> {{service}}</p>
            <p><strong>Budget Range:</strong> {{budget}}</p>
            <p><strong>Your Message:</strong> {{message}}</p>
        </div>

        <div class="section">
            <h3>✅ What's Next?</h3>
            <p>1. We'll send you a meeting link via email 24 hours before the call</p>
            <p>2. Join the call at your preferred time</p>
            <p>3. We'll discuss your project and provide recommendations</p>
            <p>4. Receive a custom proposal after the meeting</p>
        </div>

        <div class="section">
            <h3>📞 Need to Reschedule?</h3>
            <p>Contact us anytime:</p>
            <p>📧 Email: support@atherweb.agency</p>
            <p>💬 WhatsApp: +92 300 1234567</p>
        </div>

        <div class="footer">
            <p>We're excited to discuss your project with you!</p>
            <p>&copy; 2025 AtherWeb. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

### Template Variables (Used in Code):
```javascript
{
    meeting_id: "MEET-ABCD1234-XYZ789",
    from_name: "Customer Name",
    from_email: "customer@email.com",
    phone: "+92 300 1234567",
    company: "Company Name",
    service: "Web App Development",
    budget: "30k-70k",
    preferred_date: "2025-12-05",
    preferred_time: "10:00 AM",
    message: "I want to discuss my project",
    booking_date: "11/28/2025, 4:30 AM"
}
```

---

## 🔧 How to Use in Your Code

### For Order Confirmation (Already Implemented):
```javascript
const result = await emailjs.send(
    'service_bopwq39',           // Service ID
    'template_1ubs0z8',          // Order Template ID
    {
        order_id: newOrderId,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.serviceType,
        budget: formData.budget,
        advance_payment: packageInfo.advance,
        payment_received: formData.paymentAmount,
        description: formData.description,
        deadline: formData.deadline,
        order_date: new Date().toLocaleString(),
        order_status: 'Confirmed - Payment Received',
        tracking_link: `${window.location.origin}/track-order?id=${newOrderId}`
    },
    'NP2Sat5tqcJqQqoQ2'          // Public Key
);
```

### For Booking Confirmation (To Implement):
```javascript
const result = await emailjs.send(
    'service_bopwq39',              // Service ID
    'template_wkgimvt',              // Booking Template ID
    {
        meeting_id: generateMeetingId(),
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.package,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message,
        booking_date: new Date().toLocaleString()
    },
    'NP2Sat5tqcJqQqoQ2'             // Public Key
);
```

---

## 📋 Checklist

- [ ] Create EmailJS account
- [ ] Add Gmail service
- [ ] Copy Service ID
- [ ] Copy Public Key
- [ ] Create Order Confirmation template
- [ ] Create Booking Confirmation template
- [ ] Copy template IDs
- [ ] Update code with your IDs
- [ ] Test order submission
- [ ] Test booking submission
- [ ] Verify customer emails received
- [ ] Verify business emails received (businessman2124377@gmail.com)
- [ ] Set up Gmail filters for business notifications

---

## 🆘 Troubleshooting

### Issue: "Failed to send email"
**Solution:** Check that your Service ID and Public Key are correct

### Issue: Template variables not showing
**Solution:** Make sure variable names match exactly (case-sensitive): `{{variable_name}}`

### Issue: Email not received
**Solution:** Check spam folder, or verify Gmail service is connected in EmailJS

### Issue: "Invalid template ID"
**Solution:** Copy the exact template ID from EmailJS dashboard

---

## 🏢 Business Email Notifications

### **Dual Email System:**
Your system now sends **2 emails** for every submission:

1. **Customer Email** - Confirmation to the customer
2. **Business Email** - Notification to `businessman2124377@gmail.com`

### **What Business Email Receives:**
- ✅ Complete order details
- ✅ Customer information
- ✅ Payment information
- ✅ Tracking links
- ✅ Admin notification flag

### **Business Email Setup:**
- **Email:** businessman2124377@gmail.com
- **Template:** Same as customer template
- **Additional Variables:**
  - `to_email: 'businessman2124377@gmail.com'`
  - `notification_type: 'ADMIN_NOTIFICATION'`

### **Benefits:**
- 🚨 Instant order notifications
- 📊 Complete order details in one email
- 🔗 Direct tracking links
- 📱 Mobile notifications enabled

See **`BUSINESS_NOTIFICATIONS.md`** for complete setup guide.

---

## 📞 Support

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **AtherWeb Support:** support@atherweb.agency
- **WhatsApp:** +92 300 1234567
