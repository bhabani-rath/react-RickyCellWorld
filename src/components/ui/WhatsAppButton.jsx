function WhatsAppButton() {
  return (
    <a
      href="#"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-whatsapp hover:bg-green-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 group"
    >
      <span className="font-bold hidden group-hover:block transition-all duration-300">
        Chat with us
      </span>
      <span className="material-symbols-outlined text-3xl">chat</span>
    </a>
  );
}

export default WhatsAppButton;
