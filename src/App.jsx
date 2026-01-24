import React, { useState, useEffect, useRef } from 'react';

const ScrollSequenceWebsite = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);
  const frameCount = 120; // Back to 120 frames
  const images = useRef([]);

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
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    timeline: 'standard',
    budget: ''
  });

  const projects = [
    {
      title: 'Kunal More Portfolio',
      description: 'Personal portfolio website with dark mode, responsive design, and interactive animations',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      timeline: '3 days',
      type: 'Personal Website',
      image: '🎨',
      live: 'https://kunal-more-portfolio.vercel.app/',
      github: '#',
      features: ['Dark Mode', 'Responsive', 'Animations', 'Contact Form']
    },
    {
      title: 'PasteKaro',
      description: 'Code sharing application with syntax highlighting and instant sharing capabilities',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      timeline: '5 days',
      type: 'Web Application',
      image: '💻',
      live: 'https://pastekaro.vercel.app/',
      github: '#',
      features: ['Syntax Highlighting', 'Real-time Sharing', 'Copy to Clipboard', 'Code Formatting']
    },
    {
      title: 'Dinezzy',
      description: 'Full-stack food ordering and restaurant management platform with real-time features',
      tech: ['React', 'Firebase', 'JavaScript', 'HTML/CSS'],
      timeline: '7 days',
      type: 'Full-Stack Application',
      image: '🍕',
      live: 'https://dinezzy-48f0f.web.app/home',
      github: 'https://github.com/Voldemond/Dinezzy',
      features: ['Real-time Orders', 'Restaurant Management', 'User Authentication', 'Firebase Integration']
    }
  ];

  const calculatePrice = () => {
    let basePrice = 0;

    if (selectedService === 'personal') basePrice = 2000;
    if (selectedService === 'business') basePrice = 5000;
    if (selectedService === 'ecommerce') basePrice = 10000;
    if (selectedService === 'custom') basePrice = 15000;

    if (selectedOptions.pages > 3) {
      basePrice += (selectedOptions.pages - 3) * 500;
    }

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
      setCurrentFrame(frameIndex + 1);
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
Estimated Budget: ₹${totalPrice}
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
- Contact Forms: ${selectedOptions.forms ? 'Yes' : 'No'}`;

    const whatsappUrl = `https://wa.me/917391836676?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white">
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          style={{ opacity: imagesLoaded ? 0 : 1, transition: 'opacity 0.5s' }} />

        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: imagesLoaded ? 'block' : 'none' }}
        />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-white text-sm tracking-[0.4em] font-medium">LOADING</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className="container mx-auto px-8 lg:px-16 h-full flex items-center">
            <div
              className="text-white max-w-4xl"
              style={{
                opacity: currentFrame < 30 ? 1 : Math.max(0, 1 - (currentFrame - 30) / 30)
              }}
            >
              <h1 className="text-8xl lg:text-[12rem] font-black mb-6 tracking-tighter leading-none drop-shadow-2xl">
                No Fuss<br />Web
              </h1>
              <p className="text-2xl lg:text-4xl text-gray-200 mb-12 font-light tracking-tight drop-shadow-lg">
                Kunal More — Backend Developer
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowCalculator(true)}
                  className="pointer-events-auto bg-white text-black px-12 py-6 rounded-full font-semibold hover:bg-gray-200 transition-all text-lg tracking-wide shadow-2xl"
                >
                  CALCULATE YOUR PROJECT
                </button>
                <button
                  onClick={() => setShowPortfolio(true)}
                  className="pointer-events-auto border-2 border-white text-white px-12 py-6 rounded-full font-semibold hover:bg-white hover:text-black transition-all text-lg tracking-wide"
                >
                  VIEW PROJECTS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '400vh' }}></div>

      <div className="relative bg-white z-10 text-black">

        <section className="py-40 px-8 lg:px-16 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
                Recent Work
              </h2>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Real projects, real results. See what I've built recently.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {projects.slice(0, 2).map((project, idx) => (
                <div key={idx} className="bg-white border-4 border-gray-200 hover:border-black transition-all group">
                  <div className="p-12">
                    <div className="text-8xl mb-6">{project.image}</div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-4 py-2 bg-black text-white text-sm font-bold">{project.type}</span>
                      <span className="text-sm text-gray-500">⏱️ {project.timeline}</span>
                    </div>
                    <h3 className="text-4xl font-black mb-4">{project.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{project.description}</p>

                    <div className="mb-6">
                      <h4 className="font-bold mb-3">Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold mb-3">Tech Stack:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 border-2 border-black text-sm font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                    >
                      VIEW LIVE →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => setShowPortfolio(true)}
                className="bg-black text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-gray-800 transition-all"
              >
                SEE ALL PROJECTS
              </button>
            </div>
          </div>
        </section>

        <section className="py-40 px-8 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-12 tracking-tighter">
              Choose Your<br />Package
            </h2>
            <p className="text-2xl text-gray-600 mb-24 max-w-3xl">
              Select a starting point. Every package is fully customizable.
            </p>

            <div className="grid lg:grid-cols-4 gap-8">
              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">01</div>
                <h3 className="text-3xl font-bold mb-4">Personal</h3>
                <p className="text-gray-600 mb-6">Students, freelancers, job seekers</p>
                <div className="text-4xl font-black mb-8">₹2,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex gap-2"><span>—</span><span>1-3 pages</span></li>
                  <li className="flex gap-2"><span>—</span><span>Mobile responsive</span></li>
                  <li className="flex gap-2"><span>—</span><span>Free hosting</span></li>
                  <li className="flex gap-2"><span>—</span><span>Contact form</span></li>
                </ul>
                <button
                  onClick={() => { setSelectedService('personal'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">02</div>
                <h3 className="text-3xl font-bold mb-4">Business</h3>
                <p className="text-gray-600 mb-6">Local shops, cafes, services</p>
                <div className="text-4xl font-black mb-8">₹5,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex gap-2"><span>—</span><span>5-8 pages</span></li>
                  <li className="flex gap-2"><span>—</span><span>Google Maps</span></li>
                  <li className="flex gap-2"><span>—</span><span>WhatsApp button</span></li>
                  <li className="flex gap-2"><span>—</span><span>SEO basics</span></li>
                </ul>
                <button
                  onClick={() => { setSelectedService('business'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              <div className="bg-white border-4 border-gray-200 p-8 hover:border-black transition-all">
                <div className="text-6xl font-black mb-4">03</div>
                <h3 className="text-3xl font-bold mb-4">E-commerce</h3>
                <p className="text-gray-600 mb-6">Online stores</p>
                <div className="text-4xl font-black mb-8">₹10,000</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex gap-2"><span>—</span><span>Product catalog</span></li>
                  <li className="flex gap-2"><span>—</span><span>Shopping cart</span></li>
                  <li className="flex gap-2"><span>—</span><span>Payment gateway</span></li>
                  <li className="flex gap-2"><span>—</span><span>Order management</span></li>
                </ul>
                <button
                  onClick={() => { setSelectedService('ecommerce'); setShowCalculator(true); }}
                  className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all"
                >
                  CUSTOMIZE
                </button>
              </div>

              <div className="bg-black text-white border-4 border-black p-8">
                <div className="text-6xl font-black mb-4">04</div>
                <h3 className="text-3xl font-bold mb-4">Custom</h3>
                <p className="text-gray-400 mb-6">Full-stack applications</p>
                <div className="text-4xl font-black mb-8">₹15,000+</div>
                <ul className="space-y-3 text-sm mb-8">
                  <li className="flex gap-2"><span>—</span><span>Backend API</span></li>
                  <li className="flex gap-2"><span>—</span><span>Database setup</span></li>
                  <li className="flex gap-2"><span>—</span><span>Authentication</span></li>
                  <li className="flex gap-2"><span>—</span><span>Admin panel</span></li>
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

        {/* Website Styles Showcase */}
        <section className="py-40 px-8 lg:px-16 bg-black text-white overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-32">
              <h2 className="text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
                Choose Your<br />Style
              </h2>
              <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
                Every website is unique. Pick a style that matches your personality.
              </p>
            </div>

            {/* Style Cards */}
            <div className="space-y-32">
              {/* Minimal Style */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-bold mb-6">
                    01 • MINIMAL
                  </div>
                  <h3 className="text-6xl font-black mb-6 tracking-tight">
                    Clean &<br />Simple
                  </h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Less is more. Focused on content with plenty of white space. Perfect for portfolios and personal brands.
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Typography-focused design</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Subtle animations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Fast loading speeds</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-white/10 transition-all">
                  <div className="space-y-8">
                    <div className="h-4 w-32 bg-white/20 rounded"></div>
                    <div className="h-32 w-full bg-white/10 rounded-xl"></div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-white/10 rounded"></div>
                      <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                      <div className="h-3 w-4/6 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-12 w-32 bg-white/20 rounded-full"></div>
                      <div className="h-12 w-32 bg-white/5 border border-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bold Style */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-12 hover:from-purple-600/30 hover:to-pink-600/30 transition-all">
                    <div className="space-y-8">
                      <div className="h-6 w-40 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-purple-500/20 rounded-xl"></div>
                        <div className="h-32 bg-pink-500/20 rounded-xl"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-white/10 rounded"></div>
                        <div className="h-4 w-4/5 bg-white/10 rounded"></div>
                      </div>
                      <div className="h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-sm font-bold mb-6">
                    02 • BOLD
                  </div>
                  <h3 className="text-6xl font-black mb-6 tracking-tight">
                    Vibrant &<br />Colorful
                  </h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Make a statement. Bold colors, gradients, and eye-catching visuals. Perfect for creative agencies and startups.
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      <span>Vibrant color schemes</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      <span>Dynamic animations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                      <span>Modern gradients</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Classic Style */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block px-6 py-2 bg-amber-600/20 rounded-full text-sm font-bold mb-6">
                    03 • CLASSIC
                  </div>
                  <h3 className="text-6xl font-black mb-6 tracking-tight">
                    Timeless &<br />Professional
                  </h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Elegant and sophisticated. Traditional layouts with modern touches. Perfect for law firms, consultants, and established businesses.
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>Professional aesthetics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>Trust-building design</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span>Established brand feel</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-600/5 backdrop-blur-sm border border-amber-600/20 rounded-3xl p-12 hover:bg-amber-600/10 transition-all">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-amber-600/20 rounded-full"></div>
                      <div className="h-4 w-40 bg-white/20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white/5 border border-white/10 rounded-lg"></div>
                      <div className="h-24 bg-white/5 border border-white/10 rounded-lg"></div>
                      <div className="h-24 bg-white/5 border border-white/10 rounded-lg"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-white/10 rounded"></div>
                      <div className="h-3 w-5/6 bg-white/10 rounded"></div>
                    </div>
                    <div className="h-12 bg-amber-600/20 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Raw/Brutalist Style */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="bg-white text-black border-4 border-white rounded-3xl p-12 hover:shadow-2xl transition-all">
                    <div className="space-y-6">
                      <div className="h-8 bg-black font-black flex items-center px-4 text-xs">
                        RAW.DESIGN
                      </div>
                      <div className="border-4 border-black h-40"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-black"></div>
                        <div className="h-4 bg-black w-3/4"></div>
                      </div>
                      <div className="h-14 bg-black border-4 border-black"></div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="inline-block px-6 py-2 bg-white text-black rounded-full text-sm font-bold mb-6">
                    04 • RAW
                  </div>
                  <h3 className="text-6xl font-black mb-6 tracking-tight">
                    Bold &<br />Unconventional
                  </h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Break the rules. Brutalist aesthetics, raw design, and unique layouts. Perfect for artists, designers, and rebels.
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Brutalist aesthetics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Asymmetric layouts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      <span>Experimental design</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tech/Modern Style */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-block px-6 py-2 bg-blue-600/20 rounded-full text-sm font-bold mb-6">
                    05 • TECH
                  </div>
                  <h3 className="text-6xl font-black mb-6 tracking-tight">
                    Modern &<br />Innovative
                  </h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Cutting-edge design. Glass morphism, 3D elements, and futuristic aesthetics. Perfect for tech startups and SaaS products.
                  </p>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Glassmorphism effects</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>3D illustrations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Micro-interactions</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-3xl opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-blue-600/10 to-cyan-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-12 hover:border-blue-500/50 transition-all">
                    <div className="space-y-8">
                      <div className="h-4 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
                        <div className="relative h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-2xl"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"></div>
                        <div className="h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"></div>
                        <div className="h-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"></div>
                      </div>
                      <div className="h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-32">
              <p className="text-2xl text-gray-400 mb-8">
                Not sure which style fits you?
              </p>
              <button
                onClick={() => setShowCalculator(true)}
                className="bg-white text-black px-16 py-6 rounded-full font-bold text-xl hover:bg-gray-200 transition-all"
              >
                LET'S DISCUSS YOUR VISION
              </button>
            </div>
          </div>
        </section>

        <section className="py-40 px-8 lg:px-16 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-20 tracking-tighter text-center">
              FAQ
            </h2>

            <div className="space-y-6">
              {[
                { q: 'Do I need to provide anything?', a: 'Just your content (text, images, logo). I handle all technical work.' },
                { q: 'Can I see the website before it\'s finished?', a: 'Yes! I share preview links throughout development.' },
                { q: 'What if I need changes later?', a: 'First month: free minor changes. After: ₹500/hour.' },
                { q: 'How do I pay?', a: '50% upfront, 50% on delivery. UPI or bank transfer.' },
                { q: 'Will I own the website?', a: 'Yes! Complete ownership. All files are yours.' }
              ].map((faq, idx) => (
                <details key={idx} className="bg-white border-4 border-gray-200 hover:border-black transition-all">
                  <summary className="p-8 cursor-pointer font-bold text-2xl">
                    {faq.q}
                  </summary>
                  <p className="px-8 pb-8 text-lg text-gray-600">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

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

      {/* Portfolio Modal */}
      {showPortfolio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-4 border-black p-8 flex justify-between items-center z-10">
              <h2 className="text-4xl font-black">All Projects</h2>
              <button
                onClick={() => setShowPortfolio(false)}
                className="text-4xl font-bold hover:bg-gray-100 w-12 h-12 rounded-full"
              >
                ×
              </button>
            </div>
            <div className="p-8 grid gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="border-4 border-gray-200 p-8 hover:border-black transition-all">
                  <div className="text-6xl mb-4">{project.image}</div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-black text-white text-sm font-bold">{project.type}</span>
                    <span className="text-sm text-gray-500">⏱️ {project.timeline}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.map((feature, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full">{feature}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-black text-white text-sm font-bold">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800">
                      VIEW LIVE →
                    </a>
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-black text-black px-6 py-3 rounded-full font-bold hover:bg-black hover:text-white">
                        GITHUB →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calculator Modal - Full detailed version */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full my-8">
            <div className="sticky top-0 bg-white border-b-4 border-black p-8 flex justify-between items-center rounded-t-3xl z-10">
              <h2 className="text-4xl font-black">Project Calculator</h2>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-4xl font-bold hover:bg-gray-100 w-12 h-12 rounded-full"
              >
                ×
              </button>
            </div>

            <div className="p-8 grid lg:grid-cols-2 gap-12 max-h-[70vh] overflow-y-auto">
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
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
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
                      placeholder="+91 98765 43210"
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

      {/* Debug Info */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg text-sm">
        Frame: {currentFrame} / {frameCount}
      </div>
    </div>
  );
};

export default ScrollSequenceWebsite;