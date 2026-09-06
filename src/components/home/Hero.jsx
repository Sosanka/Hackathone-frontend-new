import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f3faf5]">
      {/* Background decorations */}

      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-200/40 blur-3xl" />

      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* =====================================
            LEFT
        ====================================== */}

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Fresh products. Local sellers.
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Fresh from local
            <span className="text-green-600"> sellers,</span>
            <br />
            straight to you.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Discover fresh agricultural products, connect with local sellers,
            and get the products you need from a trusted community marketplace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="rounded-2xl bg-green-600 px-7 py-3.5 text-center font-bold text-white shadow-xl shadow-green-200 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              Explore Products →
            </a>

            <Link
              to="/buyer/register"
              className="rounded-2xl border border-gray-200 bg-white px-7 py-3.5 text-center font-bold text-gray-800 transition hover:bg-gray-50"
            >
              Become a Buyer
            </Link>
          </div>

          {/* Stats */}

          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <p className="text-2xl font-black text-gray-900">100+</p>

              <p className="text-sm text-gray-500">Products</p>
            </div>

            <div>
              <p className="text-2xl font-black text-gray-900">Local</p>

              <p className="text-sm text-gray-500">Sellers</p>
            </div>

            <div>
              <p className="text-2xl font-black text-gray-900">Fresh</p>

              <p className="text-sm text-gray-500">Products</p>
            </div>
          </div>
        </div>

        {/* =====================================
            RIGHT VISUAL
        ====================================== */}

        <div className="relative">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-4 rounded-[3rem] bg-green-200/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white p-4 shadow-2xl">
              <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-100 to-emerald-50">
                <div className="flex min-h-[380px] items-center justify-center p-8">
                  <div className="text-center">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white text-7xl shadow-xl">
                      🌾
                    </div>

                    <h3 className="mt-7 text-2xl font-black text-gray-900">
                      From Farm
                    </h3>

                    <div className="mx-auto my-3 h-1 w-12 rounded-full bg-green-500" />

                    <h3 className="text-2xl font-black text-green-700">
                      To Community
                    </h3>

                    <p className="mt-4 text-sm text-gray-500">
                      Freshness you can trust.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating card */}

              <div className="absolute bottom-8 left-8 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Fresh & Local
                    </p>

                    <p className="text-xs text-gray-500">
                      Direct seller listings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
