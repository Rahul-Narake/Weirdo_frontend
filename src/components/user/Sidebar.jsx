import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/user/CategorySlice';
import { getProductsByFilter } from '../../store/user/ProductSlice';
export default function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [category, setCategory] = useState('');

  const onColorChange = (e) => {
    const color = e.target.value;
    if (!colors.includes(color)) {
      colors.push(color);
    } else {
      const newColors = colors.filter((cl) => {
        if (cl !== color) {
          return cl;
        }
      });
      setColors(newColors);
    }
  };

  const onSizeChange = (e) => {
    const size = e.target.value;
    if (!sizes.includes(size)) {
      sizes.push(size);
    } else {
      const newSizes = sizes.filter((sz) => {
        if (sz !== size) {
          return sz;
        }
      });
      setSizes(newSizes);
    }
  };

  const onPriceChange = (e) => {
    const price = e.target.value;
    if (!prices.includes(price)) {
      prices.push(price);
    } else {
      const newPrices = prices.filter((prs) => {
        if (prs !== price) {
          return prs;
        }
      });
      setPrices(newPrices);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductsByFilter({ category, colors, sizes, prices }));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="flex flex-col bg-white border shadow-md md:justify-start md:items-start sm:justify-center sm:items-start md:pl-3 md:py-4 overflow-hidden">
      <h1 className="text-1.8xl font-bold text-black">FILTERS</h1>
      <hr />
      <form onSubmit={onSubmit} className="my-4 pl-4 space-y-4">
        {/* categories */}
        <p className=" font-semibold text-sm text-black mb-2">Category</p>
        <ul className="space-y-4">
          {categories &&
            categories.map((category) => {
              return (
                <li
                  key={category._id}
                  className="flex justify-start items-start space-x-3"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category._id}
                    className="mt-2"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                  <h2>{category.title}</h2>
                </li>
              );
            })}
        </ul>

        {/* colors */}
        <p className="font-semibold text-sm text-black mb-2">Color</p>
        <ul className="space-y-4">
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="black"
              name="black"
              value={'black'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Black</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="white"
              name="white"
              value={'white'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>White</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="blue"
              name="blue"
              value={'blue'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Blue</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="yellow"
              name="yellow"
              value={'yellow'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Yellow</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="gray"
              name="gray"
              value={'gray'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Gray</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="red"
              name="red"
              value={'red'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Red</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="green"
              name="green"
              value={'green'}
              onChange={onColorChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Green</h2>
          </li>
        </ul>

        {/* size */}
        <p className="font-semibold text-sm text-black mb-2">Size</p>
        <ul className="space-y-4">
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="L"
              name="L"
              value={'L'}
              onChange={onSizeChange}
              className="w-4 h-4 mt-1"
            />
            <h2>L</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="M"
              name="M"
              value={'M'}
              onChange={onSizeChange}
              className="w-4 h-4 mt-1"
            />
            <h2>M</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="S"
              name="S"
              value={'S'}
              onChange={onSizeChange}
              className="w-4 h-4 mt-1"
            />
            <h2>S</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="XL"
              name="XL"
              value={'XL'}
              onChange={onSizeChange}
              className="w-4 h-4 mt-1"
            />
            <h2>XL</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="XXL"
              name="XXL"
              value={'XXL'}
              onChange={onSizeChange}
              className="w-4 h-4 mt-1"
            />
            <h2>XXL</h2>
          </li>
        </ul>

        {/* price */}
        <p className="font-semibold text-sm text-black mb-2">Price</p>
        <ul className="space-y-4">
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="500"
              name="500"
              value={500}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.100 to Rs.500</h2>
          </li>

          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="1000"
              name="1000"
              value={1000}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.500 to Rs.1000</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="1500"
              name="1500"
              value={1500}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.1000 to Rs.1500</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="2000"
              name="2000"
              value={2000}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.1500 to Rs.2000</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="2500"
              name="2500"
              value={2500}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.2000 to Rs.2500</h2>
          </li>
          <li className="flex justify-start items-start space-x-3">
            <input
              type="checkbox"
              id="3000"
              name="3000"
              value={3000}
              onChange={onPriceChange}
              className="w-4 h-4 mt-1"
            />
            <h2>Rs.2500 to Rs.3000</h2>
          </li>
        </ul>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}
