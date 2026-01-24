import WhatsAppButton from "../../components/ui/WhatsAppButton";

function Categories() {
  return (
    <section id="categories" className="py-16 bg-background-light">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
            <p className="text-slate-500 mt-2">
              Browse our wide selection of electronics
            </p>
          </div>
          <a
            href="#"
            className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
          >
            View All Categories
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Large Item: Mobiles */}
          <div className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[300px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTgg8OkiFGwQBIrNBzUP-ZzLye7ZfViM9aOOOViOcGw073thlRIyIVV0hntsabeC5zFf76bR2PgNv9AYSILsn7QtpZ_zGRITiWBFIluVe6ozullGqkOfI6eK1vlqTB0oMDtLIphIvyo4GJT2DCK409wDAxtjk2ldPwVw9TjzZqiPzbTKRbx1HNm7y0a3zByHOMKRPbHqPRlITHoCNQe8yPx5DD1Mr3RXXhpDmP7Lqq_vZ7eMQMPkICJ9UZh-92szNEtZt3RwSgbcI')",
              }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-white text-2xl font-bold mb-1">
                Mobile Phones
              </h3>
              <p className="text-slate-200 text-sm mb-4">
                Latest iOS & Android flagships
              </p>
              <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-slate-900 transition-colors">
                Explore
              </button>
            </div>
          </div>

          {/* Wide Item: Laptops */}
          <div className="md:col-span-2 group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[200px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdEm_dmjgE4I4Ubdpk_Z8GfPTfWRMXxA8l4nKxoUBPMtg_oEE-RqHd1xhrYpj_Qqyv9CvBTfgN7TsJ33jrmyiLnhsUtwLQZ9dbx7yD41BbgVKwwsnfjN8uj0Jc6wCpiOrl9N5jBFJHoe2WAdMWd1Hw3WUabPsp801cyMKQMRxj_QzlnGQHzR0VrZYhPOzVOEMu7TATjg_vv8yEFHuxS1AQTGtlCmntB8Z7H--nm9fKUfQqiBhMCNt7Mil3OWUscVtBdwYu0JgtTUw')",
              }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-xl font-bold mb-1">
                Laptops & Computers
              </h3>
              <button className="text-white text-sm font-bold underline decoration-primary decoration-2 underline-offset-4 hover:text-primary-200">
                Shop Now
              </button>
            </div>
          </div>

          {/* Small Item: Audio */}
          <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[200px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCxjwO07-VXoL74lUaurniTFeNF-eooYNwin4Rn4176pAdLxKL_E5JUr9_i36u881AMqw2drgGyJhqNougu64JcOV7wLFk1gp4J4pJdcLKsw1nNamVQvOG6-WLdL-mqwXi34aDUxTmjLJjTwOuhUBNssOeTbQKOkj31XNaoJrDQESkp9xUbMI7n0jQqpdiAa8C4R60-0U6W4zmw3uaCE_A_o3mprAA7hcqMhH8gbuunP9S-WavnEzDwCWDdHxv5FVp5DMejsKiBg3I')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-white text-4xl mb-2">
                headphones
              </span>
              <h3 className="text-white text-lg font-bold">Audio</h3>
            </div>
          </div>

          {/* Small Item: Watches */}
          <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 min-h-[200px]">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUOoZvx0TcBennX_36t7VJuYY1Fkd0trCmlxsoceXU6bQGer632ZazMTCEZMKnpvkDiREMhQ5CxqU3m7G8R7w7XzStcWvSmhMFqR3W0Dfcivq19CKhVSl8b27vfQ7CuAJoOemX4w6ad4C4cCA1N3cQN9SpeoMGpa10NM8xv-h96lNHoCj7Ig1NkaEPst7U6vFjBKPKYHcyFmbXZlKL3hRaF7XCh90TxmdqFGxxVxctkTe8SHFSsFitnUT4KFMPbPkgkVempb3lkZU')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <span className="material-symbols-outlined text-white text-4xl mb-2">
                watch
              </span>
              <h3 className="text-white text-lg font-bold">Wearables</h3>
            </div>
          </div>
        </div>

        <WhatsAppButton />
      </div>
    </section>
  );
}

export default Categories;
