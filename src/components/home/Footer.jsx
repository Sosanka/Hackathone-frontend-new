export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 font-bold">
                S
              </div>

              <span className="text-xl font-bold">Sewa Foundation</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Connecting buyers and local sellers through a simple community
              marketplace.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Marketplace</h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <a href="#products" className="block hover:text-white">
                Products
              </a>

              <a href="#about" className="block hover:text-white">
                About
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Account</h3>

            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <a href="/buyer/login" className="block hover:text-white">
                Buyer Login
              </a>

              <a href="/buyer/register" className="block hover:text-white">
                Create Account
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Sewa Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
