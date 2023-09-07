import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex flex-col m-4">
      <h1 className="text-4xl font-bold text-black ml-4">
        Sell Online on Weirdo
      </h1>
      <div className="grid grid-cols-2  space-x-4 mt-5">
        <div className="col-span-1 col-start-1 flex flex-col p-4 ">
          <ul className="space-y-3 p-4 border bg-white shadow-md">
            <li>
              <Link className="text-gray-500">Create Account</Link>
            </li>
            <li>
              <Link className="text-gray-500">List Products</Link>
            </li>
            <li>
              <Link className="text-gray-500">Storage and Shipping</Link>
            </li>
            <li>
              <Link className="text-gray-500">Receive Payment</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 col-start-2 flex flex-col border bg-white shadow-md space-y-2 p-2">
          <h1 className="text-md font-bold ">Create Account</h1>
          <p>
            Creating your seller account is a quick process, taking less than 10
            minutes, and requires only 3 documents. Follow the checklist to
            ensure a seamless account creation experience. By having these
            documents ready, you can streamline the account creation process and
            get started on Flipkart as an online seller in no time.
          </p>
          <hr />
          <h1 className="text-md font-bold ">List Products</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            totam architecto magnam rem facilis natus.
          </p>
          <hr />
          <h1 className="text-md font-bold ">Storage and Shipping</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            totam architecto magnam rem facilis natus.
          </p>
          <hr />
          <h1 className="text-md font-bold ">Receive Payments</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            totam architecto magnam rem facilis natus.
          </p>
        </div>
      </div>
    </div>
  );
}
