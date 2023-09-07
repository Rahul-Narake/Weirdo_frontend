import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
export default function UpdateProduct() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { productId } = useParams();
  const { categories } = useSelector((state) => state.category);
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onColorChange = (e) => {
    const color = e.target.value;
    if (!colors.includes(color)) {
      colors.push(color);
    } else {
      const newColors = colors.filter((col) => {
        if (col !== color) {
          return col;
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (image === null) {
      toast.error('Please select Image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('image', image);
      formData.append('sizes', sizes);
      formData.append('colors', colors);
      const response = await fetch(`${BASE_URL}/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setProduct({
          name: '',
          description: '',
          price: 0,
          category: '',
        });
        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/product/get/${productId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) setProduct(result.product);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 ">
        <form
          onSubmit={handleUpdate}
          className="flex flex-col py-4 bg-white border shadow-sm md:col-span-8 md:col-start-3 sm:col-span-1 sm:col-start-1 sm:px-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={onChange}
              required
              placeholder="Enter your product name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Price
            </label>
            <input
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={onChange}
              required
              placeholder="Enter your product price"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              name="category"
              id="category"
              value={product.category}
              onChange={onChange}
            >
              <option value="none">Select Category</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              type="text"
              id="description"
              name="description"
              value={product.description}
              onChange={onChange}
              rows={5}
              required
              placeholder="Enter your product Description"
            />
          </div>

          <div className="flex flex-wrap space-x-4 my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mr-2"
              htmlFor="description"
            >
              Select colors :
            </label>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="red"
                id="red"
                value={'red'}
                onChange={onColorChange}
              />
              <label htmlFor="red">Red</label>
            </div>

            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="blue"
                id="blue"
                value={'blue'}
                onChange={onColorChange}
              />
              <label htmlFor="blue">Blue</label>
            </div>

            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="white"
                id="white"
                value={'white'}
                onChange={onColorChange}
              />
              <label htmlFor="white">White</label>
            </div>

            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="black"
                id="black"
                value={'black'}
                onChange={onColorChange}
              />
              <label htmlFor="black">Black</label>
            </div>

            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="yellow"
                id="yellow"
                value={'yellow'}
                onChange={onColorChange}
              />
              <label htmlFor="yellow">Yellow</label>
            </div>
          </div>

          <div className="flex flex-wrap space-x-4 my-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mr-2"
              htmlFor="description"
            >
              Select Sizes :
            </label>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="S"
                id="S"
                value={'S'}
                onChange={onSizeChange}
              />
              <label htmlFor="red">S</label>
            </div>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="L"
                id="L"
                value={'L'}
                onChange={onSizeChange}
              />
              <label htmlFor="blue">L</label>
            </div>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="M"
                id="M"
                value={'M'}
                onChange={onSizeChange}
              />
              <label htmlFor="white">M</label>
            </div>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="XL"
                id="XL"
                value={'XL'}
                onChange={onSizeChange}
              />
              <label htmlFor="black">XL</label>
            </div>
            <div className="flex flex-wrap space-x-1">
              <input
                type="checkbox"
                name="XXL"
                id="XXL"
                value={'XXL'}
                onChange={onSizeChange}
              />
              <label htmlFor="yellow">XXL</label>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Product Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <small>file should be type of jpg or png only</small>
          </div>

          <div className="flex flex-row justify-center space-x-5">
            <button
              className=" bg-blue-500 p-2 text-white py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              type="submit"
            >
              Update
            </button>
            <button
              className=" bg-pink-500 p-2 text-white py-2 rounded-xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              type="reset"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
