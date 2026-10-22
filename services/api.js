export const CATEGORIES = ['All', 'Fashion', 'Electronics', 'Shoes', 'Beauty', 'Home'];

export const MOCK_PRODUCTS = [
  // FASHION (8 items)
  {
    id: 'prod-1',
    name: 'Black Winter Quilted Puffer Jacket',
    category: 'Fashion',
    price: 1499,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 6890,
    description:
      'Autumn and winter casual cotton-padded thermal jacket with water-resistant outer shell, stand collar, and zippered pockets for everyday warmth.',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'UrbanEdge',
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Antheaa Floral Print Tiered Midi Dress',
    category: 'Fashion',
    price: 1990,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 3356,
    description:
      'Black and rust orange floral print tiered midi flare dress crafted from breathable georgette fabric with a flattering sweetheart neckline.',
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'Antheaa',
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Mens Starry Sky Printed Cotton Shirt',
    category: 'Fashion',
    price: 799,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 1523,
    description:
      '100% combed breathable cotton casual shirt featuring an all-over modern print, spread collar, and tailored slim fit for effortless styling.',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'Highlander',
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Earthen Rose Pink Embroidered Maxi Dress',
    category: 'Fashion',
    price: 1900,
    originalPrice: 3299,
    rating: 4.7,
    reviews: 4567,
    description:
      'Handcrafted rose pink embroidered tiered maxi dress with delicate threadwork, flared hem, and soft cotton lining for festive and casual wear.',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    bestSeller: false,
    trending: true,
    newArrival: true,
    brand: 'Earthen',
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Classic Vintage Indigo Denim Dress',
    category: 'Fashion',
    price: 1299,
    originalPrice: 2199,
    rating: 4.4,
    reviews: 2734,
    description:
      'Blue pure cotton washed denim dress with metallic button-down front, adjustable waist belt, and dual utility pockets.',
    image:
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'LeviStudio',
    inStock: true,
  },
  {
    id: 'prod-6',
    name: 'Solid Midnight Black Evening Dress',
    category: 'Fashion',
    price: 2000,
    originalPrice: 3599,
    rating: 4.7,
    reviews: 5234,
    description:
      'Elegant solid black evening dress for women with structured silhouette, subtle metallic accent detailing, and stretch satin comfort.',
    image:
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'VogueAura',
    inStock: true,
  },
  {
    id: 'prod-7',
    name: 'Royal Silk Blend Ethnic Kurta Set',
    category: 'Fashion',
    price: 2499,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 1890,
    description:
      'Festive Chanderi silk-blend straight kurta with zari woven dupatta and tailored trousers, designed for weddings and celebrations.',
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'IndyaCraft',
    inStock: true,
  },
  {
    id: 'prod-8',
    name: 'Oversized Heavyweight Fleece Hoodie',
    category: 'Fashion',
    price: 1199,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 945,
    description:
      '380 GSM brushed cotton fleece streetwear hoodie with drop shoulders, kangaroo pocket, and ribbed cuffs for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    bestSeller: false,
    trending: true,
    newArrival: true,
    brand: 'StreetPulse',
    inStock: true,
  },

  // ELECTRONICS (8 items)
  {
    id: 'prod-9',
    name: 'Sony PS5 Slim Console 1TB Edition',
    category: 'Electronics',
    price: 49990,
    originalPrice: 54990,
    rating: 4.9,
    reviews: 8355,
    description:
      'Ultra-high speed 1TB SSD gaming console with DualSense wireless controller, 4K 120Hz HDR output, and 3D Tempest AudioTech.',
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['1TB Slim'],
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'Sony',
    inStock: true,
  },
  {
    id: 'prod-10',
    name: 'Nikon D7200 24.2MP Digital DSLR Camera',
    category: 'Electronics',
    price: 56999,
    originalPrice: 68990,
    rating: 4.8,
    reviews: 6745,
    description:
      '24.2MP DX-format CMOS sensor DSLR camera with EXPEED 4 image processor, 51-point autofocus system, Full HD 60p video, and Wi-Fi + NFC.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Body + 18-140mm Lens'],
    featured: true,
    bestSeller: false,
    trending: true,
    newArrival: false,
    brand: 'Nikon',
    inStock: true,
  },
  {
    id: 'prod-11',
    name: 'Realme Pro 5G Smartphone (8GB / 256GB)',
    category: 'Electronics',
    price: 18499,
    originalPrice: 22999,
    rating: 4.6,
    reviews: 3445,
    description:
      '120Hz Curved AMOLED display smartphone powered by Snapdragon 5G processor, 50MP OIS Sony main camera, and 67W SuperVOOC fast charging.',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['128GB', '256GB'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: true,
    brand: 'Realme',
    inStock: true,
  },
  {
    id: 'prod-12',
    name: 'Sony WH-1000XM5 Wireless ANC Headphones',
    category: 'Electronics',
    price: 26990,
    originalPrice: 34990,
    rating: 4.9,
    reviews: 4120,
    description:
      'Industry-leading noise cancellation over-ear headphones with 8 microphones, 30-hour battery life, multipoint Bluetooth connection, and crystal-clear calls.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Standard'],
    featured: true,
    bestSeller: true,
    trending: false,
    newArrival: false,
    brand: 'Sony',
    inStock: true,
  },
  {
    id: 'prod-13',
    name: 'SmartVital Pro AMOLED Fitness Smartwatch',
    category: 'Electronics',
    price: 3499,
    originalPrice: 6999,
    rating: 4.5,
    reviews: 2890,
    description:
      '1.96-inch Always-On AMOLED display smartwatch with Bluetooth calling, SpO2 & 24x7 heart rate tracking, 100+ sports modes, and IP68 water resistance.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['44mm'],
    featured: false,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'SmartVital',
    inStock: true,
  },
  {
    id: 'prod-14',
    name: 'JBL Flip 6 Waterproof Bluetooth Speaker',
    category: 'Electronics',
    price: 8999,
    originalPrice: 13999,
    rating: 4.7,
    reviews: 1920,
    description:
      'Portable waterproof and dustproof IP67 Bluetooth speaker with 2-way speaker system, punchy bass radiator, and 12 hours of playtime.',
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Standard'],
    featured: false,
    bestSeller: false,
    trending: true,
    newArrival: false,
    brand: 'JBL',
    inStock: true,
  },
  {
    id: 'prod-15',
    name: 'True Wireless Earbuds Pro with ANC',
    category: 'Electronics',
    price: 2299,
    originalPrice: 4999,
    rating: 4.4,
    reviews: 3150,
    description:
      '42dB Active Noise Cancellation TWS earbuds with 12.4mm titanized dynamic drivers, 40-hour total playback, and low-latency gaming mode.',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Standard'],
    featured: false,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'SoundCore',
    inStock: true,
  },
  {
    id: 'prod-16',
    name: 'Mechanical Wireless RGB Gaming Keyboard',
    category: 'Electronics',
    price: 4299,
    originalPrice: 6499,
    rating: 4.7,
    reviews: 840,
    description:
      'Hot-swappable 75% compact wireless mechanical keyboard with tactile switches, PBT keycaps, tri-mode connectivity, and customizable RGB backlight.',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['75% Layout'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'KeyChrono',
    inStock: true,
  },

  // SHOES (7 items)
  {
    id: 'prod-17',
    name: 'Air Jordan Stay Retro Basketball Sneakers',
    category: 'Shoes',
    price: 4999,
    originalPrice: 8499,
    rating: 4.9,
    reviews: 10234,
    description:
      'Inspired by the classic Air Jordan 12 silhouette with genuine leather overlays, responsive Air-Sole cushioning in the heel, and high-grip herringbone outsole.',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'Nike Jordan',
    inStock: true,
  },
  {
    id: 'prod-18',
    name: 'George Walker Derby Brown Formal Shoes',
    category: 'Shoes',
    price: 1499,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 13456,
    description:
      'Handcrafted burnished brown leather Derby formal shoes with cushioned memory foam insole and anti-skid TPR sole for office and formal occasions.',
    image:
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'George Walker',
    inStock: true,
  },
  {
    id: 'prod-19',
    name: 'Nike Air Zoom Pegasus Running Shoes',
    category: 'Shoes',
    price: 3799,
    originalPrice: 6995,
    rating: 4.8,
    reviews: 4320,
    description:
      'Engineered breathable mesh running shoes with dual Zoom Air units and React foam midsole for springy energy return on daily runs.',
    image:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    featured: true,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'Nike',
    inStock: true,
  },
  {
    id: 'prod-20',
    name: 'Minimalist White Court Leather Sneakers',
    category: 'Shoes',
    price: 1899,
    originalPrice: 3299,
    rating: 4.5,
    reviews: 2180,
    description:
      'Clean low-top white vegan leather sneakers with perforated breathable side panels, padded collar, and durable cupsole construction.',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    featured: false,
    bestSeller: false,
    trending: true,
    newArrival: true,
    brand: 'UrbanStep',
    inStock: true,
  },
  {
    id: 'prod-21',
    name: 'Womens Rose Gold Block Heel Sandals',
    category: 'Shoes',
    price: 1599,
    originalPrice: 2799,
    rating: 4.6,
    reviews: 1450,
    description:
      'Chic metallic rose gold block-heel sandals with adjustable ankle buckle strap and extra-soft padded footbed for effortless party wear.',
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'MetroChic',
    inStock: true,
  },
  {
    id: 'prod-22',
    name: 'All-Terrain Waterproof Hiking Boots',
    category: 'Shoes',
    price: 3299,
    originalPrice: 5499,
    rating: 4.7,
    reviews: 980,
    description:
      'Rugged nubuck leather outdoor trekking boots with ankle support, gusseted tongue, and deep-lug rubber traction outsole.',
    image:
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: false,
    brand: 'TrailPeak',
    inStock: true,
  },
  {
    id: 'prod-23',
    name: 'Ultraboost Knit Slip-On Trainers',
    category: 'Shoes',
    price: 2599,
    originalPrice: 4599,
    rating: 4.7,
    reviews: 1740,
    description:
      'Sock-like Primeknit upper slip-on athletic trainers with high-rebound cushioned midsole for gym workouts and walking.',
    image:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: true,
    brand: 'StridePro',
    inStock: true,
  },

  // BEAUTY (7 items)
  {
    id: 'prod-24',
    name: '20% Vitamin C Brightening Face Serum',
    category: 'Beauty',
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviews: 6420,
    description:
      'Potent antioxidant face serum formulated with 20% L-Ascorbic Acid, Hyaluronic Acid, and Ferulic Acid for radiant, even-toned skin.',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['30ml', '50ml'],
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'MinimalistGlow',
    inStock: true,
  },
  {
    id: 'prod-25',
    name: 'Velvet Matte Liquid Lipstick Gift Set (4 Pcs)',
    category: 'Beauty',
    price: 999,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 3890,
    description:
      'Transfer-proof 16-hour longwear matte liquid lipstick quad enriched with Vitamin E and jojoba oil in universally flattering nude and berry shades.',
    image:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Pack of 4'],
    featured: true,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'LuxeLips',
    inStock: true,
  },
  {
    id: 'prod-26',
    name: 'French Rose & Oud Eau De Parfum 100ml',
    category: 'Beauty',
    price: 2199,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 2150,
    description:
      'Long-lasting luxury Eau De Parfum blending top notes of Damascus rose and bergamot with warm amber, vanilla, and smoky oud wood.',
    image:
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['50ml', '100ml'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'MaisonAroma',
    inStock: true,
  },
  {
    id: 'prod-27',
    name: 'Hyaluronic Acid Barrier Repair Gel Cream',
    category: 'Beauty',
    price: 649,
    originalPrice: 999,
    rating: 4.6,
    reviews: 4110,
    description:
      'Oil-free 72-hour hydration gel moisturizer with 5-molecular-weight Hyaluronic Acid and Ceramides for plump, dewy skin.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['50g', '100g'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'DermaPure',
    inStock: true,
  },
  {
    id: 'prod-28',
    name: 'Moroccan Argan Oil Keratin Hair Spa Mask',
    category: 'Beauty',
    price: 749,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 1680,
    description:
      'Deep conditioning hair repair mask infused with cold-pressed Moroccan Argan Oil, plant keratin, and pro-vitamin B5 to tame frizz.',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['250g'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: false,
    brand: 'BotanicaHair',
    inStock: true,
  },
  {
    id: 'prod-29',
    name: 'SPF 50 PA++++ Invisible Aqua Sunscreen',
    category: 'Beauty',
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 5320,
    description:
      'Zero white-cast broad-spectrum UVA/UVB sunscreen gel enriched with Niacinamide and Cica extract for lightweight daily protection.',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['50g'],
    featured: false,
    bestSeller: true,
    trending: true,
    newArrival: true,
    brand: 'SunShield',
    inStock: true,
  },
  {
    id: 'prod-30',
    name: 'Pro Rose Gold Makeup Brush Set (12 Pcs)',
    category: 'Beauty',
    price: 899,
    originalPrice: 1699,
    rating: 4.6,
    reviews: 1290,
    description:
      'Ultra-soft cruelty-free synthetic bristles makeup brush collection with travel pouch for flawless foundation, blush, and eyeshadow blending.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['12 Piece Set'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'GlamStudio',
    inStock: true,
  },

  // HOME (6 items)
  {
    id: 'prod-31',
    name: 'Nordic Ceramic Minimalist Bedside Table Lamp',
    category: 'Home',
    price: 1699,
    originalPrice: 2999,
    rating: 4.8,
    reviews: 1420,
    description:
      'Handcrafted matte ceramic base table lamp with warm linen fabric shade and dimmable LED bulb included for cozy bedroom ambiance.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Standard'],
    featured: true,
    bestSeller: true,
    trending: true,
    newArrival: false,
    brand: 'CasaNord',
    inStock: true,
  },
  {
    id: 'prod-32',
    name: 'Egyptian Cotton 400TC King Bedsheet Set',
    category: 'Home',
    price: 2299,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 2840,
    description:
      'Silky-smooth 400 thread count 100% Egyptian cotton king-size bedsheet with 2 matching zippered pillow covers in sage botanical print.',
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Queen', 'King'],
    featured: false,
    bestSeller: true,
    trending: false,
    newArrival: true,
    brand: 'SleepHaven',
    inStock: true,
  },
  {
    id: 'prod-33',
    name: 'Smart HEPA H13 Room Air Purifier',
    category: 'Home',
    price: 7999,
    originalPrice: 12999,
    rating: 4.8,
    reviews: 1630,
    description:
      '3-stage True HEPA H13 + Activated Carbon air purifier removing 99.97% of dust, pollen, smoke, and allergens with whisper-quiet sleep mode.',
    image:
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Up to 400 sq.ft'],
    featured: true,
    bestSeller: false,
    trending: true,
    newArrival: true,
    brand: 'PureBreeze',
    inStock: true,
  },
  {
    id: 'prod-34',
    name: 'Artisan Scented Soy Wax Candle Set (3 Jars)',
    category: 'Home',
    price: 849,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 2190,
    description:
      '100% natural hand-poured soy wax aromatherapy candles in French Lavender, Vanilla Bean, and Sandalwood Amber with 45-hour burn time.',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['Set of 3'],
    featured: false,
    bestSeller: true,
    trending: false,
    newArrival: false,
    brand: 'AuraHome',
    inStock: true,
  },
  {
    id: 'prod-35',
    name: 'Insulated French Press Coffee Maker 1L',
    category: 'Home',
    price: 1399,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 1120,
    description:
      'Double-wall 304 stainless steel insulated French press coffee and tea brewer with 4-level micro-mesh filtration that keeps drinks hot for hours.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['1000ml'],
    featured: false,
    bestSeller: false,
    trending: false,
    newArrival: true,
    brand: 'BrewCraft',
    inStock: true,
  },
  {
    id: 'prod-36',
    name: 'Velvet Tufted Accent Cushion Covers (Set of 5)',
    category: 'Home',
    price: 799,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 3090,
    description:
      'Plush quilted velvet 16x16 inch decorative throw pillow covers with invisible zippers for living room sofas and lounge chairs.',
    image:
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['16x16 inch'],
    featured: false,
    bestSeller: false,
    trending: true,
    newArrival: false,
    brand: 'DecorNest',
    inStock: true,
  },
];

let cachedProducts = null;

export async function fetchProducts({ forceRefresh = false } = {}) {
  if (cachedProducts && !forceRefresh) {
    return {
      data: cachedProducts,
      source: 'cache',
      error: null,
    };
  }

  try {
    // Simulated fast local catalog resolution with safe fallback if any external API is unreachable
    cachedProducts = MOCK_PRODUCTS;
    return {
      data: cachedProducts,
      source: 'local',
      error: null,
    };
  } catch (err) {
    cachedProducts = MOCK_PRODUCTS;
    return {
      data: MOCK_PRODUCTS,
      source: 'fallback',
      error: err?.message || 'Using offline product catalog',
    };
  }
}

export function getProductById(productId) {
  if (!productId) return MOCK_PRODUCTS[0];
  const list = cachedProducts || MOCK_PRODUCTS;
  return (
    list.find((item) => String(item.id) === String(productId)) ||
    MOCK_PRODUCTS[0]
  );
}

export function filterAndSortProducts(
  products = MOCK_PRODUCTS,
  {
    category = 'All',
    searchQuery = '',
    sortBy = 'popular',
    minPrice = 0,
    maxPrice = Infinity,
    onlyFeatured = false,
    onlyTrending = false,
    onlyNewArrivals = false,
  } = {}
) {
  const normalizedQuery = (searchQuery || '').trim().toLowerCase();
  const normalizedCategory = (category || 'All').trim();

  const filtered = products.filter((item) => {
    if (
      normalizedCategory &&
      normalizedCategory !== 'All' &&
      item.category.toLowerCase() !== normalizedCategory.toLowerCase()
    ) {
      return false;
    }

    if (onlyFeatured && !item.featured) return false;
    if (onlyTrending && !item.trending) return false;
    if (onlyNewArrivals && !item.newArrival) return false;

    if (item.price < minPrice || item.price > maxPrice) {
      return false;
    }

    if (normalizedQuery) {
      const hay = `${item.name} ${item.category} ${item.brand || ''} ${
        item.description || ''
      }`.toLowerCase();
      if (!hay.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  switch (sortBy) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
      break;
    case 'popular':
    default:
      sorted.sort((a, b) => b.reviews - a.reviews);
      break;
  }

  return sorted;
}

export default {
  CATEGORIES,
  MOCK_PRODUCTS,
  fetchProducts,
  getProductById,
  filterAndSortProducts,
};
