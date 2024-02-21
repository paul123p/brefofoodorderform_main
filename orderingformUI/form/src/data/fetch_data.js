import React, { useState, useEffect } from 'react';

const Content = () => {
  const [orders, setOrders] = useState([]);
  const [foodType, setFoodType] = useState('local');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('your-api-endpoint'); // Replace 'your-api-endpoint' with your actual API endpoint
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFoodTypeChange = (event) => {
    setFoodType(event.target.value);
    // If you want to fetch data based on foodType change, you can call fetchData here
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    // Create a new order object
    const newOrder = {
      foodType,
      name,
      email,
      contact,
      foodName: selectedFood,
      quantity,
    };

    // Save data to the server
    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        console.log('Order successfully saved!');
        // Optionally, you can refetch data after saving
        fetchData();
      } else {
        console.error('Error saving order:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };
};

export default Content;
