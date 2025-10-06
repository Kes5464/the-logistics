# 🚀 Shippo API Integration Setup Guide

Follow these steps to integrate real package tracking with Shippo's free tier.

## Step 1: Get Your Shippo API Key

1. **Sign up** at [goshippo.com](https://goshippo.com/)
2. **Create account** with your business email
3. **Verify email** - check your inbox
4. **Login** to your Shippo dashboard
5. **Navigate** to Settings → API
6. **Copy** your **Test API Key** (starts with `shippo_test_`)

## Step 2: Add Your API Key

1. **Open** `js/script.js` in a text editor
2. **Find** line 4: `SHIPPO_API_KEY: 'YOUR_SHIPPO_API_KEY_HERE'`
3. **Replace** `YOUR_SHIPPO_API_KEY_HERE` with your actual API key
4. **Save** the file

```javascript
// Before
SHIPPO_API_KEY: 'YOUR_SHIPPO_API_KEY_HERE'

// After (example)
SHIPPO_API_KEY: 'shippo_test_abc123def456ghi789'
```

## Step 3: Enable Live API Mode

**Option 1: Automatic (Recommended)**
- Your API key is automatically detected
- Live mode activates when a valid key is found

**Option 2: Manual Toggle**
- Visit your tracking page
- Click "Switch to Live API" button
- Test with real tracking numbers

## Step 4: Test with Real Tracking Numbers

Try these **real carrier formats**:

### FedEx
- **Format**: 12-15 digits
- **Example**: `1234567890123`

### UPS  
- **Format**: 1Z + 16 characters
- **Example**: `1Z999AA1012345675`

### USPS
- **Format**: 20-26 digits
- **Example**: `12345678901234567890`

### DHL
- **Format**: 10-11 digits  
- **Example**: `1234567890`

## Step 5: Verify Integration

1. **Open** `tracking.html` in your browser
2. **Check** the API status indicator at the top
3. **Enter** a real tracking number
4. **Verify** you get live data (not sample data)

## 🎯 Expected Results

### ✅ Success Indicators
- API status shows "Using live Shippo API" 
- Real tracking data appears
- Timeline shows actual carrier events
- No sample data messages

### ❌ Troubleshooting
- **"API key needed"** → Add your Shippo API key
- **"API Error: 401"** → Check your API key is correct
- **"API Error: 404"** → Tracking number not found (normal)
- **"Unable to fetch"** → Check internet connection

## 📋 Free Tier Limits

Shippo's free tier includes:
- **100 tracking requests/month**
- **All major carriers supported**
- **Real-time updates**
- **No credit card required**

## 🔧 Advanced Configuration

### Custom Carrier Detection
Edit the `detectCarrier()` function in `script.js` to add more carrier patterns.

### Webhook Integration
For real-time updates, set up Shippo webhooks:
1. Go to Shippo Settings → Webhooks
2. Add your website URL
3. Handle webhook events in your backend

### Production Deployment
1. Use **Live API keys** (not test keys)
2. **Secure your API key** on the server side
3. **Implement rate limiting** to stay within limits
4. **Add error logging** for better debugging

## 🆘 Need Help?

- **Shippo Documentation**: [docs.goshippo.com](https://docs.goshippo.com/)
- **API Reference**: [goshippo.com/docs/reference](https://goshippo.com/docs/reference)
- **Support**: Contact Shippo support for API issues

---

🎉 **You're all set!** Your logistics website now has real package tracking powered by Shippo's API.