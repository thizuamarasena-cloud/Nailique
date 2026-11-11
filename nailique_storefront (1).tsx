import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Check, 
  Ruler, RefreshCw, Star, X, Menu, Info, Eye, Heart, Truck, ShieldCheck, 
  Clock, Download, Camera, Sliders, Filter, CheckCircle2, Copy, Search,
  Gift, Percent, HelpCircle, Layers, Palette, Sparkle
} from 'lucide-react';

// --- COLOR PALETTE ---
// Soft Blush Rose: #DFB3B2, #E8C5C8
// Warm Beige / Off-White: #FAF6F0, #F4ECE1
// Sage Gray: #B7C4C5, #95A5A6
// Deep Espresso Chocolate: #3D2B2E, #2B1D20

// --- INITIAL DATA & CATALOG ---
const INITIAL_PRODUCTS = [
  { 
    id: 'NLQ-001', 
    title: 'Glossy Glazed Pearl Almond', 
    category: 'Nude & Chrome',
    price: 48.00,
    rating: 4.9,
    reviewsCount: 38,
    shape: 'Almond',
    length: 'Medium',
    finish: 'Chrome Pearl',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    description: 'Chic milky nude sheer sheen with a subtle pearlescent glazed finish for clean luxury aesthetics.'
  },
  { 
    id: 'NLQ-002', 
    title: 'Soft Rose Ombré Gradient', 
    category: 'French & Ombre',
    price: 45.00,
    rating: 5.0,
    reviewsCount: 52,
    shape: 'Almond',
    length: 'Medium',
    finish: 'High Gloss',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=800&q=80',
    description: 'Flawless nude gradient fading seamlessly into soft, natural blush pink tips.'
  },
  { 
    id: 'NLQ-003', 
    title: 'Deep Cherry Kiss French', 
    category: 'Deep Wine & Art',
    price: 54.00,
    rating: 4.8,
    reviewsCount: 29,
    shape: 'Coffin',
    length: 'Long',
    finish: 'Gloss Gel',
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Rich burgundy tones featuring hand-painted kiss prints and curved side french accent nails.'
  },
  { 
    id: 'NLQ-004', 
    title: 'Velvet Wine Ribbon Bows', 
    category: 'Deep Wine & Art',
    price: 52.00,
    rating: 4.9,
    reviewsCount: 41,
    shape: 'Almond',
    length: 'Long',
    finish: 'Cat-Eye Velvet',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1595868841648-52fb387201c1?auto=format&fit=crop&w=800&q=80',
    description: 'Deep crimson velvet shade decorated with delicate hand-drawn white ribbons and 3D bow accents.'
  },
  { 
    id: 'NLQ-005', 
    title: 'Blush Opal Sheer Almond', 
    category: 'Nude & Chrome',
    price: 44.00,
    rating: 4.7,
    reviewsCount: 19,
    shape: 'Oval',
    length: 'Short',
    finish: 'Matte & Gloss',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    description: 'Clean, minimalist sheer nude with high-shine light reflection and durable gel overlay.'
  },
  { 
    id: 'NLQ-006', 
    title: 'Milky Cream Vanilla Square', 
    category: 'Nude & Chrome',
    price: 42.00,
    rating: 4.9,
    reviewsCount: 64,
    shape: 'Square',
    length: 'Short',
    finish: 'Cream Gel',
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist milk tea nude shade with flawless natural curvature and reinforced tips.'
  }
];

const NAIL_SHAPES = ['Almond', 'Coffin', 'Square', 'Stiletto', 'Oval', 'Duck'];
const NAIL_LENGTHS = ['Short', 'Medium', 'Long', 'Extra Long'];
const FINISHES = ['Glossy', 'Matte', 'Chrome', 'Velvet', 'Cat-Eye'];
const COLOR_OPTIONS = [
  { name: 'Nailique Rose', hex: '#DFB3B2' },
  { name: 'Milky Beige', hex: '#F4ECE1' },
  { name: 'Deep Burgundy', hex: '#581C25' },
  { name: 'Sage Cloud', hex: '#B7C4C5' },
  { name: 'Midnight Noir', hex: '#2B1D20' },
  { name: 'Pure Snow', hex: '#FFFFFF' }
];

const ADDON_ART = [
  { id: 'rhinestones', name: 'Swarovski Crystals', price: 6.00 },
  { id: 'bows', name: '3D Chrome Bows', price: 5.00 },
  { id: 'french', name: 'Custom French Tips', price: 8.00 },
  { id: 'kiss', name: 'Handpainted Kiss Prints', price: 7.00 },
  { id: 'pearls', name: 'Micro Pearl Cluster', price: 5.50 }
];

