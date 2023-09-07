import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} Your E-commerce Store</p>
            <p>All rights reserved.</p>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
