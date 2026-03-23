'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { 
  Wind, 
  Snowflake, 
  Wrench, 
  RefreshCw, 
  Settings, 
  Shield,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Droplets,
  Thermometer,
  ArrowRight,
  Sparkles,
  Award,
  Target,
  ThumbsUp,
  Mail
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

// Section wrapper with scroll animation
function AnimatedSection({ 
  children, 
  className = '', 
  id = '' 
}: { 
  children: React.ReactNode
  className?: string
  id?: string 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Glow orb component
function GlowOrb({ 
  className, 
  color = 'cyan' 
}: { 
  className?: string
  color?: 'cyan' | 'purple' | 'blue' | 'pink' 
}) {
  const colors = {
    cyan: 'from-cyan-500/30 via-cyan-400/10 to-transparent',
    purple: 'from-purple-500/30 via-purple-400/10 to-transparent',
    blue: 'from-blue-500/30 via-blue-400/10 to-transparent',
    pink: 'from-pink-500/30 via-pink-400/10 to-transparent'
  }
  
  return (
    <div 
      className={`absolute rounded-full blur-3xl pointer-events-none bg-gradient-radial ${colors[color]} ${className}`}
    />
  )
}

// Navbar
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#layanan', label: 'Layanan' },
    { href: '#keunggulan', label: 'Keunggulan' },
    { href: '#area', label: 'Area' },
    { href: '#testimoni', label: 'Testimoni' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center glow-cyan transition-all duration-300 group-hover:scale-110">
              <Snowflake className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ORBIT TEKNIK</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#booking"
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm overflow-hidden group glow-cyan hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Booking Sekarang</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
              >
                Booking Sekarang
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const badges = [
    { icon: Zap, text: "Respon Cepat" },
    { icon: Users, text: "Teknisi Berpengalaman" },
    { icon: Shield, text: "Bergaransi" },
    { icon: MapPin, text: "Area Surabaya & Sekitarnya" },
  ]

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0a14] to-[#06060a]" />
      <GlowOrb className="w-[600px] h-[600px] -top-48 -left-48" color="cyan" />
      <GlowOrb className="w-[500px] h-[500px] top-1/3 -right-32" color="purple" />
      <GlowOrb className="w-[400px] h-[400px] bottom-0 left-1/4" color="blue" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Layanan AC Profesional di Surabaya</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Service AC </span>
              <span className="gradient-text">Modern</span>
              <br />
              <span className="text-white">dengan Hasil</span>
              <br />
              <span className="gradient-text">yang Terasa.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Cuci AC, isi freon, perbaikan, bongkar pasang, dan maintenance rutin. 
              Dikerjakan oleh teknisi berpengalaman dengan alat modern dan garansi layanan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="#booking"
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg overflow-hidden glow-cyan hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Booking Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#layanan"
                className="px-8 py-4 rounded-full border border-cyan-500/30 text-cyan-400 font-semibold text-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300"
              >
                Lihat Layanan
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-gray-300 hover:border-cyan-500/30 transition-colors duration-300"
                >
                  <badge.icon className="w-4 h-4 text-cyan-400" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual - AC Unit Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Frame */}
              <div className="relative rounded-3xl glass-card p-8 overflow-hidden">
                {/* Gradient Border Animation */}
                <div className="absolute inset-0 rounded-3xl">
                  <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50 blur-sm animate-pulse" />
                </div>

                {/* AC Unit Illustration */}
                <div className="relative z-10 bg-gradient-to-b from-[#0d0d14] to-[#1a1a2e] rounded-2xl p-8">
                  {/* AC Indoor Unit */}
                  <div className="relative mb-6">
                    <div className="w-64 h-32 mx-auto bg-gradient-to-b from-gray-700 to-gray-800 rounded-2xl shadow-2xl relative overflow-hidden">
                      {/* AC Vents */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-gray-600 to-gray-700">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute bottom-2 h-1 bg-gray-800 rounded"
                            style={{ left: `${i * 8 + 4}%`, width: '6%' }}
                          />
                        ))}
                      </div>
                      {/* Brand Logo */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Snowflake className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                      {/* Status LED */}
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                      {/* Temperature Display */}
                      <div className="absolute top-3 left-3 text-xs text-cyan-400 font-mono">
                        24°C
                      </div>
                    </div>

                    {/* Airflow Lines */}
                    <motion.div
                      animate={{ y: [0, 10, 0], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 w-0.5 bg-gradient-to-b from-cyan-400 to-transparent mb-1"
                          style={{ 
                            marginLeft: i === 2 ? 0 : i < 2 ? `${(2 - i) * 20}px` : `${(i - 2) * 20}px`,
                            opacity: 0.5 - Math.abs(i - 2) * 0.15
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-[#0d0d14]">
                      <div className="text-2xl font-bold text-cyan-400">-5°C</div>
                      <div className="text-xs text-gray-500">Turun Cepat</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d0d14]">
                      <div className="text-2xl font-bold text-purple-400">99%</div>
                      <div className="text-xs text-gray-500">Kepuasan</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[#0d0d14]">
                      <div className="text-2xl font-bold text-blue-400">24/7</div>
                      <div className="text-xs text-gray-500">Support</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-purple-500/10 blur-xl" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-8 glass-card rounded-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Status</div>
                    <div className="text-sm font-semibold text-white">Sehat & Bersih</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-8 glass-card rounded-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Suhu Optimal</div>
                    <div className="text-sm font-semibold text-white">18-24°C</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-sm">Scroll untuk eksplorasi</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const services = [
    {
      icon: Droplets,
      title: "Cuci AC",
      description: "Pembersihan indoor dan outdoor unit secara menyeluruh untuk performa optimal dan udara bersih.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: Wrench,
      title: "Perbaikan AC",
      description: "Diagnosa dan perbaikan semua jenis kerusakan AC dengan spare part berkualitas.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Wind,
      title: "Isi Freon",
      description: "Pengisian freon berbagai tipe (R32, R410A, R22) dengan standar keamanan tinggi.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: RefreshCw,
      title: "Bongkar Pasang",
      description: "Layanan bongkar pasang AC untuk pindahan atau relokasi unit dengan aman.",
      gradient: "from-green-400 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Instalasi Baru",
      description: "Pemasangan AC baru dengan perhitungan PK yang tepat untuk ruangan Anda.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: Shield,
      title: "Maintenance Rutin",
      description: "Program perawatan berkala untuk menjaga AC selalu dalam kondisi prima.",
      gradient: "from-pink-400 to-purple-500"
    }
  ]

  return (
    <AnimatedSection id="layanan" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0a14] to-[#06060a]" />
      <GlowOrb className="w-[400px] h-[400px] top-1/4 -left-32" color="blue" />
      <GlowOrb className="w-[300px] h-[300px] bottom-1/4 -right-24" color="purple" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Snowflake className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Layanan Lengkap</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Solusi </span>
            <span className="gradient-text">AC Lengkap</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Dari pembersihan rutin hingga instalasi baru, kami siap menangani semua kebutuhan AC Anda dengan profesional.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl glass-card p-6 overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:scale-[1.02]">
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${service.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Visual Showcase Section
function ShowcaseSection() {
  return (
    <AnimatedSection className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0d0d18] to-[#06060a]" />
      <GlowOrb className="w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2" color="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Hasil Nyata</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Kualitas </span>
            <span className="gradient-text">Terlihat Jelas</span>
          </motion.h2>
        </div>

        {/* Showcase Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Indoor Unit */}
          <motion.div variants={scaleIn} className="lg:col-span-2">
            <div className="relative rounded-2xl glass-card overflow-hidden group h-64 sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center glow-cyan">
                    <Wind className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Indoor Unit</h3>
                  <p className="text-gray-400 text-sm">Pembersihan menyeluruh evaporator & filter</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Outdoor Unit */}
          <motion.div variants={scaleIn} className="lg:col-span-2">
            <div className="relative rounded-2xl glass-card overflow-hidden group h-64 sm:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center glow-purple">
                    <RefreshCw className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Outdoor Unit</h3>
                  <p className="text-gray-400 text-sm">Perawatan kondensor & pengecekan tekanan</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Airflow */}
          <motion.div variants={scaleIn}>
            <div className="relative rounded-2xl glass-card overflow-hidden group h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <Snowflake className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Airflow Optimal</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Before After */}
          <motion.div variants={scaleIn}>
            <div className="relative rounded-2xl glass-card overflow-hidden group h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-cyan-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Bersih Menyala</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Temperature */}
          <motion.div variants={scaleIn} className="lg:col-span-2">
            <div className="relative rounded-2xl glass-card overflow-hidden group h-48">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <Thermometer className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">30°C</p>
                    <p className="text-xs text-gray-400">Sebelum</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-500" />
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Snowflake className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-cyan-400">18°C</p>
                    <p className="text-xs text-gray-400">Sesudah</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Why Us Section
function WhyUsSection() {
  const features = [
    {
      icon: CheckCircle,
      title: "Pengerjaan Rapi",
      description: "Setiap pekerjaan dikerjakan dengan teliti dan rapi, menjaga kebersihan tempat Anda."
    },
    {
      icon: Target,
      title: "Harga Transparan",
      description: "Harga jelas di awal tanpa biaya tersembunyi. Anda tahu persis apa yang dibayar."
    },
    {
      icon: ThumbsUp,
      title: "Diagnosa Jujur",
      description: "Kami hanya menyarankan perbaikan yang benar-benar diperlukan untuk AC Anda."
    },
    {
      icon: Clock,
      title: "Cepat Datang",
      description: "Respons cepat dan tepat waktu. Teknisi tiba sesuai jadwal yang disepakati."
    },
    {
      icon: Settings,
      title: "Alat Lengkap",
      description: "Peralatan modern dan lengkap untuk diagnosa akurat dan perbaikan efisien."
    },
    {
      icon: Shield,
      title: "Bergaransi",
      description: "Garansi layanan untuk ketenangan pikiran Anda. Kualitas adalah prioritas kami."
    }
  ]

  return (
    <AnimatedSection id="keunggulan" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0a14] to-[#06060a]" />
      <GlowOrb className="w-[400px] h-[400px] top-1/3 -right-32" color="purple" />
      <GlowOrb className="w-[300px] h-[300px] bottom-1/4 -left-24" color="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Kenapa Pilih Kami</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Keunggulan </span>
            <span className="gradient-text">Kami</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Kami berkomitmen memberikan layanan terbaik dengan standar profesional tinggi.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl glass-card p-6 transition-all duration-300 hover:border-cyan-500/30">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Process Section
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Hubungi Kami",
      description: "Hubungi via WhatsApp atau telepon untuk konsultasi awal.",
      icon: Phone
    },
    {
      number: "02",
      title: "Ceritakan Kendala",
      description: "Jelaskan masalah AC Anda untuk diagnosa awal.",
      icon: MessageCircle
    },
    {
      number: "03",
      title: "Teknisi Datang",
      description: "Tim kami tiba tepat waktu dengan alat lengkap.",
      icon: Users
    },
    {
      number: "04",
      title: "Masalah Beres",
      description: "AC Anda kembali dingin dan berfungsi optimal.",
      icon: CheckCircle
    }
  ]

  return (
    <AnimatedSection className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0d0d18] to-[#06060a]" />
      <GlowOrb className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="blue" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Proses Mudah</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Cara </span>
            <span className="gradient-text">Kami Bekerja</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
              )}
              
              <div className="relative rounded-2xl glass-card p-6 text-center h-full transition-all duration-300 hover:border-cyan-500/30 hover:scale-105">
                {/* Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-sm font-bold text-white">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mt-4 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Coverage Section
function CoverageSection() {
  const areas = [
    { name: "Surabaya", status: "Aktif" },
    { name: "Sidoarjo", status: "Aktif" },
    { name: "Gresik", status: "Aktif" },
    { name: "Bangkalan", status: "Aktif" },
    { name: "Mojokerto", status: "Aktif" },
    { name: "Lamongan", status: "Terbatas" },
  ]

  return (
    <AnimatedSection id="area" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0a14] to-[#06060a]" />
      <GlowOrb className="w-[400px] h-[400px] top-0 right-0" color="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Area Layanan</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Jangkauan </span>
            <span className="gradient-text">Layanan</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Melayani area Surabaya dan sekitarnya dengan respons cepat.
          </motion.p>
        </div>

        {/* Areas Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4"
        >
          {areas.map((area, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="group"
            >
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl glass-card transition-all duration-300 hover:border-cyan-500/30 hover:scale-105 cursor-pointer">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-white">{area.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  area.status === 'Aktif' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {area.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Lokasi Anda tidak ada di daftar?</p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Hubungi kami untuk konfirmasi</span>
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      location: "Surabaya Timur",
      rating: 5,
      text: "Service AC sangat memuaskan! Teknisinya ramah dan profesional. AC saya yang tadinya tidak dingin sekarang sudah normal kembali. Recommended!",
      service: "Perbaikan AC"
    },
    {
      name: "Siti Rahayu",
      location: "Sidoarjo",
      rating: 5,
      text: "Sudah 3 kali pakai jasa AC Pro Tech untuk cuci AC di rumah. Selalu puas dengan hasilnya. Harga juga bersahabat.",
      service: "Cuci AC"
    },
    {
      name: "Ahmad Wijaya",
      location: "Gresik",
      rating: 5,
      text: "Pemasangan AC baru untuk kamar tidur berjalan lancar. Teknisi datang tepat waktu dan kerja rapi. Terima kasih!",
      service: "Instalasi Baru"
    }
  ]

  return (
    <AnimatedSection id="testimoni" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0d0d18] to-[#06060a]" />
      <GlowOrb className="w-[500px] h-[500px] bottom-0 left-1/4" color="purple" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Testimoni Pelanggan</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Apa Kata </span>
            <span className="gradient-text">Mereka</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <div className="relative h-full rounded-2xl glass-card p-6 transition-all duration-300 hover:border-cyan-500/30 hover:scale-[1.02]">
                {/* Quote Mark */}
                <div className="absolute top-4 right-4 text-4xl text-cyan-500/20 font-serif">"</div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.location}</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs">
                    {testimonial.service}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Berapa biaya service AC?",
      answer: "Biaya service AC bervariasi tergantung jenis layanan. Cuci AC mulai dari Rp 75.000, isi freon mulai dari Rp 150.000, dan perbaikan tergantung kerusakan. Kami akan memberikan estimasi harga transparan sebelum pengerjaan."
    },
    {
      question: "Berapa lama waktu pengerjaan?",
      answer: "Waktu pengerjaan tergantung jenis layanan. Cuci AC biasanya 1-2 jam, perbaikan ringan 1-3 jam, dan instalasi baru 2-4 jam. Teknisi kami akan memberikan estimasi waktu yang lebih akurat setelah diagnosa."
    },
    {
      question: "Apakah ada garansi layanan?",
      answer: "Ya, kami memberikan garansi untuk setiap layanan. Garansi cuci AC 7 hari, garansi perbaikan 30 hari, dan garansi instalasi baru hingga 90 hari. Jika ada masalah dalam periode garansi, kami akan memperbaikinya tanpa biaya tambahan."
    },
    {
      question: "Merek AC apa saja yang ditangani?",
      answer: "Kami menangani semua merek AC populer seperti Daikin, LG, Panasonic, Samsung, Sharp, Midea, Gree, dan lainnya. Teknisi kami berpengalaman dengan berbagai tipe AC termasuk split, cassette, standing floor, dan inverter."
    },
    {
      question: "Apakah bisa booking di akhir pekan?",
      answer: "Ya, kami melayani dari Senin hingga Minggu, termasuk hari libur nasional. Jam operasional kami mulai pukul 08.00 - 20.00 WIB. Untuk layanan darurat, kami juga tersedia di luar jam operasional dengan biaya tambahan."
    },
    {
      question: "Bagaimana cara membayar?",
      answer: "Kami menerima berbagai metode pembayaran: tunai, transfer bank (BCA, Mandiri, BRI, BNI), dan e-wallet (GoPay, OVO, Dana, ShopeePay). Pembayaran dilakukan setelah layanan selesai dan Anda puas dengan hasilnya."
    }
  ]

  return (
    <AnimatedSection id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0a0a14] to-[#06060a]" />
      <GlowOrb className="w-[400px] h-[400px] top-1/4 right-0" color="cyan" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Pertanyaan Umum</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-white">Pertanyaan </span>
            <span className="gradient-text">FAQ</span>
          </motion.h2>
        </div>

        {/* FAQ Items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <div className="rounded-xl glass-card overflow-hidden transition-all duration-300">
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Final CTA Section
function CTASection() {
  return (
    <AnimatedSection id="booking" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] via-[#0d0d18] to-[#06060a]" />
      <GlowOrb className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="cyan" />
      <GlowOrb className="w-[400px] h-[400px] top-0 right-0" color="purple" />
      <GlowOrb className="w-[400px] h-[400px] bottom-0 left-0" color="blue" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Snowflake className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Siap Melayani Anda</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-white">AC Anda </span>
            <span className="gradient-text">Butuh Perhatian?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Jangan biarkan AC rusak mengganggu kenyamanan Anda. Hubungi kami sekarang dan nikmati udara segar kembali!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20booking%20service%20AC"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-lg overflow-hidden hover:scale-105 transition-all duration-300"
              style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </span>
            </a>
            <a
              href="tel:+6281234567890"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg overflow-hidden glow-cyan hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Booking Sekarang
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Respons Cepat</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Bergaransi</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Profesional</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

// Footer
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-gray-800/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06060a] to-[#0a0a14]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AC Pro Tech</span>
            </a>
            <p className="text-gray-400 mb-4 max-w-sm">
              Layanan service AC profesional di Surabaya dan sekitarnya. Cuci AC, perbaikan, isi freon, dan instalasi dengan garansi.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-cyan-500/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400" />
              </a>
              <a
                href="mailto:info@acprotech.id"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-cyan-500/30 transition-colors"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
              </a>
              <a
                href="tel:+6281234567890"
                className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-cyan-500/30 transition-colors"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Cuci AC</a></li>
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Perbaikan AC</a></li>
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Isi Freon</a></li>
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Bongkar Pasang</a></li>
              <li><a href="#layanan" className="hover:text-cyan-400 transition-colors">Instalasi Baru</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>0812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
                <span>WhatsApp 24/7</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                <span>Surabaya, Sidoarjo, Gresik & Sekitarnya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} AC Pro Tech. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ShowcaseSection />
      <WhyUsSection />
      <ProcessSection />
      <CoverageSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