const DEMO_ORDERS = {
  'NLQ-9842': {
    id: 'NLQ-9842',
    client: 'Sophia Bennett',
    date: '2026-03-28',
    statusStep: 3,
    shape: 'Almond',
    length: 'Medium',
    items: ['Glossy Glazed Pearl Almond (Size M)'],
    estimatedDelivery: 'April 4, 2026',
    trackingNumber: 'TRK940294811'
  },
  'NLQ-8821': {
    id: 'NLQ-8821',
    client: 'Elena Rostova',
    date: '2026-03-30',
    statusStep: 1,
    shape: 'Coffin',
    length: 'Long',
    items: ['Deep Cherry Kiss French (Size S)'],
    estimatedDelivery: 'April 7, 2026',
    trackingNumber: 'Processing in Studio'
  }
};

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'shop', 'configurator', 'sizing', 'custom_wizard', 'tracker'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Cart & E-Commerce State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart View, 2: Info, 3: Success
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Saved Client Sizing Profile State
  const [sizingProfile, setSizingProfile] = useState(() => {
    const saved = localStorage.getItem('nailique_sizing');
    return saved ? JSON.parse(saved) : { thumb: 15, index: 12, middle: 13, ring: 12, pinky: 9, assignedSize: 'Size S' };
  });

  // Configurator Live Studio State
  const [config, setConfig] = useState({
    shape: 'Almond',
    length: 'Medium',
    baseColor: COLOR_OPTIONS[0],
    finish: 'Glossy',
    selectedAddons: ['french'],
    customSizing: 'Size S'
  });

  // Custom Intake Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    clientType: 'First Time',
    shape: 'Almond',
    length: 'Medium',
    sizingMethod: 'Need Sizing Kit',
    occasion: 'Special Event',
    targetDate: '',
    notes: ''
  });
  const [wizardCompleted, setWizardCompleted] = useState(false);

  // Order Tracker State
  const [trackerInput, setTrackerInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackerError, setTrackerError] = useState('');

  // Auto Toast Function
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  // Dynamic Studio Price Calculation
  const calculateConfigPrice = () => {
    let base = 35.00;
    if (config.length === 'Long') base += 5.00;
    if (config.length === 'Extra Long') base += 8.00;
    if (config.finish === 'Chrome' || config.finish === 'Cat-Eye') base += 6.00;
    
    const addonsTotal = config.selectedAddons.reduce((acc, id) => {
      const art = ADDON_ART.find(a => a.id === id);
      return acc + (art ? art.price : 0);
    }, 0);

    return base + addonsTotal;
  };

  // Add to Cart Logic
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map(i => i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    showToast(`Added "${item.title}" to your cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // Subtotal Calculation
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const freeShippingThreshold = 75.00;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Sizing Auto Calculation from mm
  const handleFingerMMChange = (finger, val) => {
    const numVal = parseFloat(val) || 0;
    const updated = { ...sizingProfile, [finger]: numVal };

    // Auto compute preset size heuristic
    const thumb = updated.thumb;
    let computed = 'Custom Size';
    if (thumb <= 14) computed = 'Size XS';
    else if (thumb <= 15) computed = 'Size S';
    else if (thumb <= 16) computed = 'Size M';
    else if (thumb >= 17) computed = 'Size L';

    updated.assignedSize = computed;
    setSizingProfile(updated);
    localStorage.setItem('nailique_sizing', JSON.stringify(updated));
  };

  // Order Lookup
  const handleTrackOrder = (e) => {
    e.preventDefault();
    const cleanId = trackerInput.trim().toUpperCase();
    if (DEMO_ORDERS[cleanId]) {
      setTrackedOrder(DEMO_ORDERS[cleanId]);
      setTrackerError('');
    } else {
      setTrackedOrder(null);
      setTrackerError('Order ID not found. Try searching for "NLQ-9842" or "NLQ-8821".');
    }
  };

  return (
    <div className="font-sans antialiased text-[#3D2B2E] bg-[#FAF6F0] selection:bg-[#E8C5C8] selection:text-[#3D2B2E] min-h-screen flex flex-col">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D2B2E] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-[#E8C5C8]/30">
          <Sparkles size={20} className="text-[#DFB3B2]" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#3D2B2E] text-[#FAF6F0] py-2 px-4 text-center text-xs tracking-wide flex justify-center items-center gap-2">
        <Sparkles size={14} className="text-[#DFB3B2]" />
        <span>Complimentary Luxury Application Kit included with every first order &bull; Free Shipping over $75</span>
      </div>

      {/* STICKY APPLE-STYLE NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#F4ECE1]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <button onClick={() => setActiveTab('home')} className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-[#3D2B2E]">
            <Sparkles size={26} className="text-[#DFB3B2]" />
            Nailique.
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => setActiveTab('home')} className={`transition-colors ${activeTab === 'home' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>Home</button>
            <button onClick={() => setActiveTab('shop')} className={`transition-colors ${activeTab === 'shop' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>Collection</button>
            <button onClick={() => setActiveTab('configurator')} className={`transition-colors flex items-center gap-1.5 ${activeTab === 'configurator' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>
              <Palette size={16} /> 3D Studio
            </button>
            <button onClick={() => setActiveTab('sizing')} className={`transition-colors flex items-center gap-1.5 ${activeTab === 'sizing' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>
              <Ruler size={16} /> Virtual Sizing
            </button>
            <button onClick={() => setActiveTab('custom_wizard')} className={`transition-colors ${activeTab === 'custom_wizard' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>Custom Inquiry</button>
            <button onClick={() => setActiveTab('tracker')} className={`transition-colors ${activeTab === 'tracker' ? 'text-[#DFB3B2] font-semibold' : 'hover:text-[#DFB3B2]'}`}>Track Order</button>
          </div>

          {/* Action Right CTA & Cart */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white border border-[#F4ECE1] text-[#3D2B2E] hover:bg-[#E8C5C8]/20 transition-colors shadow-sm"
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DFB3B2] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveTab('configurator')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#DFB3B2] text-white text-xs font-semibold hover:bg-[#d4a2a1] transition-all shadow-sm"
            >
              Create Custom Set
            </button>

            {/* Mobile Menu Icon */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#3D2B2E]">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF6F0] px-6 py-6 border-b border-[#F4ECE1] space-y-4 text-sm font-medium">
            <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Home</button>
            <button onClick={() => { setActiveTab('shop'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Collection</button>
            <button onClick={() => { setActiveTab('configurator'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-[#DFB3B2]">3D Studio Configurator</button>
            <button onClick={() => { setActiveTab('sizing'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Virtual Sizing Assistant</button>
            <button onClick={() => { setActiveTab('custom_wizard'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Custom Order Intake</button>
            <button onClick={() => { setActiveTab('tracker'); setMobileMenuOpen(false); }} className="block w-full text-left py-2">Order Tracking</button>
          </div>
        )}
      </nav>

      {/* BODY CONTENT - TAB BASED */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-6 overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1]/40 to-[#FAF6F0]">
              <div className="max-w-6xl mx-auto text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#E8C5C8] text-xs font-semibold uppercase tracking-wider text-[#DFB3B2] mb-8 shadow-sm">
                  <Sparkle size={14} /> Salon Perfection Without the Salon Wait
                </div>
                
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-[#3D2B2E] leading-[1.05] mb-8">
                  Flawless Nails.<br/>
                  <span className="italic text-[#DFB3B2] font-serif">Handcrafted for You.</span>
                </h1>

                <p className="text-lg md:text-2xl text-[#3D2B2E]/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                  Reusable, 100% gel handcrafted press-on nails built to your exact fingernail dimensions. Designed like fine jewelry for your hands.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setActiveTab('configurator')}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#DFB3B2] text-white font-medium hover:bg-[#d4a2a1] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Launch Live Studio <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('shop')}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-[#F4ECE1] text-[#3D2B2E] font-medium hover:bg-[#E8C5C8]/20 transition-all shadow-sm"
                  >
                    Browse Ready-to-Wear
                  </button>
                </div>

                {/* Stat Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto pt-10 border-t border-[#F4ECE1]">
                  <div>
                    <div className="text-3xl font-bold text-[#3D2B2E]">5+ Wears</div>
                    <div className="text-xs text-[#95A5A6] mt-1">Durable Gel Overlays</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3D2B2E]">100% Fit</div>
                    <div className="text-xs text-[#95A5A6] mt-1">Custom MM Sizing</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3D2B2E]">15 Min</div>
                    <div className="text-xs text-[#95A5A6] mt-1">Instant Application</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3D2B2E]">4.9 / 5.0</div>
                    <div className="text-xs text-[#95A5A6] mt-1">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED COLLECTION HIGHLIGHT */}
            <section className="py-20 bg-white px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#DFB3B2]">Signature Sets</span>
                    <h2 className="text-3xl md:text-5xl font-medium text-[#3D2B2E] mt-1">Ready-to-Ship Luxury</h2>
                  </div>
                  <button onClick={() => setActiveTab('shop')} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#DFB3B2] hover:underline">
                    View All Products <ArrowRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {INITIAL_PRODUCTS.slice(0, 3).map((product) => (
                    <div key={product.id} className="bg-[#FAF6F0] rounded-3xl overflow-hidden border border-[#F4ECE1] group flex flex-col justify-between">
                      <div className="h-72 relative overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#3D2B2E]">
                          {product.badge || 'Popular'}
                        </span>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-[#3D2B2E]">{product.title}</h3>
                            <span className="font-bold text-[#DFB3B2] text-lg">${product.price.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-[#95A5A6] mb-4">{product.description}</p>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => addToCart({ ...product, size: sizingProfile.assignedSize })}
                            className="flex-1 py-3 bg-[#DFB3B2] text-white rounded-2xl text-xs font-semibold hover:bg-[#d4a2a1] transition-colors"
                          >
                            Quick Add
                          </button>
                          <button 
                            onClick={() => setSelectedProductModal(product)}
                            className="p-3 bg-white border border-[#F4ECE1] rounded-2xl text-[#3D2B2E] hover:bg-[#FAF6F0]"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: SHOP / COLLECTION */}
        {activeTab === 'shop' && (
          <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DFB3B2]">Full Catalog</span>
              <h1 className="text-4xl md:text-5xl font-medium text-[#3D2B2E] mt-2">Ready-to-Wear Nail Sets</h1>
              <p className="text-sm text-[#95A5A6] mt-2 max-w-lg mx-auto">Hand-painted with premium salon gel products. Select standard sizes or request custom measurements.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {INITIAL_PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-[#F4ECE1] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="h-80 relative overflow-hidden bg-[#FAF6F0]">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#3D2B2E]">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                        <Star size={14} className="fill-current" />
                        <span className="font-bold text-[#3D2B2E]">{product.rating}</span>
                        <span className="text-gray-400">({product.reviewsCount} reviews)</span>
                      </div>
                      <h3 className="text-xl font-medium text-[#3D2B2E] mb-1">{product.title}</h3>
                      <p className="text-xs text-[#95A5A6] leading-relaxed mb-4">{product.description}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs text-[#95A5A6] bg-[#FAF6F0] p-2.5 rounded-xl">
                        <span>Shape: <strong className="text-[#3D2B2E]">{product.shape}</strong></span>
                        <span>Length: <strong className="text-[#3D2B2E]">{product.length}</strong></span>
                      </div>

                      <button 
                        onClick={() => addToCart({ ...product, size: sizingProfile.assignedSize })}
                        className="w-full py-3.5 bg-[#DFB3B2] text-white rounded-2xl text-xs font-semibold hover:bg-[#d4a2a1] transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ShoppingBag size={16} /> Add to Cart ({sizingProfile.assignedSize})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: 3D STUDIO CONFIGURATOR */}
        {activeTab === 'configurator' && (
          <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB3B2]">Interactive Studio</span>
              <h1 className="text-4xl md:text-5xl font-medium text-[#3D2B2E] mt-1">Custom Nail Configurator</h1>
              <p className="text-sm text-[#95A5A6] mt-2">Design your bespoke set in real time with custom finishes and nail art accents.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT: REAL-TIME PREVIEW CANVAS CANVAS/RENDERER */}
              <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#F4ECE1] shadow-sm flex flex-col items-center justify-center relative min-h-[480px]">
                <div className="absolute top-6 left-6 text-xs uppercase font-bold text-[#DFB3B2] tracking-wider flex items-center gap-1.5">
                  <Sparkles size={16} /> Live Visual Preview
                </div>

                {/* DYNAMIC NAIL HAND RENDER SIMULATION */}
                <div className="flex items-end justify-center gap-3 my-12">
                  {[
                    { name: 'Pinky', height: 'h-24', width: 'w-7' },
                    { name: 'Ring', height: 'h-32', width: 'w-9' },
                    { name: 'Middle', height: 'h-36', width: 'w-9' },
                    { name: 'Index', height: 'h-32', width: 'w-9' },
                    { name: 'Thumb', height: 'h-28', width: 'w-11' }
                  ].map((finger, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      {/* Nail Top Piece */}
                      <div 
                        style={{ backgroundColor: config.baseColor.hex }}
                        className={`
                          ${finger.width} ${finger.height}
                          transition-all duration-300 shadow-md relative border border-black/10 flex flex-col justify-between items-center py-2
                          ${config.shape === 'Almond' ? 'rounded-t-full' : ''}
                          ${config.shape === 'Coffin' ? 'rounded-t-sm' : ''}
                          ${config.shape === 'Square' ? 'rounded-t-none' : ''}
                          ${config.shape === 'Stiletto' ? 'rounded-t-[40px]' : ''}
                          ${config.shape === 'Oval' ? 'rounded-t-[30px]' : ''}
                        `}
                      >
                        {/* Finish Overlay FX */}
                        {config.finish === 'Chrome' && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/60 rounded-t-full pointer-events-none" />
                        )}
                        {config.finish === 'Matte' && (
                          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                        )}

                        {/* Nail Art Accents Mockup */}
                        {config.selectedAddons.includes('french') && (
                          <div className="w-full h-4 bg-white/80 rounded-t-full" />
                        )}
                        {config.selectedAddons.includes('bows') && (
                          <div className="w-3 h-3 bg-white/90 rounded-full border border-gray-300 my-auto shadow-sm" />
                        )}
                        {config.selectedAddons.includes('rhinestones') && (
                          <div className="w-2 h-2 bg-amber-200 rotate-45 animate-pulse my-auto" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-3 font-mono">{finger.name}</span>
                    </div>
                  ))}
                </div>

                {/* Dynamic Configuration Specs Summary */}
                <div className="w-full bg-[#FAF6F0] p-4 rounded-2xl border border-[#F4ECE1] text-xs flex justify-between items-center text-[#3D2B2E]">
                  <div>
                    <span className="text-gray-400">Spec:</span> <strong>{config.shape} ({config.length}) &bull; {config.finish}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400">Live Price:</span> <strong className="text-lg text-[#DFB3B2] ml-1">${calculateConfigPrice().toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              {/* RIGHT: CONTROLS & SELECTION PANEL */}
              <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#F4ECE1] shadow-sm space-y-6">
                
                {/* SHAPE SELECTOR */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B2E] mb-3">1. Select Silhouette / Shape</label>
                  <div className="grid grid-cols-3 gap-2">
                    {NAIL_SHAPES.map(s => (
                      <button
                        key={s}
                        onClick={() => setConfig(prev => ({ ...prev, shape: s }))}
                        className={`py-3 px-3 rounded-2xl text-xs font-semibold border transition-all ${config.shape === s ? 'bg-[#DFB3B2] text-white border-[#DFB3B2]' : 'bg-[#FAF6F0] text-[#3D2B2E] border-[#F4ECE1]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LENGTH SELECTOR */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B2E] mb-3">2. Choose Length</label>
                  <div className="grid grid-cols-4 gap-2">
                    {NAIL_LENGTHS.map(l => (
                      <button
                        key={l}
                        onClick={() => setConfig(prev => ({ ...prev, length: l }))}
                        className={`py-2.5 rounded-2xl text-xs font-semibold border transition-all ${config.length === l ? 'bg-[#DFB3B2] text-white border-[#DFB3B2]' : 'bg-[#FAF6F0] text-[#3D2B2E] border-[#F4ECE1]'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BASE COLOR PICKER */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B2E] mb-3">3. Base Gel Color Tone</label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_OPTIONS.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setConfig(prev => ({ ...prev, baseColor: c }))}
                        style={{ backgroundColor: c.hex }}
                        className={`w-10 h-10 rounded-full border-2 transition-transform ${config.baseColor.name === c.name ? 'scale-110 border-[#3D2B2E] shadow-md' : 'border-gray-200'}`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* FINISH SELECTOR */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B2E] mb-3">4. Polish Finish Coating</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {FINISHES.map(f => (
                      <button
                        key={f}
                        onClick={() => setConfig(prev => ({ ...prev, finish: f }))}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${config.finish === f ? 'bg-[#DFB3B2] text-white border-[#DFB3B2]' : 'bg-[#FAF6F0] text-[#3D2B2E] border-[#F4ECE1]'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ART ADDONS */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3D2B2E] mb-3">5. Handcrafted Art Add-ons</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ADDON_ART.map(art => {
                      const isSelected = config.selectedAddons.includes(art.id);
                      return (
                        <button
                          key={art.id}
                          onClick={() => {
                            setConfig(prev => ({
                              ...prev,
                              selectedAddons: isSelected 
                                ? prev.selectedAddons.filter(a => a !== art.id)
                                : [...prev.selectedAddons, art.id]
                            }));
                          }}
                          className={`p-3 rounded-2xl text-xs font-medium border flex justify-between items-center ${isSelected ? 'bg-[#E8C5C8]/30 border-[#DFB3B2] text-[#3D2B2E]' : 'bg-[#FAF6F0] border-[#F4ECE1] text-[#3D2B2E]'}`}
                        >
                          <span>{art.name}</span>
                          <span className="font-bold text-[#DFB3B2]">+${art.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ADD STUDIO DESIGN TO CART */}
                <button
                  onClick={() => addToCart({
                    id: `CUSTOM-${Date.now()}`,
                    title: `Custom ${config.shape} Set (${config.finish})`,
                    price: calculateConfigPrice(),
                    size: sizingProfile.assignedSize,
                    description: `Custom ${config.length} length set in ${config.baseColor.name} with ${config.selectedAddons.length} art addons.`
                  })}
                  className="w-full py-4 rounded-full bg-[#DFB3B2] text-white font-semibold hover:bg-[#d4a2a1] transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag size={18} /> Add Custom Studio Set to Cart (${calculateConfigPrice().toFixed(2)})
                </button>
              </div>

            </div>
          </section>
        )}

        {/* TAB 4: VIRTUAL SIZING ASSISTANT */}
        {activeTab === 'sizing' && (
          <section className="py-12 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB3B2]">Nailique Precision Fit</span>
              <h1 className="text-4xl md:text-5xl font-medium text-[#3D2B2E] mt-1">Virtual Sizing Assistant</h1>
              <p className="text-sm text-[#95A5A6] mt-2">Enter your fingernail bed width in millimeters to calculate your exact fit profile.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#F4ECE1] shadow-sm space-y-8">
              
              {/* VISUAL GUIDANCE */}
              <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#F4ECE1] flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#DFB3B2] shrink-0 shadow-sm">
                  <Ruler size={32} />
                </div>
                <div className="text-xs text-[#3D2B2E]/80 leading-relaxed">
                  <h4 className="font-bold text-sm text-[#3D2B2E] mb-1">How to Measure at Home:</h4>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Place clear tape horizontally across the widest part of your natural nail bed.</li>
                    <li>Mark both left and right cuticle edges with a fine tip marker.</li>
                    <li>Remove tape and measure distance between marks in millimeters (mm) using a ruler.</li>
                  </ol>
                </div>
              </div>

              {/* FINGER INPUT MATRIX */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2B2E] mb-4">Enter Millimeters (mm) per Finger</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { key: 'thumb', label: 'Thumb' },
                    { key: 'index', label: 'Index' },
                    { key: 'middle', label: 'Middle' },
                    { key: 'ring', label: 'Ring' },
                    { key: 'pinky', label: 'Pinky' }
                  ].map(finger => (
                    <div key={finger.key} className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#F4ECE1] text-center">
                      <label className="block text-xs font-semibold text-[#95A5A6] mb-2">{finger.label}</label>
                      <input 
                        type="number"
                        value={sizingProfile[finger.key]}
                        onChange={(e) => handleFingerMMChange(finger.key, e.target.value)}
                        className="w-full text-center bg-white p-2 rounded-xl border border-[#F4ECE1] font-bold text-[#3D2B2E] text-base outline-none focus:border-[#DFB3B2]"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">mm</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CALCULATED RESULT SUMMARY BOX */}
              <div className="p-6 bg-[#3D2B2E] text-white rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs uppercase text-[#DFB3B2] font-semibold tracking-wider">Your Assigned Size Profile</span>
                  <div className="text-2xl font-bold mt-1">{sizingProfile.assignedSize}</div>
                  <p className="text-xs text-gray-300 mt-1">Saved automatically to your session for quick checkout.</p>
                </div>
                <button 
                  onClick={() => showToast('Sizing profile updated and saved!')}
                  className="px-6 py-3 rounded-full bg-[#DFB3B2] text-white text-xs font-semibold hover:bg-[#d4a2a1]"
                >
                  Save Profile
                </button>
              </div>

            </div>
          </section>
        )}

        {/* TAB 5: DYNAMIC INTAKE WIZARD */}
        {activeTab === 'custom_wizard' && (
          <section className="py-12 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB3B2]">Custom Inquiry</span>
              <h1 className="text-4xl font-medium text-[#3D2B2E] mt-1">Nailique Design Intake</h1>
              <p className="text-sm text-[#95A5A6] mt-2">Have a specific reference photo or event date? Submit your spec sheet here.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#F4ECE1] shadow-sm">
              {!wizardCompleted ? (
                <div>
                  {/* PROGRESS BAR */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-semibold text-[#DFB3B2]">Step {wizardStep} of 5</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(step => (
                        <div key={step} className={`h-2 rounded-full transition-all ${step === wizardStep ? 'w-6 bg-[#DFB3B2]' : 'w-2 bg-[#FAF6F0]'}`} />
                      ))}
                    </div>
                  </div>

                  {/* STEP 1 */}
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#3D2B2E]">Are you a first-time client with Nailique?</h3>
                      {['Yes, first time ordering', 'No, returning client', 'Need sizing assistance first'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setWizardData(p => ({ ...p, clientType: opt })); setWizardStep(2); }}
                          className={`w-full p-4 text-left rounded-2xl border text-sm font-semibold transition-all ${wizardData.clientType === opt ? 'border-[#DFB3B2] bg-[#E8C5C8]/20' : 'border-[#F4ECE1] hover:bg-[#FAF6F0]'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* STEP 2 */}
                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#3D2B2E]">Select preferred nail shape</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {NAIL_SHAPES.map(shape => (
                          <button
                            key={shape}
                            onClick={() => { setWizardData(p => ({ ...p, shape })); setWizardStep(3); }}
                            className={`p-4 rounded-2xl border text-sm font-semibold ${wizardData.shape === shape ? 'border-[#DFB3B2] bg-[#E8C5C8]/20' : 'border-[#F4ECE1]'}`}
                          >
                            {shape}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#3D2B2E]">Select preferred length</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {NAIL_LENGTHS.map(len => (
                          <button
                            key={len}
                            onClick={() => { setWizardData(p => ({ ...p, length: len })); setWizardStep(4); }}
                            className={`p-4 rounded-2xl border text-sm font-semibold ${wizardData.length === len ? 'border-[#DFB3B2] bg-[#E8C5C8]/20' : 'border-[#F4ECE1]'}`}
                          >
                            {len}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {wizardStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#3D2B2E]">Target occasion & deadline date</h3>
                      <div>
                        <label className="block text-xs font-semibold text-[#95A5A6] mb-2">Required Delivery Date</label>
                        <input 
                          type="date" 
                          value={wizardData.targetDate}
                          onChange={(e) => setWizardData(p => ({ ...p, targetDate: e.target.value }))}
                          className="w-full p-4 rounded-2xl border border-[#F4ECE1] outline-none text-sm"
                        />
                      </div>
                      <button 
                        onClick={() => setWizardStep(5)}
                        className="w-full py-4 rounded-full bg-[#DFB3B2] text-white font-semibold"
                      >
                        Continue to Notes
                      </button>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {wizardStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-[#3D2B2E]">Describe your custom nail art vision</h3>
                      <textarea
                        rows={4}
                        placeholder="Specify color codes, inspo links, or theme notes..."
                        value={wizardData.notes}
                        onChange={(e) => setWizardData(p => ({ ...p, notes: e.target.value }))}
                        className="w-full p-4 rounded-2xl border border-[#F4ECE1] text-sm outline-none focus:border-[#DFB3B2]"
                      />
                      <button 
                        onClick={() => setWizardCompleted(true)}
                        className="w-full py-4 rounded-full bg-[#DFB3B2] text-white font-semibold"
                      >
                        Submit Inquiry & Generate Spec Sheet
                      </button>
                    </div>
                  )}

                  {/* CONTROLS */}
                  {wizardStep > 1 && (
                    <button onClick={() => setWizardStep(p => p - 1)} className="mt-6 text-xs font-semibold text-[#95A5A6] underline">
                      &larr; Back to previous step
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-[#E8C5C8]/30 text-[#DFB3B2] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl font-bold text-[#3D2B2E]">Inquiry Spec Sheet Generated!</h2>
                  <p className="text-xs text-[#95A5A6]">We have recorded your custom request preferences.</p>

                  <div className="bg-[#FAF6F0] p-4 rounded-2xl text-left text-xs space-y-2 border border-[#F4ECE1]">
                    <div><strong>Client Status:</strong> {wizardData.clientType}</div>
                    <div><strong>Shape & Length:</strong> {wizardData.shape} ({wizardData.length})</div>
                    <div><strong>Delivery Date:</strong> {wizardData.targetDate || 'Standard turnaround'}</div>
                    <div><strong>Art Vision:</strong> {wizardData.notes || 'None provided'}</div>
                  </div>

                  <button 
                    onClick={() => { setWizardCompleted(false); setWizardStep(1); }}
                    className="px-6 py-3 rounded-full bg-[#3D2B2E] text-white text-xs font-semibold"
                  >
                    Create Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 6: ORDER TRACKER */}
        {activeTab === 'tracker' && (
          <section className="py-12 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFB3B2]">Client Portal</span>
              <h1 className="text-4xl font-medium text-[#3D2B2E] mt-1">Live Order Status Tracker</h1>
              <p className="text-sm text-[#95A5A6] mt-2">Enter your order ID (e.g., NLQ-9842) to inspect real-time progress.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#F4ECE1] shadow-sm space-y-6">
              <form onSubmit={handleTrackOrder} className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Enter Order ID (e.g. NLQ-9842)"
                  value={trackerInput}
                  onChange={(e) => setTrackerInput(e.target.value)}
                  className="flex-1 p-4 rounded-2xl border border-[#F4ECE1] text-sm font-mono outline-none focus:border-[#DFB3B2]"
                />
                <button type="submit" className="px-6 py-4 rounded-2xl bg-[#DFB3B2] text-white font-semibold text-sm">
                  Track
                </button>
              </form>

              {trackerError && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium">
                  {trackerError}
                </div>
              )}

              {trackedOrder && (
                <div className="pt-6 border-t border-[#F4ECE1] space-y-6">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-xs text-[#95A5A6]">Client Name:</span>
                      <h4 className="font-bold text-[#3D2B2E]">{trackedOrder.client}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#95A5A6]">Estimated Arrival:</span>
                      <h4 className="font-bold text-[#DFB3B2]">{trackedOrder.estimatedDelivery}</h4>
                    </div>
                  </div>

                  {/* TRACKER PROGRESS STEPPER */}
                  <div className="space-y-3 pt-4">
                    {[
                      'Order Inquiry Received',
                      'Custom Sizing Verified',
                      'Handcrafted in Studio',
                      'Quality Control Inspection',
                      'Dispatched with Tracking'
                    ].map((stepLabel, idx) => {
                      const isComplete = idx + 1 <= trackedOrder.statusStep;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isComplete ? 'bg-[#DFB3B2] text-white' : 'bg-[#FAF6F0] text-gray-300'}`}>
                            {isComplete ? <Check size={14} /> : idx + 1}
                          </div>
                          <span className={`text-xs font-medium ${isComplete ? 'text-[#3D2B2E]' : 'text-gray-400'}`}>{stepLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* SLIDE-OVER E-COMMERCE CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl animate-fadeIn">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#F4ECE1]">
                <h3 className="text-xl font-medium text-[#3D2B2E]">Your Shopping Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-[#3D2B2E]">
                  <X size={20} />
                </button>
              </div>

              {/* FREE SHIPPING PROGRESS BAR */}
              <div className="my-4 p-3 bg-[#FAF6F0] rounded-2xl border border-[#F4ECE1]">
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span>Free Shipping Progress</span>
                  <span>{progressToFreeShipping >= 100 ? 'Unlocked!' : `$${(freeShippingThreshold - cartSubtotal).toFixed(2)} away`}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div style={{ width: `${progressToFreeShipping}%` }} className="h-full bg-[#DFB3B2] transition-all duration-300" />
                </div>
              </div>

              {/* CART ITEMS LIST */}
              {cart.length === 0 ? (
                <div className="py-16 text-center text-sm text-[#95A5A6]">
                  Your cart is empty. Explore our collection or configure a custom set!
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#FAF6F0] rounded-2xl border border-[#F4ECE1]">
                      <div>
                        <h4 className="text-xs font-bold text-[#3D2B2E]">{item.title}</h4>
                        <span className="text-[10px] text-[#95A5A6]">Size: {item.size} &bull; Qty: {item.qty}</span>
                        <div className="text-xs font-bold text-[#DFB3B2] mt-1">${(item.price * item.qty).toFixed(2)}</div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-xs text-red-400 hover:underline">
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CART FOOTER / CHECKOUT */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#F4ECE1] space-y-3">
                {/* COUPON CODE */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon (e.g. NAILIQUE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl border border-[#F4ECE1] text-xs uppercase outline-none"
                  />
                  <button 
                    onClick={() => {
                      if (couponCode.trim().toUpperCase() === 'NAILIQUE10') {
                        setDiscountPercent(10);
                        showToast('Applied 10% discount!');
                      } else {
                        showToast('Invalid coupon code.');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#3D2B2E] text-white text-xs font-semibold"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-[#95A5A6]">
                  <div className="flex justify-between"><span>Subtotal:</span> <span>${cartSubtotal.toFixed(2)}</span></div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#DFB3B2]"><span>Discount (10%):</span> <span>-${discountAmount.toFixed(2)}</span></div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#3D2B2E] pt-2 border-t border-[#F4ECE1]">
                    <span>Total Amount:</span>
                    <span className="text-[#DFB3B2]">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    alert(`Order confirmed! Thank you for ordering from Nailique.`);
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-4 rounded-full bg-[#DFB3B2] text-white font-semibold text-xs hover:bg-[#d4a2a1] transition-colors"
                >
                  Checkout Now (${cartTotal.toFixed(2)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#F4ECE1] py-12 px-6 mt-16 text-xs text-[#95A5A6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-[#3D2B2E] text-base">
            <Sparkles size={18} className="text-[#DFB3B2]" /> Nailique Studio.
          </div>
          <div>&copy; {new Date().getFullYear()} Nailique Luxury Press-On Nails. Handcrafted Studio.</div>
        </div>
      </footer>

    </div>
  );
}