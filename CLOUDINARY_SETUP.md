# Cloudinary Setup Guide

This application uses **Cloudinary** for image management and storage. Follow these steps to set up Cloudinary for your restaurant application.

## Why Cloudinary?

- ✅ **Free Tier:** 25 GB storage + 25 GB bandwidth/month
- ✅ **Automatic Optimization:** Images are automatically compressed and optimized
- ✅ **CDN Delivery:** Fast image loading worldwide
- ✅ **Transformations:** Automatic resizing, format conversion, quality adjustment
- ✅ **No Server Storage:** Images stored in the cloud, not on your server

## Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a **free account**
3. Verify your email address
4. Log in to your Cloudinary dashboard

## Step 2: Get Your Credentials

After logging in, you'll see your **Dashboard** with your account details:

1. **Cloud Name:** Found at the top (e.g., `dpxyz1234`)
2. **API Key:** Found under "Account Details"
3. **API Secret:** Click on "Reveal" to see your API secret

## Step 3: Configure Backend Environment Variables

1. Navigate to your backend folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file (if you haven't already):
   ```bash
   copy .env.example .env
   ```

3. Add your Cloudinary credentials to `.env`:
   ```env
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   CLOUDINARY_API_KEY=your_api_key_here
   CLOUDINARY_API_SECRET=your_api_secret_here
   ```

4. Replace the placeholder values with your actual Cloudinary credentials

## Step 4: Test the Integration

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. Start your frontend:
   ```bash
   cd ../frontend
   npm start
   ```

3. Log in as admin and try uploading an image:
   - Go to **Admin Dashboard > Manage Menu**
   - Click **"+ Add New Item"**
   - Select an image file from your computer
   - Fill in the food details
   - Click **Create**

4. Check your Cloudinary dashboard:
   - Go to **Media Library**
   - You should see your uploaded image in the `restaurant/menu` folder

## Image Upload Features

### Menu Images
- **Folder:** `restaurant/menu`
- **Transformation:** Max 800x600px, auto quality, auto format
- **Accepted Formats:** JPG, PNG, GIF, WebP
- **Max Size:** 5MB per image

### Gallery Images
- **Folder:** `restaurant/gallery`
- **Transformation:** Max 1200x900px, auto quality, auto format
- **Accepted Formats:** JPG, PNG, GIF, WebP
- **Max Size:** 5MB per image

## Cloudinary Dashboard Features

### Media Library
- View all uploaded images
- Organize images in folders
- Delete unwanted images
- Download original files

### Transformations
All images are automatically:
- **Resized** to optimal dimensions
- **Compressed** for faster loading
- **Converted** to the best format (WebP for modern browsers)
- **Optimized** for SEO with proper metadata

### Usage Monitoring
- Check your storage usage
- Monitor bandwidth consumption
- View transformation credits used

## Troubleshooting

### Error: "Invalid cloud name"
- Double-check your `CLOUDINARY_CLOUD_NAME` in `.env`
- Make sure there are no spaces or quotes
- Restart your backend server after changing `.env`

### Error: "Upload failed"
- Verify your API Key and API Secret are correct
- Check if the image size exceeds 5MB limit
- Make sure the file format is supported (JPG, PNG, GIF, WebP)

### Images not showing
- Check if the upload was successful in Cloudinary dashboard
- Verify the image URL is correct in your database
- Check browser console for CORS errors

### Quota exceeded
- Free tier: 25 GB bandwidth/month
- Upgrade to paid plan if needed: [Cloudinary Pricing](https://cloudinary.com/pricing)
- Optimize image sizes before uploading

## Advanced Configuration (Optional)

### Custom Folder Structure
Edit `backend/controllers/menuController.js` or `galleryController.js`:

```javascript
folder: 'restaurant/menu/pizzas',  // Custom subfolder
```

### Higher Quality Images
```javascript
transformation: [
  { width: 1200, height: 900, crop: 'limit' },
  { quality: 90 },  // Higher quality (larger file size)
  { fetch_format: 'auto' }
]
```

### Different Image Formats
```javascript
transformation: [
  { width: 800, height: 600, crop: 'limit' },
  { format: 'webp' }  // Force WebP format
]
```

## Security Best Practices

1. ✅ **Never commit `.env` file** to Git (already in `.gitignore`)
2. ✅ **Use environment variables** for all credentials
3. ✅ **Restrict API access** in Cloudinary settings (optional)
4. ✅ **Enable** "Strict Transformations" in Cloudinary for production
5. ✅ **Rotate API secrets** periodically

## Free Tier Limits

- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** 25,000/month
- **Admin API calls:** 500/hour

These limits are more than sufficient for a restaurant website!

## Production Deployment

When deploying to Render/Railway/Heroku, add environment variables:

1. Go to your hosting dashboard
2. Navigate to **Environment Variables** section
3. Add:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Support Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js SDK Guide](https://cloudinary.com/documentation/node_integration)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)
- [Transformation Reference](https://cloudinary.com/documentation/image_transformations)

---

**That's it!** Your restaurant app now has professional image management with Cloudinary! 🎉

All images uploaded by admins will be automatically optimized, stored in the cloud, and delivered via CDN for fast loading worldwide.
