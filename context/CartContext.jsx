import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { MOCK_PRODUCTS, fetchProducts } from '../services/api';
import { storage, generateOrderId } from '../utils/helper';

const CART_STORAGE_KEY = 'stylish_cart_items_v1';
const WISHLIST_STORAGE_KEY = 'stylish_wishlist_ids_v1';
const ADDRESS_STORAGE_KEY = 'stylish_shipping_address_v1';
const ORDERS_STORAGE_KEY = 'stylish_orders_v1';

const DEFAULT_WISHLIST_IDS = [
  'prod-1',
  'prod-2',
  'prod-4',
  'prod-9',
  'prod-17',
  'prod-24',
];

const DEFAULT_SHIPPING_ADDRESS = {
  fullName: 'Abhiraj Sisodiya',
  phone: '9876543210',
  street: '216 St Pauls Rd, Ashok Nagar',
  city: 'Indore',
  state: 'Madhya Pradesh',
  pincode: '450116',
  landmark: 'Near City Center Mall',
  addressType: 'Home',
};

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [cartItems, setCartItems] = useState(() =>
    storage.getItem(CART_STORAGE_KEY, [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        selectedSize: MOCK_PRODUCTS[0].sizes?.[1] || 'M',
      },
      {
        product: MOCK_PRODUCTS[16],
        quantity: 1,
        selectedSize: MOCK_PRODUCTS[16].sizes?.[1] || 'UK 8',
      },
    ])
  );

  const [wishlistIds, setWishlistIds] = useState(() =>
    storage.getItem(WISHLIST_STORAGE_KEY, DEFAULT_WISHLIST_IDS)
  );

  const [shippingAddress, setShippingAddress] = useState(() =>
    storage.getItem(ADDRESS_STORAGE_KEY, DEFAULT_SHIPPING_ADDRESS)
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orders, setOrders] = useState(() =>
    storage.getItem(ORDERS_STORAGE_KEY, [])
  );
  const [lastOrder, setLastOrder] = useState(null);

  const loadProducts = useCallback(async (forceRefresh = false) => {
    setIsLoadingProducts(true);
    try {
      const response = await fetchProducts({ forceRefresh });
      if (response?.data?.length) {
        setProducts(response.data);
      }
      setProductsError(response?.error || null);
    } catch (err) {
      setProducts(MOCK_PRODUCTS);
      setProductsError(err?.message || 'Showing offline product catalog');
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(false);
  }, [loadProducts]);

  const addToCart = useCallback((product, quantity = 1, selectedSize = null) => {
    if (!product || !product.id) return;
    const resolvedSize =
      selectedSize ||
      (Array.isArray(product.sizes) && product.sizes.length > 0
        ? product.sizes[0]
        : 'Standard');

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          String(item.product.id) === String(product.id) &&
          item.selectedSize === resolvedSize
      );

      let next;
      if (existingIndex > -1) {
        next = prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      } else {
        next = [
          ...prev,
          {
            product,
            quantity: Math.max(1, quantity),
            selectedSize: resolvedSize,
          },
        ];
      }
      storage.setItem(CART_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId, selectedSize = null) => {
    setCartItems((prev) => {
      const next = prev.filter((item) => {
        if (String(item.product.id) !== String(productId)) return true;
        if (selectedSize && item.selectedSize !== selectedSize) return true;
        return false;
      });
      storage.setItem(CART_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId, nextQuantity, selectedSize = null) => {
    if (nextQuantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prev) => {
      const next = prev.map((item) => {
        const matchesId = String(item.product.id) === String(productId);
        const matchesSize = !selectedSize || item.selectedSize === selectedSize;
        if (matchesId && matchesSize) {
          return { ...item, quantity: Math.min(10, nextQuantity) };
        }
        return item;
      });
      storage.setItem(CART_STORAGE_KEY, next);
      return next;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
    storage.setItem(CART_STORAGE_KEY, []);
  }, []);

  const toggleWishlist = useCallback((productId) => {
    if (!productId) return;
    const idStr = String(productId);
    setWishlistIds((prev) => {
      const exists = prev.includes(idStr);
      const next = exists
        ? prev.filter((id) => id !== idStr)
        : [idStr, ...prev];
      storage.setItem(WISHLIST_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => wishlistIds.includes(String(productId)),
    [wishlistIds]
  );

  const isInCart = useCallback(
    (productId) =>
      cartItems.some((item) => String(item.product.id) === String(productId)),
    [cartItems]
  );

  const updateShippingAddress = useCallback((newAddress) => {
    setShippingAddress((prev) => {
      const updated = { ...prev, ...newAddress };
      storage.setItem(ADDRESS_STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const applyCoupon = useCallback(
    (codeInput) => {
      const code = (codeInput || '').trim().toUpperCase();
      if (!code) {
        return { success: false, message: 'Please enter a coupon code' };
      }
      if (code === 'STYLISH10') {
        setAppliedCoupon({ code: 'STYLISH10', type: 'percent', value: 10 });
        setCouponCode('STYLISH10');
        return { success: true, message: '10% discount applied!' };
      }
      if (code === 'SAVE200') {
        setAppliedCoupon({ code: 'SAVE200', type: 'flat', value: 200 });
        setCouponCode('SAVE200');
        return { success: true, message: '₹200 instant discount applied!' };
      }
      return {
        success: false,
        message: 'Invalid code. Try STYLISH10 or SAVE200',
      };
    },
    []
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode('');
  }, []);

  const wishlistItems = useMemo(() => {
    const idSet = new Set(wishlistIds.map(String));
    return products.filter((item) => idSet.has(String(item.id)));
  }, [products, wishlistIds]);

  const cartSummary = useMemo(() => {
    let subtotal = 0;
    let totalMRP = 0;
    let itemCount = 0;

    for (const item of cartItems) {
      const price = Number(item.product?.price) || 0;
      const orig = Number(item.product?.originalPrice) || price;
      const qty = Number(item.quantity) || 1;
      subtotal += price * qty;
      totalMRP += orig * qty;
      itemCount += qty;
    }

    const productDiscount = Math.max(0, totalMRP - subtotal);

    let couponDiscount = 0;
    if (appliedCoupon && subtotal > 0) {
      if (appliedCoupon.type === 'percent') {
        couponDiscount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else if (appliedCoupon.type === 'flat') {
        couponDiscount = Math.min(subtotal, appliedCoupon.value);
      }
    }

    const shippingFee = subtotal === 0 || subtotal >= 999 ? 0 : 49;
    const total = Math.max(0, subtotal - couponDiscount + shippingFee);

    return {
      itemCount,
      subtotal,
      totalMRP,
      productDiscount,
      couponDiscount,
      shippingFee,
      total,
    };
  }, [cartItems, appliedCoupon]);

  const placeOrder = useCallback(
    ({ paymentMethod } = {}) => {
      const finalPayment = paymentMethod || selectedPaymentMethod || 'upi';
      const newOrder = {
        id: generateOrderId(),
        createdAt: new Date().toISOString(),
        items: [...cartItems],
        summary: { ...cartSummary },
        shippingAddress: { ...shippingAddress },
        paymentMethod: finalPayment,
        status: 'Confirmed',
        estimatedDelivery: '3-5 Business Days',
      };

      setLastOrder(newOrder);
      setOrders((prev) => {
        const next = [newOrder, ...prev];
        storage.setItem(ORDERS_STORAGE_KEY, next);
        return next;
      });

      setCartItems([]);
      setAppliedCoupon(null);
      setCouponCode('');
      storage.setItem(CART_STORAGE_KEY, []);

      return newOrder;
    },
    [cartItems, cartSummary, shippingAddress, selectedPaymentMethod]
  );

  const value = useMemo(
    () => ({
      products,
      isLoadingProducts,
      productsError,
      loadProducts,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      wishlistIds,
      wishlistItems,
      toggleWishlist,
      isInWishlist,
      shippingAddress,
      updateShippingAddress,
      selectedPaymentMethod,
      setSelectedPaymentMethod,
      couponCode,
      setCouponCode,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      cartSummary,
      orders,
      lastOrder,
      placeOrder,
    }),
    [
      products,
      isLoadingProducts,
      productsError,
      loadProducts,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      wishlistIds,
      wishlistItems,
      toggleWishlist,
      isInWishlist,
      shippingAddress,
      updateShippingAddress,
      selectedPaymentMethod,
      couponCode,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      cartSummary,
      orders,
      lastOrder,
      placeOrder,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
