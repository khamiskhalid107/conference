import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Addbook = () => {
    const [visitorId, setVisitorId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [visitors, setVisitors] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Fetch visitors and services for dropdowns
        axios.get('http://localhost:4500/api/all/Visitor').then(response => setVisitors(response.data));
        axios.get('http://localhost:4500/api/all/Service').then(response => setServices(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const booking = { visitor: { id: visitorId }, service: { S_id: serviceId }, status, date };

        axios.post('http://localhost:4500/Staff/Api/addBooking', booking)
            .then(response => alert('Booking added successfully!'))
            .catch(error => console.error('Error adding booking:', error));
    };

    return (
        <div>
            <h2>Add Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Visitor:</label>
                    <select value={visitorId} onChange={(e) => setVisitorId(e.target.value)}>
                        <option value="">Select Visitor</option>
                        {visitors.map(visitor => (
                            <option key={visitor.id} value={visitor.id}>{visitor.username}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Service:</label>
                    <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}>
                        <option value="">Select Service</option>
                        {services.map(service => (
                            <option key={service.S_id} value={service.S_id}>{service.serviceName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <button type="submit">Add Booking</button>
            </form>
        </div>
    );
};

export default Addbook;
