const footerLinks = {
  shop: [
    { name: "Mobile Phones", href: "#" },
    { name: "Laptops & PC", href: "#" },
    { name: "Gaming Consoles", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  support: [
    { name: "Track Repair", href: "#" },
    { name: "Warranty Policy", href: "#" },
    { name: "Store Locations", href: "#" },
    { name: "Contact Us", href: "#" },
  ],
  locations: [
    { name: "Downtown Branch", address: "123 Main St, Tech District" },
    { name: "Westside Mall", address: "456 Plaza Ave, Westside" },
  ],
};

function Footer() {
  return (
    <footer id="contact" className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Ricky Cell World
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your trusted destination for premium electronics. We guarantee
              quality, authenticity, and exceptional after-sales support.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  public
                </span>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Locations */}
          <div id="stores">
            <h4 className="font-bold text-lg mb-6">Store Locations</h4>
            <ul className="space-y-4">
              {footerLinks.locations.map((location, index) => (
                <li key={index} className="flex gap-3">
                  <span className="material-symbols-outlined text-primary pt-1 text-sm">
                    location_on
                  </span>
                  <div>
                    <p className="font-bold text-sm">{location.name}</p>
                    <p className="text-slate-400 text-xs">{location.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 Ricky Cell World. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
