// Sample data seeder for Restaurant Management System
// Run this file to populate your database with sample menu items and gallery images

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');
const Gallery = require('./models/Gallery');

dotenv.config();

// Sample food items with stock images (no upload needed)
// Prices in PKR (Pakistani Rupees)
const sampleFoods = [
  {
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with tomato sauce, fresh mozzarella, basil, and olive oil',
    price: 1299,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    availability: true
  },
  {
    name: 'Pepperoni Pizza',
    description: 'Traditional pizza topped with spicy pepperoni and melted mozzarella cheese',
    price: 1499,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800',
    availability: true
  },
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, pickles, and special sauce',
    price: 1099,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    availability: true
  },
  {
    name: 'Bacon Burger',
    description: 'Premium beef burger with crispy bacon, cheese, and BBQ sauce',
    price: 1299,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800',
    availability: true
  },
  {
    name: 'BBQ Ribs',
    description: 'Slow-cooked tender ribs glazed with our signature smoky BBQ sauce',
    price: 1899,
    category: 'BBQ',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    availability: true
  },
  {
    name: 'Grilled Chicken BBQ',
    description: 'Marinated chicken breast grilled to perfection with BBQ glaze',
    price: 1499,
    category: 'BBQ',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
    availability: true
  },
  {
    name: 'Chicken Nuggets',
    description: 'Crispy golden chicken nuggets served with dipping sauces',
    price: 799,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800',
    availability: true
  },
  {
    name: 'French Fries',
    description: 'Crispy golden fries seasoned with sea salt',
    price: 499,
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
    availability: true
  },
  {
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemons and mint leaves',
    price: 399,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=800',
    availability: true
  },
  {
    name: 'Iced Coffee',
    description: 'Cold brew coffee served over ice with your choice of milk',
    price: 499,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800',
    availability: true
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate layer cake with creamy chocolate ganache frosting',
    price: 699,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    availability: true
  },
  {
    name: 'Cheesecake',
    description: 'Classic New York style cheesecake with graham cracker crust',
    price: 799,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800',
    availability: true
  }
];

// Sample gallery images
const sampleGallery = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200',
    title: 'Gourmet Burger Platter',
    category: 'Food'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200',
    title: 'Delicious Pizza',
    category: 'Food'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    title: 'Fine Dining Experience',
    category: 'Food'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200',
    title: 'Restaurant Interior',
    category: 'Interior'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    title: 'Cozy Dining Area',
    category: 'Interior'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    title: 'Modern Restaurant Setup',
    category: 'Interior'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200',
    title: 'Special Event Night',
    category: 'Events'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1200',
    title: 'Birthday Celebration',
    category: 'Events'
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Food.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample food items
    await Food.insertMany(sampleFoods);
    console.log(`✅ Added ${sampleFoods.length} menu items`);

    // Insert sample gallery images
    await Gallery.insertMany(sampleGallery);
    console.log(`✅ Added ${sampleGallery.length} gallery images`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nSample data includes:');
    console.log('- 12 Menu Items (Pizza, Burgers, BBQ, Fast Food, Drinks, Desserts)');
    console.log('- 8 Gallery Images (Food, Interior, Events)');
    console.log('\nYou can now:');
    console.log('1. Browse the menu at http://localhost:3000/menu');
    console.log('2. View gallery at http://localhost:3000/gallery');
    console.log('3. Login as admin to manage items');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
