function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-50"></div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              New Arrivals
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-dark leading-[1.1] tracking-tight">
              Upgrade Your <br />
              <span className="text-primary">Digital Life.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-md font-medium">
              Authorized retailer for Apple, Samsung, and more. Get the latest
              tech with official manufacturer warranty.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
                View Offers
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-8 py-3.5 rounded-lg font-bold text-base transition-all hover:bg-slate-50 flex items-center gap-2">
                <span className="material-symbols-outlined text-whatsapp">
                  chat
                </span>
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] lg:h-[500px] w-full bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBn5q97ACx60uVqO_O4xXlBJxhno1nKQAubCv_3XKXTmQaObRX-DPcCInBSwYwULkVsJhRkgRPZ0asHfA_tNLzUMgmbWStLV_H-TzJY_WudRhbEPgMMf6c6Pk92ZEwcgT2cqRiMJejvHe3wgxhVjlJJ8VrNpbPv43gYmaUbZp-FwS5GVLTPim8LTuZBxSUB8LuMXaW8Gw6-4dmhkwlX1u26PGyIqrUd1RPf4QQheNZT2Wzvc-9B-x5Gl82yFYFkd8L-CW9nSR2UMXg')",
              }}
            ></div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-8">
              <p className="text-white font-bold text-xl">iPhone 15 Pro Max</p>
              <p className="text-slate-200 text-sm">
                Titanium. So strong. So light.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
