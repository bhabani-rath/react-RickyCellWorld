const features = [
  {
    icon: "verified_user",
    title: "Authorized Dealer",
    description: "100% Original Products",
  },
  {
    icon: "headset_mic",
    title: "Instant Support",
    description: "Direct WhatsApp Line",
  },
  {
    icon: "local_shipping",
    title: "Express Delivery",
    description: "Or Store Pickup",
  },
  {
    icon: "credit_card",
    title: "Secure Payment",
    description: "Multiple Options",
  },
];

function Features() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-3"
            >
              <div className="bg-blue-50 p-2 rounded-full text-primary">
                <span className="material-symbols-outlined">
                  {feature.icon}
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  {feature.title}
                </p>
                <p className="text-slate-500 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
