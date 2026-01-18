import React, { useState, useEffect, useRef } from 'react';

const ScrollSequenceWebsite = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);
  const frameCount = 64;
  const images = useRef([]);

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
                opacity: currentFrame < 30 ? 1 : Math.max(0, 1 - (currentFrame - 30) / 30)
              }}
            >
              <h1 className="text-8xl lg:text-[12rem] font-black mb-6 tracking-tighter leading-none">
                No Fuss<br />Web
              </h1>
              <p className="text-2xl lg:text-4xl text-gray-600 mb-12 font-light tracking-tight">
                Kunal More — Backend Developer
              </p>
              <button className="pointer-events-auto bg-black text-white px-12 py-6 rounded-full font-semibold hover:bg-gray-800 transition-all text-lg tracking-wide">
                GET STARTED
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '400vh' }}></div>

      {/* Content Sections */}
      <div className="relative bg-white z-10 text-black">

        {/* About Section */}
        <section className="py-40 px-8 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div>
                <h2 className="text-7xl lg:text-8xl font-black mb-12 tracking-tighter leading-none">
                  About
                </h2>
                <div className="space-y-8 text-xl text-gray-600 leading-relaxed">
                  <p>
                    Java Backend & CCM Developer at FCI Company, specializing in enterprise workflows and scalable architectures.
                  </p>
                  <p>
                    Graduate from CDAC's PG-DAC program with expertise in Spring Boot, REST APIs, and modern cloud technologies.
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="border-l-4 border-black pl-8">
                  <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-3 font-medium">CURRENT</h3>
                  <p className="text-2xl font-bold">Backend Developer</p>
                  <p className="text-gray-600">FCI Company — Quadient CCM</p>
                </div>

                <div className="border-l-4 border-black pl-8">
                  <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-3 font-medium">EDUCATION</h3>
                  <p className="text-2xl font-bold">PG-DAC</p>
                  <p className="text-gray-600">CDAC • BE in IT (7.9 CGPA)</p>
                </div>

                <div className="border-l-4 border-black pl-8">
                  <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-3 font-medium">LOCATION</h3>
                  <p className="text-2xl font-bold">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-40 px-8 lg:px-16 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-24 tracking-tighter">
              Services
            </h2>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Personal Sites */}
              <div className="bg-white p-12 group hover:shadow-2xl transition-shadow">
                <div className="mb-8">
                  <span className="text-6xl font-black">01</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">Personal Websites</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  For students, freelancers, and job seekers
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>1–3 pages, fully responsive</span>
                  </li>
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>Deployed with custom domain</span>
                  </li>
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>SEO optimized</span>
                  </li>
                </ul>
                <div className="text-5xl font-black">₹2,000+</div>
              </div>

              {/* Business Sites */}
              <div className="bg-white p-12 group hover:shadow-2xl transition-shadow">
                <div className="mb-8">
                  <span className="text-6xl font-black">02</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">Business Websites</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  For local shops, cafes, and services
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>Multi-page professional site</span>
                  </li>
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>Google Maps & WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-4 text-lg text-gray-700">
                    <span className="text-2xl">—</span>
                    <span>Contact forms & analytics</span>
                  </li>
                </ul>
                <div className="text-5xl font-black">₹5,000+</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-40 px-8 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-24 tracking-tighter">
              Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Java', 'Spring Boot', 'React', 'REST APIs', 'MySQL', 'AWS', 'Docker', 'Git'].map((tech) => (
                <div key={tech} className="text-center py-12 border border-gray-200 hover:border-black transition-colors">
                  <span className="text-2xl font-bold">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-40 px-8 lg:px-16 bg-black text-white">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-8xl font-black mb-24 tracking-tighter">
              Process
            </h2>

            <div className="space-y-16">
              <div className="border-l-4 border-white pl-12">
                <div className="text-8xl font-black mb-4">01</div>
                <h3 className="text-4xl font-bold mb-4">Share</h3>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Tell me your requirements via WhatsApp or email
                </p>
              </div>

              <div className="border-l-4 border-white pl-12">
                <div className="text-8xl font-black mb-4">02</div>
                <h3 className="text-4xl font-bold mb-4">Build</h3>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  I design and develop with clean code and modern design
                </p>
              </div>

              <div className="border-l-4 border-white pl-12">
                <div className="text-8xl font-black mb-4">03</div>
                <h3 className="text-4xl font-bold mb-4">Launch</h3>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Your site goes live in 3–5 days, fully deployed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-8 lg:px-16">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-7xl lg:text-9xl font-black mb-16 tracking-tighter leading-none">
              Let's Work<br />Together
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <a
                href="https://wa.me/917391836676"
                className="bg-black text-white px-16 py-8 rounded-full font-bold text-xl hover:bg-gray-800 transition-all inline-block text-center"
              >
                WHATSAPP
              </a>
              <a
                href="mailto:morekunal1335@gmail.com"
                className="border-4 border-black text-black px-16 py-8 rounded-full font-bold text-xl hover:bg-black hover:text-white transition-all inline-block text-center"
              >
                EMAIL
              </a>
            </div>
            <p className="text-gray-400 text-sm tracking-[0.3em]">
              STARTS AT ₹2,000 • 3-5 DAYS DELIVERY
            </p>
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
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-400 text-sm">© 2026 Kunal More</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Debug */}
      <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg text-xs font-mono">
        {currentFrame}/{frameCount}
      </div>
    </div>
  );
};

export default ScrollSequenceWebsite;