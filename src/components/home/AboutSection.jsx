export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-green-600">
              Why Sewa?
            </span>

            <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
              Connecting communities through local products.
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Sewa Foundation brings buyers and sellers together through a
              simple marketplace designed to make local products easier to
              discover.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  🌱
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Local products</h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Discover products listed by local sellers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  🤝
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Direct connection</h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Build a direct connection between buyers and sellers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Simple marketplace
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Find what you need without unnecessary complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-green-50 p-8">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-green-50 p-6">
                  <p className="text-3xl font-black text-green-600">🌾</p>

                  <p className="mt-4 font-bold text-gray-900">Fresh</p>

                  <p className="mt-1 text-sm text-gray-500">Local listings</p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-6">
                  <p className="text-3xl font-black text-blue-600">🤝</p>

                  <p className="mt-4 font-bold text-gray-900">Community</p>

                  <p className="mt-1 text-sm text-gray-500">Built together</p>
                </div>

                <div className="col-span-2 rounded-2xl bg-gray-900 p-6 text-white">
                  <p className="text-lg font-bold">Better connections.</p>

                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    A marketplace focused on connecting people with useful local
                    products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
