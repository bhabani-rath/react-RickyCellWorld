import { useState } from "react";

// Footer links data
const footerLinks = {
  corporate: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "e-Waste", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Blogs", href: "#" },
    { name: "Order Status", href: "#" },
  ],
  customerService: [
    { name: "Help Center", href: "#" },
    { name: "My Account", href: "#" },
    { name: "Pricing and Payments", href: "#" },
    { name: "Track Your Order", href: "#" },
  ],
  policies: [
    { name: "Store Locator", href: "#" },
    { name: "Brand Stores", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Caution Notice", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
  categories: [
    { name: "Mobile Phones", href: "#" },
    { name: "Television", href: "#" },
    { name: "Laptops", href: "#" },
    { name: "Air Conditioners", href: "#" },
    { name: "Refrigerators", href: "#" },
    { name: "Washing Machines", href: "#" },
  ],
  services: [
    { name: "Extended Warranty", href: "#" },
    { name: "Warranty Claim", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "EMI Options", href: "#" },
  ],
};

// Social media links
const socialLinks = [
  { name: "WhatsApp", icon: "chat", href: "#", color: "hover:bg-green-600" },
  { name: "Facebook", icon: "public", href: "#", color: "hover:bg-blue-600" },
  { name: "Instagram", icon: "photo_camera", href: "#", color: "hover:bg-pink-600" },
  { name: "YouTube", icon: "play_circle", href: "#", color: "hover:bg-red-600" },
  { name: "LinkedIn", icon: "work", href: "#", color: "hover:bg-blue-700" },
];

// Trust badges for footer
const trustBadges = [
  { icon: "verified_user", text: "VS+ Extended Warranty" },
  { icon: "local_shipping", text: "Free Delivery" },
  { icon: "handshake", text: "Trusted Tech" },
  { icon: "payments", text: "Easy Installment" },
];

// Payment methods
const paymentMethods = [
  "Visa", "Mastercard", "Rupay", "UPI", "Paytm", "PhonePe", "GPay"
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-slate-800 py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-bold mb-1">Stay in touch with us</h3>
              <p className="text-slate-400 text-sm">Get product updates, offers, discounts directly to your inbox</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
              >
                {subscribed ? "✓ Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">{badge.icon}</span>
                </div>
                <span className="text-sm font-semibold text-slate-300">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Ricky Cell World" className="h-10" />
                <span className="text-lg font-extrabold">Ricky Cell World</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Your trusted destination for premium electronics with official warranty.
              </p>
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className={`w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center transition-colors ${social.color}`}
                  >
                    <span className="material-symbols-outlined text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Corporate */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">Corporate</h4>
              <ul className="space-y-2">
                {footerLinks.corporate.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">Customer Service</h4>
              <ul className="space-y-2">
                {footerLinks.customerService.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">Policies & Stores</h4>
              <ul className="space-y-2">
                {footerLinks.policies.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">Categories</h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © 2013-2026, Ricky Cell World. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-sm">We Accept:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-2 py-1 bg-white/10 rounded text-xs font-medium text-slate-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
