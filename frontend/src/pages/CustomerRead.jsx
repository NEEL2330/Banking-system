import React, { useState, useEffect } from 'react';

// InputBar outside the main component
const InputBar = ({ name, placeholder, value, onChange }) => (
  <div>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const CustomerRead = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const options = ['Name', 'City', 'Age and Name'];

  // Fetch products from API on mount
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Reset input values ONLY when selectedOption changes
  useEffect(() => {
    switch (selectedOption) {
      case 'Name':
        setInputValues({ name: '' });
        break;
      case 'City':
        setInputValues({ city: '' });
        break;
      case 'Age and Name':
        setInputValues({ age: '', name: '' });
        break;
      default:
        setInputValues({});
    }
    setFilteredProducts([]); // Clear results on option change
  }, [selectedOption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Search/filter logic on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let filtered = [];

    if (selectedOption === 'Name' && inputValues.name) {
      filtered = products.filter(product =>
        product.title.toLowerCase().includes(inputValues.name.toLowerCase())
      );
    } else if (selectedOption === 'City' && inputValues.city) {
      // Let's pretend 'category' is 'city' for demo purposes
      filtered = products.filter(product =>
        product.category.toLowerCase().includes(inputValues.city.toLowerCase())
      );
    } else if (
      selectedOption === 'Age and Name' &&
      inputValues.age &&
      inputValues.name
    ) {
      // For demo, match 'age' to product 'id' and 'name' to title
      filtered = products.filter(product =>
        product.id.toString() === inputValues.age &&
        product.title.toLowerCase().includes(inputValues.name.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'Name':
        return (
          <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
        );
      case 'City':
        return (
          <InputBar name="city" placeholder="Enter City" value={inputValues.city || ''} onChange={handleInputChange} />
        );
      case 'Age and Name':
        return (
          <>
            <InputBar name="age" placeholder="Enter Age" value={inputValues.age || ''} onChange={handleInputChange} />
            <InputBar name="name" placeholder="Enter Name" value={inputValues.name || ''} onChange={handleInputChange} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <h2>Select the option</h2>
        <div>
          {options.map((option, index) => (
            <label key={index} className="customerlist">
              <input
                type="radio"
                name="customradio"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
          {renderInputFields()}
          <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
        </form>

        {/* Display filtered products */}
        <div style={{ marginTop: '30px' }}>
          <h3>Search Results:</h3>
          {filteredProducts.length === 0 && <div>No matching products found.</div>}
          {filteredProducts.map(product => (
            <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <strong>{product.title}</strong>
              <div>Category: {product.category}</div>
              <div>Price: ${product.price}</div>
              <div>Description: {product.description}</div>
              <img src={product.image} alt={product.title} style={{ width: 80, height: 80 }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerRead;
