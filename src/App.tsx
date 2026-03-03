import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Instagram, Facebook, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { OptimizedImage } from "./components/OptimizedImage";

type Page = 'home' | 'portfolio' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-gold/20">
      <div className="film-grain" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-1000 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-10'}`}>
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 flex justify-between items-center">
          <button
            onClick={() => navigate('home')}
            className="group flex items-center space-x-4"
          >
            <img
              src="/logo.jpg"
              alt="Rom Com Photographer PH"
              className={`h-10 md:h-12 w-auto object-contain transition-all duration-700 ${!scrolled && currentPage === 'home' ? 'brightness-0 invert' : ''}`}
            />
          </button>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-20 text-editorial-cap transition-colors duration-700 ${!scrolled && currentPage === 'home' ? 'text-white' : 'text-brand-ink'}`}>
            {(['home', 'portfolio', 'about', 'contact'] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`relative group overflow-hidden ${currentPage === page ? 'text-brand-gold' : ''}`}
              >
                <span className="block transition-transform duration-700 group-hover:-translate-y-full">{page}</span>
                <span className="absolute top-full left-0 block transition-transform duration-700 group-hover:-translate-y-full text-brand-gold">{page}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden z-[70] transition-colors duration-700 ${!scrolled && currentPage === 'home' ? 'text-white' : 'text-brand-ink'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-brand-beige z-[65] flex flex-col justify-center items-center space-y-12 md:hidden"
            >
              {(['home', 'portfolio', 'about', 'contact'] as Page[]).map((page, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  key={page}
                  onClick={() => navigate(page)}
                  className="text-4xl uppercase tracking-[0.2em] font-display italic text-brand-ink"
                >
                  {page}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentPage === 'home' && <HomePage navigate={navigate} />}
            {currentPage === 'portfolio' && <PortfolioPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-ink py-40 px-8 border-t border-brand-ink/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24">
          <div className="md:col-span-5">
            <img src="/logo.jpg" alt="Rom Com Photographer PH" className="h-16 w-auto object-contain brightness-0 invert mb-8" />
            <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">
              We don't just take pictures. We craft cinematic memories that feel like the best parts of your favorite love story.
            </p>
          </div>
          <div className="md:col-span-3 flex flex-col space-y-4 text-[10px] uppercase tracking-[0.4em] font-bold text-white/60">
            <button onClick={() => navigate('portfolio')} className="hover:text-brand-gold text-left transition-colors duration-700">Portfolio</button>
            <button onClick={() => navigate('about')} className="hover:text-brand-gold text-left transition-colors duration-700">About</button>
            <button onClick={() => navigate('contact')} className="hover:text-brand-gold text-left transition-colors duration-700">Contact</button>
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-between">
            <div className="flex space-x-8 mb-8 md:mb-0">
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mb-2">Based in Manila, PH</p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">&copy; 2025 Rom Com Photographer PH</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1516051662687-567d7c4e8f6a?auto=format&fit=crop&q=80&w=2000"
            alt="Romantic Couple with Coffee"
            className="w-full h-full"
            imgClassName="animate-slow-pan grayscale contrast-125 brightness-75"
            priority={true}
          />
          <div className="absolute inset-0 bg-brand-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/40 via-transparent to-brand-ink/60" />
        </div>

        <div className="relative z-10 text-center text-white px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-editorial-cap mb-20 tracking-[1em] text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Your RomCom Moments</span>
            <h1 className="text-[18vw] md:text-[14vw] text-editorial-title mb-20 font-light text-white drop-shadow-2xl" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.1)' }}>
              Love <br />
              <span className="italic font-light opacity-100">in Photos</span>
            </h1>
            <div className="max-w-md mx-auto">
              <p className="text-[9px] md:text-[10px] font-light tracking-[0.6em] mb-20 opacity-50 uppercase leading-loose">
                Capturing the quiet, intimate magic of your everyday love.
              </p>
              <button
                onClick={() => navigate('portfolio')}
                className="group relative px-12 py-5 overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-1000"
              >
                <span className="relative z-10 text-editorial-cap">View Archives</span>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
        >
          <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
            <motion.div
              animate={{ top: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* FB Header Banner Section */}
      <section className="py-0">
        <div className="w-full">
          <img
            src="/header.jpg"
            alt="Your RomCom Moments in Photos"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Intro Section - Split Layout */}
      <section className="py-72 px-8 md:px-32 bg-brand-paper/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-56 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="absolute -left-16 top-0 hidden xl:block">
              <span className="vertical-rail">EST. 2018</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-editorial-cap text-brand-gold mb-12 block">Philosophy</span>
              <h2 className="text-6xl md:text-8xl text-editorial-title mb-20 font-light">
                Moments <br />
                <span className="pl-20 italic font-light opacity-30">Unscripted.</span>
              </h2>
              <p className="text-editorial-serif text-brand-muted mb-20 max-w-lg">
                We believe that the most beautiful parts of a love story aren't the ones that are posed. They're the quiet glances, the messy laughs, and the raw emotion that happens between the frames.
              </p>
              <button onClick={() => navigate('about')} className="group flex items-center space-x-10">
                <span className="text-editorial-cap">The Artist</span>
                <div className="w-16 h-[1px] bg-brand-ink/20 group-hover:w-24 group-hover:bg-brand-gold transition-all duration-1000" />
              </button>
            </motion.div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="image-reveal aspect-[16/11] shadow-[0_40px_100px_-20px_rgba(28,61,42,0.15)]">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1500"
                alt="Intimate Laugh"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid - Asymmetrical */}
      <section className="py-80 bg-brand-cream">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-48 gap-12">
            <div className="relative">
              <span className="text-editorial-cap text-brand-gold mb-6 block">Selected Works</span>
              <h3 className="text-7xl md:text-9xl text-editorial-title font-light">The Archives</h3>
            </div>
            <button onClick={() => navigate('portfolio')} className="text-editorial-cap border-b border-brand-ink/10 pb-3 hover:border-brand-gold transition-colors duration-700">Explore Gallery</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <div className="image-reveal aspect-[4/5] mb-12 shadow-[0_30px_80px_-15px_rgba(28,61,42,0.1)]">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200"
                  alt="Story 1"
                  className="w-full h-full"
                />
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h4 className="text-3xl font-display italic mb-3 font-light">Rainy Day Romance</h4>
                  <p className="text-editorial-cap text-brand-muted">Everyday Intimacy</p>
                </div>
                <span className="text-editorial-cap opacity-20">01</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 md:mt-48"
            >
              <div className="image-reveal aspect-[3/4] mb-12 shadow-[0_30px_80px_-15px_rgba(28,61,42,0.1)]">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1000"
                  alt="Story 2"
                  className="w-full h-full"
                />
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h4 className="text-3xl font-display italic mb-3 font-light">Quiet Mornings</h4>
                  <p className="text-editorial-cap text-brand-muted">Home Sessions</p>
                </div>
                <span className="text-editorial-cap opacity-20">02</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial - Immersive */}
      <section className="relative py-80 px-8 overflow-hidden bg-brand-paper/20">
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=2000"
            alt="Background"
            className="w-full h-full"
            imgClassName="opacity-10 grayscale"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Heart className="mx-auto mb-16 text-brand-gold/40" size={24} strokeWidth={1} />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl text-editorial-title mb-20 text-brand-ink/80 font-light"
          >
            "Chris has an incredible way of making you forget the camera is even there. Our photos look like stills from our favorite romantic movie."
          </motion.p>
          <div className="flex flex-col items-center space-y-4">
            <span className="text-editorial-cap text-brand-gold">Sofia & Marco</span>
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-30">Manila, 2023</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-80 px-8 text-center bg-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-brand-gold)_0%,_transparent_70%)]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <span className="text-editorial-cap text-brand-gold mb-16 block opacity-60">Begin Your Story</span>
          <h2 className="text-8xl md:text-[14vw] text-editorial-title mb-24 text-white font-light">
            Let's Make <br />
            <span className="italic font-light opacity-20 text-white">Magic</span>
          </h2>
          <button
            onClick={() => navigate('contact')}
            className="group relative px-20 py-8 overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-1000"
          >
            <span className="relative z-10 text-editorial-cap text-white">Book Your Session</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}

function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Everyday', 'Lifestyle', 'Anniversaries', 'Intimate'];

  const items = [
    { cat: 'Everyday', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', caption: 'The quiet magic of a shared morning.' },
    { cat: 'Lifestyle', img: 'https://images.unsplash.com/photo-1522673607200-1648832cee98', caption: 'Finding beauty in the ordinary rhythm.' },
    { cat: 'Anniversaries', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b', caption: 'A decade of love, captured in a glance.' },
    { cat: 'Intimate', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed', caption: 'The space between breaths.' },
    { cat: 'Everyday', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952', caption: 'Unscripted laughter in the afternoon sun.' },
    { cat: 'Lifestyle', img: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad', caption: 'Chasing shadows across the city streets.' },
    { cat: 'Anniversaries', img: 'https://images.unsplash.com/photo-1519741497674-611481863552', caption: 'Every year a new chapter, every frame a memory.' },
    { cat: 'Intimate', img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7', caption: 'Whispers that only the heart can hear.' },
  ];

  const filteredItems = filter === 'All' ? items : items.filter(i => i.cat === filter);

  return (
    <div className="pt-64 pb-48 px-8 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-48 gap-16">
          <div className="max-w-3xl">
            <span className="text-editorial-cap text-brand-gold mb-8 block">The Gallery</span>
            <h1 className="text-7xl md:text-[10vw] text-editorial-title font-light">Love in Motion</h1>
          </div>
          <div className="flex flex-wrap gap-10 text-editorial-cap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-3 border-b transition-all duration-700 ${filter === cat ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-ink'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {filteredItems.map((item, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              key={i}
              className="group"
            >
              <div className={`image-reveal ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'} shadow-[0_20px_60px_-10px_rgba(28,61,42,0.08)]`}>
                <OptimizedImage
                  src={`${item.img}?auto=format&fit=crop&q=80&w=800`}
                  alt={item.cat}
                  className="w-full h-full"
                  imgClassName="grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="mt-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-editorial-cap text-brand-gold">{item.cat}</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-30">Archive No. {i + 1}</span>
                </div>
                <p className="text-editorial-serif text-sm italic text-brand-muted leading-relaxed">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-64">
      <section className="max-w-[1600px] mx-auto px-8 md:px-16 mb-64">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-56 items-center">
          <div className="lg:col-span-7 relative">
            <div className="image-reveal aspect-[16/11] shadow-[0_40px_100px_-20px_rgba(28,61,42,0.15)]">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1500"
                alt="Chris"
                className="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-16 -left-16 bg-brand-ink p-24 hidden xl:block max-w-sm shadow-2xl">
              <h3 className="text-5xl text-editorial-title mb-8 text-white font-light">Chris</h3>
              <p className="text-editorial-cap opacity-40 text-white">Lead Storyteller</p>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -right-16 top-0 hidden xl:block">
              <span className="vertical-rail">THE ARTIST</span>
            </div>
            <span className="text-editorial-cap text-brand-gold mb-10 block">Background</span>
            <h2 className="text-7xl md:text-9xl text-editorial-title mb-16 font-light">Chasing <br /> the Light.</h2>
            <div className="space-y-10 text-editorial-serif text-brand-muted">
              <p>I've always been obsessed with the way movies make us feel. That specific magic when the music, the light, and the emotion all align to tell a story that stays with you.</p>
              <p>That's how I approach photography. I'm not looking for the perfect pose; I'm looking for the perfect feeling. The one that makes you catch your breath when you look back at it years from now.</p>
              <p>Based in Manila, but my heart is wherever the next story takes me.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream py-80 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 md:gap-56">
            {[
              { title: "The Connection", desc: "We don't start with cameras. We start with a conversation. I want to know what makes your love yours." },
              { title: "The Atmosphere", desc: "I create a space where you can just be. No pressure, no stiff posing, just you two." },
              { title: "The Legacy", desc: "You receive a curated gallery of cinematic stills that tell your story for generations." }
            ].map((item, i) => (
              <div key={i} className="group">
                <span className="text-5xl font-display italic text-brand-gold/10 group-hover:text-brand-gold transition-colors duration-1000 block mb-10 font-light">0{i+1}</span>
                <h3 className="text-3xl font-display mb-8 italic font-light">{item.title}</h3>
                <p className="text-editorial-serif text-brand-muted text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="pt-64 pb-48 px-8 md:px-16">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-56">
        <div className="lg:col-span-5 relative">
          <div className="absolute -left-16 top-0 hidden xl:block">
            <span className="vertical-rail">CONTACT</span>
          </div>
          <span className="text-editorial-cap text-brand-gold mb-12 block">Inquiry</span>
          <h1 className="text-7xl md:text-[10vw] text-editorial-title mb-20 font-light">Let's Tell <br /> Your Story</h1>
          <p className="text-editorial-serif text-brand-muted mb-24 max-w-md">
            Currently accepting a limited number of cinematic sessions for 2025 & 2026.
          </p>

          <div className="space-y-16">
            <div className="group cursor-pointer">
              <h3 className="text-editorial-cap text-brand-muted mb-6 group-hover:text-brand-gold transition-colors duration-700">Email</h3>
              <p className="text-3xl font-display italic font-light">hello@romcomph.com</p>
            </div>
            <div className="group cursor-pointer">
              <h3 className="text-editorial-cap text-brand-muted mb-6 group-hover:text-brand-gold transition-colors duration-700">Social</h3>
              <div className="flex space-x-16 mt-6">
                <a href="#" className="hover:text-brand-gold transition-colors text-editorial-cap">Instagram</a>
                <a href="#" className="hover:text-brand-gold transition-colors text-editorial-cap">Facebook</a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form className="space-y-24" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="relative group">
                <input type="text" className="w-full bg-transparent border-b border-brand-ink/10 py-5 focus:border-brand-gold outline-none transition-all duration-700 peer" placeholder=" " />
                <label className="absolute left-0 top-5 text-editorial-cap text-brand-muted pointer-events-none transition-all duration-700 peer-focus:-top-6 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-6">Name</label>
              </div>
              <div className="relative group">
                <input type="email" className="w-full bg-transparent border-b border-brand-ink/10 py-5 focus:border-brand-gold outline-none transition-all duration-700 peer" placeholder=" " />
                <label className="absolute left-0 top-5 text-editorial-cap text-brand-muted pointer-events-none transition-all duration-700 peer-focus:-top-6 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-6">Email</label>
              </div>
            </div>
            <div className="relative group">
              <select className="w-full bg-transparent border-b border-brand-ink/10 py-5 focus:border-brand-gold outline-none transition-all duration-700 appearance-none cursor-pointer text-editorial-cap">
                <option>Everyday Romance</option>
                <option>Lifestyle Session</option>
                <option>Anniversary Celebration</option>
                <option>Intimate Love Story</option>
              </select>
              <label className="absolute left-0 -top-6 text-editorial-cap text-brand-gold">Session Type</label>
            </div>
            <div className="relative group">
              <textarea rows={4} className="w-full bg-transparent border-b border-brand-ink/10 py-5 focus:border-brand-gold outline-none transition-all duration-700 peer resize-none" placeholder=" " />
              <label className="absolute left-0 top-5 text-editorial-cap text-brand-muted pointer-events-none transition-all duration-700 peer-focus:-top-6 peer-focus:text-brand-gold peer-[:not(:placeholder-shown)]:-top-6">Tell us your story</label>
            </div>
            <button className="group relative px-16 py-6 overflow-hidden border border-brand-ink/10 hover:border-brand-ink transition-all duration-1000">
              <span className="relative z-10 text-editorial-cap">Send Inquiry</span>
              <div className="absolute inset-0 bg-brand-ink translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <span className="text-editorial-cap text-white">Send Inquiry</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
