import React, { useEffect, useState } from 'react';

import axios from 'axios';

import dayjs from 'dayjs';

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import Nav from '../component/Navigation/Nav';

const VisitorReport = () => {
  const [visitors, setVisitors] = useState([]);
  const [visitorStats, setVisitorStats] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0
  });

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/all/Visitor');
        // const response = await axios.get('http://localhost:8080/api/all/Visitor');
        setVisitors(response.data);
        calculateVisitorStats(response.data);
      } catch (error) {
        console.error("Error fetching visitors", error);
      }
    };

    fetchVisitors();
  }, []);

  const calculateVisitorStats = (data) => {
    const now = dayjs();
    const dailyCount = data.filter(visitor => dayjs(visitor.created_at).isSame(now, 'day')).length;
    const weeklyCount = data.filter(visitor => dayjs(visitor.created_at).isSame(now, 'week')).length;
    const monthlyCount = data.filter(visitor => dayjs(visitor.created_at).isSame(now, 'month')).length;
    const yearlyCount = data.filter(visitor => dayjs(visitor.created_at).isSame(now, 'year')).length;

    setVisitorStats({
      daily: dailyCount,
      weekly: weeklyCount,
      monthly: monthlyCount,
      yearly: yearlyCount
    });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const pieData = [
    { name: 'Daily', value: visitorStats.daily },
    { name: 'Weekly', value: visitorStats.weekly },
    { name: 'Monthly', value: visitorStats.monthly },
    { name: 'Yearly', value: visitorStats.yearly }
  ];

  return (
    <>
      <Nav />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Visitor Report</h1>

        <div className="mb-4">
          <h2>Visitor Statistics</h2>
          <p><strong>Daily Visitors:</strong> {visitorStats.daily}</p>
          <p><strong>Weekly Visitors:</strong> {visitorStats.weekly}</p>
          <p><strong>Monthly Visitors:</strong> {visitorStats.monthly}</p>
          <p><strong>Yearly Visitors:</strong> {visitorStats.yearly}</p>
        </div>

        <div className="d-flex justify-content-around mb-4">
          <div className="chart-container">
            <h3 className="text-center">Visitor Counts - Bar Chart</h3>
            <BarChart
              width={500}
              height={300}
              data={pieData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: 'Time Period', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Visitor Count', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="chart-container">
            <h3 className="text-center">Visitor Distribution - Pie Chart</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                label
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Visitor ID</th>
              <th>Visitor Username</th>
              <th>Visitor Full Name</th>
              <th>Visitor Email</th>
              <th>Visitor Purpose</th>
              <th>Visitor Phone</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.id}>
                <td>{visitor.id}</td>
                <td>{visitor.username}</td>
                <td>{visitor.fullname}</td>
                <td>{visitor.email}</td>
                <td>{visitor.v_purpose}</td>
                <td>{visitor.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VisitorReport;
