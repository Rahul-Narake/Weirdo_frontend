import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Our Ecommerce Store
          </h1>
          <p className="text-lg mb-8">
            Discover the best products at amazing prices.
          </p>
          <Link
            to={'/user/login'}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-gray-100 py-16 px-3">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center font-semibold mb-8">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Cards */}
            {/* Replace this with your actual product cards */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex justify-center items-center">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.VGzsuwfhkQJvry3ExaNbrQHaJ4&pid=Api&P=0&h=180"
                  alt="Product"
                  className="w-50 h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  LEVI'S® MEN'S 511™ SLIM FIT JEANS
                </h3>
                <p className="text-gray-600">
                  A modern slim with room to move, the 511™ slim fit jeans have
                  added stretch for all-day comfort. They offer a lean look and
                  is a great alternative to skinny jeans.
                </p>
                <div className="mt-4">
                  <span className="text-gray-800 font-semibold">$400</span>
                  <Link
                    to={'/user/login'}
                    className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex justify-center items-center">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.-NXHz1r1XuWX7gCsPnhWUgHaHa&pid=Api&P=0&h=180"
                  alt="Product"
                  className="w-50 h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Polo Tshirt</h3>
                <p className="text-gray-600">
                  Combining a sports sensibility and considered casual
                  credentials, polo shirts for men provide variety. Whether
                  plain or printed, striped, white or black, men’s polos make
                  for reliable smart-casual options.
                </p>
                <div className="mt-4">
                  <span className="text-gray-800 font-semibold">$150</span>
                  <Link
                    to={'/user/login'}
                    className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex justify-center items-center">
                <img
                  src="https://tse1.mm.bing.net/th?id=OIP.rC8wbOP2g0ODHSSz7nx9qQHaI7&pid=Api&P=0&h=180"
                  alt="Product"
                  className="w-50 h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Puma</h3>
                <p className="text-gray-600">
                  Hoodie made of cotton with a napped interior. Adjustable hood
                  and long sleeves. Front pouch pocket and ribbed trims.
                </p>
                <div className="mt-4">
                  <span className="text-gray-800 font-semibold">$399</span>
                  <Link
                    to={'/user/login'}
                    className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>

            {/* Repeat the product card structure for other products */}
          </div>
        </div>
      </section>
    </div>
  );
}
