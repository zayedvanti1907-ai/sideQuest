import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Share2, 
  Video, 
  PenTool, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Lock,
  Database as DbIcon,
  Calendar,
  User,
  Phone,
  Mail,
  Briefcase,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">SQ</span>
          </div>
          SIDEQUEST
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-red-500 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onAdminClick}
            className="text-white/30 hover:text-white transition-colors p-2"
          >
            <Lock size={18} />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            GET STARTED
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display hover:text-red-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => { setIsOpen(false); onAdminClick(); }}
                className="text-white/50 text-left py-2 flex items-center gap-2"
              >
                <Lock size={16} /> Admin Login
              </button>
              <button 
                onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-red-600 text-white py-3 rounded-lg font-bold mt-2"
              >
                GET STARTED
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ContactForm = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-bold text-red-600 tracking-[0.2em] uppercase mb-4">Contact Us</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              LET'S BUILD YOUR <br />
              <span className="text-red-600 italic">LEGACY.</span>
            </h3>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-lg">
              Ready to scale? Fill out the form and our team will get back to you within 24 hours to discuss your custom strategy.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Email Us</div>
                  <div className="text-lg font-medium">sidequest.smma@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center text-red-600">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Call Us</div>
                  <div className="text-lg font-medium">+91 9606202345</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', businessName: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h4 className="text-2xl font-display font-bold mb-4">Message Received!</h4>
        <p className="text-white/60 mb-8">Our team is already reviewing your request. We'll be in touch shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-red-600 font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name *</label>
          <input 
            required
            type="text"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Business Name</label>
          <input 
            type="text"
            value={formData.businessName}
            onChange={e => setFormData({...formData, businessName: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
            placeholder="Your Company"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address *</label>
          <input 
            required
            type="email"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Phone Number</label>
          <input 
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Your Message</label>
        <textarea 
          rows={4}
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all resize-none"
          placeholder="Tell us about your project..."
        />
      </div>
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <button 
        disabled={status === 'loading'}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
        <ArrowRight size={20} />
      </button>
    </form>
  );
};

const AdminDashboard = ({ onBack }: { onBack: () => void }) => {
  const [passkey, setPasskey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/leads', {
        headers: { 'x-admin-passkey': passkey }
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
        setIsAuthorized(true);
      } else {
        setError('Invalid passkey. Access denied.');
      }
    } catch (err) {
      setError('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                <Lock size={16} className="text-white" />
              </div>
              ADMIN ACCESS
            </div>
            <button onClick={onBack} className="text-white/40 hover:text-white"><X size={24} /></button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Enter Passkey</label>
              <input 
                required
                type="password"
                value={passkey}
                onChange={e => setPasskey(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? 'VERIFYING...' : 'LOGIN TO DASHBOARD'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <DbIcon size={20} />
              </div>
              <h1 className="text-3xl font-display font-bold">LEAD DASHBOARD</h1>
            </div>
            <p className="text-white/50">Manage your incoming business inquiries and growth opportunities.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { setIsAuthorized(false); setPasskey(''); }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold transition-all"
            >
              LOGOUT
            </button>
            <button 
              onClick={onBack}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition-all"
            >
              BACK TO SITE
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {leads.length === 0 ? (
            <div className="bg-zinc-900 border border-white/10 p-20 rounded-3xl text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">No leads yet</h3>
              <p className="text-white/40">When users fill out the contact form, they will appear here.</p>
            </div>
          ) : (
            leads.map((lead) => (
              <motion.div 
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl hover:border-red-600/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-red-500 font-bold">
                        <User size={18} />
                        {lead.name}
                      </div>
                      {lead.business_name && (
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Briefcase size={16} />
                          {lead.business_name}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <Calendar size={16} />
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-white/80 hover:text-red-500 transition-colors">
                        <Mail size={16} className="text-white/30" />
                        {lead.email}
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-3 text-white/80 hover:text-red-500 transition-colors">
                          <Phone size={16} className="text-white/30" />
                          {lead.phone}
                        </a>
                      )}
                    </div>

                    {lead.message && (
                      <div className="bg-black/40 p-4 rounded-xl text-white/60 text-sm leading-relaxed border border-white/5 italic">
                        "{lead.message}"
                      </div>
                    )}
                  </div>
                  
                  <div className="flex md:flex-col justify-end gap-2">
                    <button className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all text-white/40 hover:text-white">
                      <CheckCircle2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-6"
          >
            Digital Marketing Agency
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
            LEVEL UP YOUR <br />
            <span className="text-red-600">DIGITAL GAME.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
            We don't just manage accounts. We build digital legacies. From viral reels to automated workflows, we are your ultimate sidequest for growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all"
            >
              START YOUR QUEST
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all"
            >
              VIEW OUR SERVICES
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
            <img 
              src="https://picsum.photos/seed/strategy/800/800" 
              alt="Digital Marketing" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-red-600 p-4 rounded-xl shadow-xl z-20"
          >
            <Zap className="text-white" size={32} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl z-20"
          >
            <Share2 className="text-black" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Digital Posts",
      description: "Eye-catching graphics designed to stop the scroll and drive engagement.",
      icon: <PenTool className="text-red-600" size={32} />,
      delay: 0.1
    },
    {
      title: "Social Media Management",
      description: "Full-service strategy, scheduling, and community management across all platforms.",
      icon: <Share2 className="text-red-600" size={32} />,
      delay: 0.2
    },
    {
      title: "WhatsApp Automation",
      description: "Scale your communication with smart bots and automated customer journeys.",
      icon: <MessageSquare className="text-red-600" size={32} />,
      delay: 0.3
    },
    {
      title: "Reels Making",
      description: "High-energy, viral-ready short-form video content that captures attention.",
      icon: <Video className="text-red-600" size={32} />,
      delay: 0.4
    },
    {
      title: "Content Creation",
      description: "Strategic storytelling that converts followers into loyal brand advocates.",
      icon: <Zap className="text-red-600" size={32} />,
      delay: 0.5
    }
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-red-600 tracking-[0.2em] uppercase mb-4">Our Services</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">WE PROVIDE THE TOOLS FOR YOUR <span className="text-red-600 italic">DOMINATION.</span></h3>
          </div>
          <p className="text-white/50 max-w-sm">
            Tailored digital solutions designed to accelerate your brand's growth in the modern landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.delay }}
              className="group p-8 bg-black border border-white/5 rounded-2xl hover:border-red-600/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl group-hover:bg-red-600/10 transition-all" />
              <div className="mb-6">{service.icon}</div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors">{service.title}</h4>
              <p className="text-white/60 leading-relaxed mb-6">
                {service.description}
              </p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 group-hover:gap-4 transition-all"
              >
                CONTACT NOW <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-red-600 rounded-2xl flex flex-col justify-center items-center text-center text-white"
          >
            <h4 className="text-2xl font-bold mb-4">Ready to start?</h4>
            <p className="mb-8 opacity-90">Let's discuss your project and build something amazing together.</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all"
            >
              CONTACT NOW
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="text-3xl font-display font-bold tracking-tighter mb-6">
              SIDE<span className="text-red-600">QUEST</span>
            </div>
            <p className="text-white/50 max-w-sm mb-8">
              The digital marketing partner you've been waiting for. We turn brands into legends through strategic content and automation.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sidequest_smma/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h5>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Contact</h5>
            <ul className="space-y-4 text-white/50 text-sm">
              <li>sidequest.smma@gmail.com</li>
              <li>+91 9606202345</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-widest">
          <p>© 2024 Sidequest Digital Marketing. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<'site' | 'admin'>('site');

  if (view === 'admin') {
    return <AdminDashboard onBack={() => setView('site')} />;
  }

  return (
    <div className="min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar onAdminClick={() => setView('admin')} />
      <main>
        <Hero />
        <Services />
        
        {/* About/Philosophy Section */}
        <section id="about" className="py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src="https://picsum.photos/seed/agency/1200/800" 
                  alt="Our Agency" 
                  className="w-full h-full object-cover opacity-40 grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-red-600 tracking-[0.2em] uppercase mb-4">Our Philosophy</h2>
              <h3 className="text-4xl font-display font-bold mb-8">WE DON'T FOLLOW TRENDS. <br />WE <span className="text-red-600">SET</span> THEM.</h3>
              <p className="text-white/60 leading-relaxed mb-8">
                In a world of noise, we provide the signal. Sidequest was born from the idea that every brand has a unique story that deserves to be told with impact. We combine data-driven strategy with creative excellence to ensure your brand doesn't just survive—it thrives.
              </p>
              <ul className="space-y-4">
                {['Data-Driven Strategies', 'Creative Excellence', '24/7 Support', 'Fast Turnaround'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ContactForm onOpenForm={() => {}} />
      </main>
      <Footer />
    </div>
  );
}
