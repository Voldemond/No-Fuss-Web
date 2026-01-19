import React, { useState, useEffect, useRef } from 'react';

const ScrollSequenceWebsite = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);
  const frameCount = 120;
  const images = useRef([]);

  // Pricing Calculator State
  const [selectedService, setSelectedService] = useState('personal');
  const [selectedOptions, setSelectedOptions] = useState({
    pages: 1,
    customDomain: false,
    hosting: 'free',
    database: 'none',
    cms: false,
    whatsapp: false,
    maps: false,
    analytics: false,
    seo: false,
    forms: false,
    ecommerce: false,
    backend: 'none'
  });

  const [showCalculator, setShowCalculator] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    timeline: 'standard',
    budget: ''
  });

  // Pricing Logic
  const calculatePrice = () => {
    let basePrice = 0;

    // Base service price
    if (selectedService === 'personal') basePrice = 2000;
    if (selectedService === 'business') basePrice = 5000;
    if (selectedService === 'ecommerce') basePrice = 10000;
    if (selectedService === 'custom') basePrice = 15000;

    // Additional pages
    if (selectedOptions.pages > 3) {
      basePrice += (selectedOptions.pages - 3) * 500;
    }

    // Features
    if (selectedOptions.customDomain) basePrice += 500;
    if (selectedOptions.hosting === 'premium') basePrice += 1000;
    if (selectedOptions.database === 'mysql') basePrice += 1500;
    if (selectedOptions.database === 'mongodb') basePrice += 2000;
    if (selectedOptions.cms) basePrice += 2500;
    if (selectedOptions.whatsapp) basePrice += 200;
    if (selectedOptions.maps) basePrice += 300;
    if (selectedOptions.analytics) basePrice += 500;
    if (selectedOptions.seo) basePrice += 1000;
    if (selectedOptions.forms) basePrice += 500;
    if (selectedOptions.ecommerce) basePrice += 5000;
    if (selectedOptions.backend === 'basic') basePrice += 3000;
    if (selectedOptions.backend === 'advanced') basePrice += 7000;

    return basePrice;
  };

  const totalPrice = calculatePrice();

  // Image loading logic
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/sequence/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          })
        );
        images.current[i] = img;
      }
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    loadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight * 4;
      const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
      setCurrentFrame(prev =>
        prev !== frameIndex + 1 ? frameIndex + 1 : prev
      );
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = images.current[currentFrame];

    if (img && img.complete && img.naturalWidth > 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, [currentFrame, imagesLoaded, windowSize]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `New Project Inquiry
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${selectedService}
Budget: ₹${totalPrice}
Timeline: ${formData.timeline}

Description:
${formData.description}

Selected Features:
- Pages: ${selectedOptions.pages}
- Custom Domain: ${selectedOptions.customDomain ? 'Yes' : 'No'}
- Hosting: ${selectedOptions.hosting}
- Database: ${selectedOptions.database}
- Backend: ${selectedOptions.backend}
- CMS: ${selectedOptions.cms ? 'Yes' : 'No'}
- WhatsApp Integration: ${selectedOptions.whatsapp ? 'Yes' : 'No'}
- Google Maps: ${selectedOptions.maps ? 'Yes' : 'No'}
- Analytics: ${selectedOptions.analytics ? 'Yes' : 'No'}
- SEO: ${selectedOptions.seo ? 'Yes' : 'No'}
- Contact Forms: ${selectedOptions.forms ? 'Yes' : 'No'}
- E-commerce: ${selectedOptions.ecommerce ? 'Yes' : 'No'}`;

    const whatsappUrl = `https://wa.me/919284638487?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white">
      {/* Hero Canvas Section */}
      <div className="sticky top-0 h-screen w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: imagesLoaded ? 'block' : 'none' }}
        />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-xs tracking-[0.4em] font-medium">LOADING</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className="container mx-auto px-8 lg:px-16 h-full flex items-center">
            <div
              className="text-black max-w-4xl"
              style={{
                opacity:
                  currentFrame < frameCount * 0.25
                    ? 1
                    : Math.max(
                      0,
                      1 - (currentFrame - frameCount * 0.25) / (frameCount * 0.25)
                    )
              }}
            >
              <h1 className="text-8xl lg:text-[12rem] font-black mb-6 tracking-tighter leading-none">
                No Fuss<br />Web
              </h1>
              <p className="text-2xl lg:text-4xl text-gray-600 mb-12 font-light tracking-tight">
                Kunal More — Backend Developer
              </p>
              <button
                onClick={() => setShowCalculator(true)}
                className="pointer-events-auto bg-black text-white px-12 py-6 rounded-full font-semibold hover:bg-gray-800 transition-all text-lg tracking-wide"
              >
                CALCULATE YOUR PROJECT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '400vh' }}></div>

      {/* Content Sections */}
      <div className="relative bg-white z-10 text-black">

        {/* Service Packages */}
        <section className="py-40 px-8 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-12 tracking-tighter">
              Choose Your<br />Package
            </h2>
            <p className="text-2xl text-gray-600 mb-24 max-w-3xl">
              Select a starting point. Every package is fully customizable with additional features.
            </p>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Personal Package */}
              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">01</div>
                <h3 className="text-3xl font-bold mb-4">Personal</h3>
                <p className="text-gray-600 mb-6">For students, freelancers, job seekers</p>
                <div className="text-4xl font-black mb-8">₹2,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>1-3 pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Mobile responsive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Free hosting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Contact form</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setSelectedService('personal'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              {/* Business Package */}
              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">02</div>
                <h3 className="text-3xl font-bold mb-4">Business</h3>
                <p className="text-gray-600 mb-6">For local shops, cafes, services</p>
                <div className="text-4xl font-black mb-8">₹5,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>5-8 pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Google Maps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>WhatsApp button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>SEO basics</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setSelectedService('business'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              {/* E-commerce Package */}
              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">03</div>
                <h3 className="text-3xl font-bold mb-4">E-commerce</h3>
                <p className="text-gray-600 mb-6">For online stores</p>
                <div className="text-4xl font-black mb-8">₹10,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Product catalog</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Shopping cart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Payment gateway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Order management</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setSelectedService('ecommerce'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              {/* Custom Package */}
              <div className="bg-black text-white border-4 border-black p-8">
                <div className="text-6xl font-black mb-4">04</div>
                <h3 className="text-3xl font-bold mb-4">Custom</h3>
                <p className="text-gray-400 mb-6">Full-stack applications</p>
                <div className="text-4xl font-black mb-8">₹15,000+</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Backend API</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Database setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>User authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>—</span>
                    <span>Admin panel</span>
                  </li>
                </ul>
                <button
                  onClick={() => { setSelectedService('custom'); setShowCalculator(true); }}
                  className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-40 px-8 lg:px-16 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-24 tracking-tighter">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Java', 'Spring Boot', 'React', 'REST APIs', 'MySQL', 'MongoDB', 'AWS', 'Docker'].map((tech) => (
                <div key={tech} className="text-center py-12 bg-white border-2 border-gray-200 hover:border-black transition-colors">
                  <span className="text-2xl font-bold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8 lg:px-16 border-t-4 border-black">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div>
                <h3 className="text-5xl font-black mb-4 tracking-tighter">KUNAL MORE</h3>
                <p className="text-gray-600 text-lg">Backend Developer</p>
              </div>
              <div className="space-y-2 text-lg">
                <p className="text-gray-600">Mumbai, India</p>
                <p className="font-bold">+91 7391836676</p>
                <p className="font-bold">morekunal1335@gmail.com</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Pricing Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-4 border-black p-8 flex justify-between items-center">
              <h2 className="text-4xl font-black">Project Calculator</h2>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-4xl font-bold hover:bg-gray-100 w-12 h-12 rounded-full"
              >
                ×
              </button>
            </div>

            <div className="p-8 grid lg:grid-cols-2 gap-12">
              {/* Left: Configuration */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Service Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'personal', label: 'Personal', price: '₹2K' },
                      { value: 'business', label: 'Business', price: '₹5K' },
                      { value: 'ecommerce', label: 'E-commerce', price: '₹10K' },
                      { value: 'custom', label: 'Custom', price: '₹15K+' }
                    ].map(service => (
                      <button
                        key={service.value}
                        onClick={() => setSelectedService(service.value)}
                        className={`p-4 border-2 rounded-xl font-bold transition-all ${selectedService === service.value
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                          }`}
                      >
                        {service.label}
                        <div className="text-sm font-normal mt-1">{service.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-2xl font-bold mb-4 block">Number of Pages</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={selectedOptions.pages}
                    onChange={(e) => setSelectedOptions({ ...selectedOptions, pages: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-right font-bold text-xl">{selectedOptions.pages} pages</div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Features</h3>

                  {[
                    { key: 'customDomain', label: 'Custom Domain', price: '+₹500' },
                    { key: 'cms', label: 'Content Management System', price: '+₹2,500' },
                    { key: 'whatsapp', label: 'WhatsApp Integration', price: '+₹200' },
                    { key: 'maps', label: 'Google Maps', price: '+₹300' },
                    { key: 'analytics', label: 'Analytics Dashboard', price: '+₹500' },
                    { key: 'seo', label: 'Advanced SEO', price: '+₹1,000' },
                    { key: 'forms', label: 'Contact Forms', price: '+₹500' }
                  ].map(feature => (
                    <label key={feature.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-black cursor-pointer transition-all">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOptions[feature.key]}
                          onChange={(e) => setSelectedOptions({ ...selectedOptions, [feature.key]: e.target.checked })}
                          className="w-6 h-6"
                        />
                        <span className="font-semibold">{feature.label}</span>
                      </div>
                      <span className="text-sm text-gray-600">{feature.price}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Hosting</h3>
                  <select
                    value={selectedOptions.hosting}
                    onChange={(e) => setSelectedOptions({ ...selectedOptions, hosting: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-semibold"
                  >
                    <option value="free">Free Hosting (Vercel/Netlify)</option>
                    <option value="premium">Premium Hosting (+₹1,000)</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Database</h3>
                  <select
                    value={selectedOptions.database}
                    onChange={(e) => setSelectedOptions({ ...selectedOptions, database: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-semibold"
                  >
                    <option value="none">No Database</option>
                    <option value="mysql">MySQL (+₹1,500)</option>
                    <option value="mongodb">MongoDB (+₹2,000)</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Backend</h3>
                  <select
                    value={selectedOptions.backend}
                    onChange={(e) => setSelectedOptions({ ...selectedOptions, backend: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl font-semibold"
                  >
                    <option value="none">No Backend</option>
                    <option value="basic">Basic API (+₹3,000)</option>
                    <option value="advanced">Advanced Backend (+₹7,000)</option>
                  </select>
                </div>
              </div>

              {/* Right: Form & Summary */}
              <div className="space-y-8">
                <div className="bg-black text-white p-8 rounded-2xl sticky top-0">
                  <h3 className="text-3xl font-black mb-6">Estimated Cost</h3>
                  <div className="text-7xl font-black mb-8">₹{totalPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-400 space-y-2">
                    <p>• Timeline: 3-7 days</p>
                    <p>• Free consultation included</p>
                    <p>• 1 month support</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-bold mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
                      placeholder="Kunal More"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
                      placeholder="kunal@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
                      placeholder="+91 98765 XXXX0"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">Project Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none resize-none"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none font-semibold"
                    >
                      <option value="urgent">Urgent (3-4 days) +20%</option>
                      <option value="standard">Standard (5-7 days)</option>
                      <option value="flexible">Flexible (7-14 days) -10%</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-6 rounded-full font-bold text-xl hover:bg-gray-800 transition-all"
                  >
                    SEND TO WHATSAPP
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, I'll receive your requirements via WhatsApp and respond within 24 hours with a detailed quote.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollSequenceWebsite;