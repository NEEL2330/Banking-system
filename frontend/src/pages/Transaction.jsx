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

const Transaction = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Updated options
  const options = ['Transaction ID', 'Account No'];

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
      case 'Transaction ID':
        setInputValues({ transactionId: '' });
        break;
      case 'Account No':
        setInputValues({ accountNo: '' });
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

    if (selectedOption === 'Transaction ID' && inputValues.transactionId) {
      // For demo, search by product ID
      filtered = products.filter(product =>
        product.id.toString().includes(inputValues.transactionId)
      );
    } else if (selectedOption === 'Account No' && inputValues.accountNo) {
      // For demo, search by category as account number (since API has no account number)
      filtered = products.filter(product =>
        product.category.toLowerCase().includes(inputValues.accountNo.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const renderInputFields = () => {
    switch (selectedOption) {
      case 'Transaction ID':
        return (
          <InputBar
            name="transactionId"
            placeholder="Enter Transaction ID"
            value={inputValues.transactionId || ''}
            onChange={handleInputChange}
          />
        );
      case 'Account No':
        return (
          <InputBar
            name="accountNo"
            placeholder="Enter Account No"
            value={inputValues.accountNo || ''}
            onChange={handleInputChange}
          />
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

export default Transaction;
