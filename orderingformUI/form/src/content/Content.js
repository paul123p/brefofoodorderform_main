import React, { useState, useEffect } from 'react';
import './Content.css';

const Content = () => {
  const [foodType, setFoodType] = useState('local');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedFood, setSelectedFood] = useState('banku and okro');
  const [quantity, setQuantity] = useState('');
  const [orders, setOrders] = useState([]);
  const [foodPrice, setFoodPrice] = useState(30);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/orders');
      const data = await response.json();
      setOrders(data)
    }
    catch (error) {
      console.error('Error fetching data:', error)
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
  };

  const renderFoodNameOptions = () => {
    if (foodType === 'local') {
      return (
        <>
          <option value='banku and okro'>Banku with Okro Soup</option>
          <option value='yam and kontomire stew'>Boiled yam and kontomire stew</option>
          <option value='Fried yam and hot pepper'>fried yam and hot pepper</option>
          <option value='fufu with goat soup'>Fufu with goat soup</option>
          <option value='omo tuo with groundnut soup'>Omo tuo with groundnut soup</option>
          <option value='tuo and okro'>Mashed plantain with groundnut</option>
          <option value='tuo and okro'>Roasted plantain with groundnut</option>
        </>
      );
    } else {
      return (
        <>
          <option value='Fried Rice with chicken and beef sauce'>Fried Rice with chicken and beef sauce</option>
          <option value='Fried Rice with beef and chicken sauce'>Fried Rice with beef and chicken sauce</option>
          <option value='Hot-Dog'>Hot-Dog</option>
          <option value='Jollof'>Jollof</option>
          <option value='Shawarma'>Shawarma</option>
          <option value='Sandwich'>Sandwich</option>
          {/* Add more options as needed */}
        </>
      );
    }
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    const newOrder = {
      customerName: customerName,
      customerPhone: customerPhone,
      foodType: foodType,
      foodName: selectedFood,
      foodPrice: foodPrice,
      quantity: quantity,   
    };

    try {
      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        setSnackbarMessage('Order successfully saved!');
        setSnackbarVisible(true);
        // Refetch data after saving
        fetchData();
      } else {
        setSnackbarMessage('Error saving order: ' + response.statusText);
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarMessage('Error saving order: ' + error);
      setSnackbarVisible(true);
    }
  };

  return (
    <article>
      {/* Order Form */}
      <section className='orderbasecontainer'>
        <h1>Place Order</h1>
        <form className='order_form' onSubmit={handleOrderSubmit}>
          <label htmlFor='name'>Name</label>
          <input id='name' type='text' className='inputField' placeholder='Your Name' value={customerName} onChange={(e) => setCustomerName(e.target.value)} />

          <label htmlFor='contact'>Contact</label>
          <input id='contact' type='text' className='inputField' placeholder='Contact' value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />

          <label htmlFor='foodtype'>Food Type</label>
          <select id='foodtype' className='inputField' value={foodType} onChange={handleFoodTypeChange}>
            <option value='local'>Local</option>
            <option value='continental'>Continental</option>
          </select>

          <label htmlFor='foodname'>Food Name</label>
          <select id='foodname' className='inputField' value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
            {renderFoodNameOptions()}
          </select>

          <label htmlFor='quantity'>Quantity</label>
          <input id='quantity' type='number' className='inputField' placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <label htmlFor='foodprice'>Food Price</label>
          <select id='foodprice' className='inputField' value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)}>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='45'>45</option>
            <option value='55'>55</option>
            <option value='60'>60</option>
            <option value='90'>90</option>
            <option value='120'>120</option>
          </select>

          <button type='submit' className='order__btn'>Order</button>
        </form>
      </section>

      {/* Active Orders */}
      <section className='active_orders'>
        <h1>Pending Orders</h1>
        {/* Loop through the orders and display them */}
        {orders.map((order) => (
          <div className='order_card' key={order.id}>
            <p>{order.foodType}</p>
            <div className='food'>
              <p className='foodName'>{order.foodName}</p>
              <p>Order Id: {order.id}</p>
            </div>
            <div className='food'>
              <p className='customer_name'>{order.customerName}</p>
              <p>{order.customerPhone}</p>
            </div>
            <div className='food'>
              <p className='quantity'>
                Quantity: <span>{order.quantity}</span>
              </p>
              <p className='price'>
                Total: <span className='price_number'>{order.quantity * order.foodPrice}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

       {/* Snackbar */}
       {snackbarVisible && (
        <div className='snackbar' onClick={handleCloseSnackbar}>
          {snackbarMessage}
        </div>
      )}
    </article>
  );
};

export default Content;
