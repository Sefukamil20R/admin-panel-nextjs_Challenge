import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';
import Image from 'next/image';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar
} from 'recharts';

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const barData = [
  { name: 'Mon', orders: 30 },
  { name: 'Tue', orders: 20 },
  { name: 'Wed', orders: 27 },
  { name: 'Thu', orders: 23 },
  { name: 'Fri', orders: 34 },
];

const revenueData = [
  { name: 'Jan', revenue: 400 },
  { name: 'Feb', revenue: 300 },
  { name: 'Mar', revenue: 500 },
  { name: 'Apr', revenue: 200 }
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;

  const users = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: '/user-avatar.png'
  }));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div className={styles.sidebar}>
        <div className={styles.logo}>Sedap.</div>
        <ul className={styles.navList}>
          <li className={styles.active}>Dashboard</li>
          <li>Order List</li>
          <li>Order Detail</li>
          <li>Customer</li>
          <li>Analytics</li>
          <li>Reviews</li>
          <li>Foods</li>
          <li>Reviews</li>
          <li>Reviews</li>
         <li>Food Detail</li>
          <li>Calendar</li>
          <li>Chat</li>
          <li>Wallet</li>

        </ul>
        <div className={styles.promoBox}>
          <Image src="/sidebar.png" alt="Promo" width={100} height={100} />
          <p>Sedap Restaurant Admin Dashboard</p>
        </div>
      </div>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div>
            <h2>Dashboard</h2>
            <p>Hi Samantha, welcome back to Sedap Admin!</p>
          </div>
          <div className={styles.profileArea}>
            <input type="text" placeholder="Search" className={styles.searchInput} />
            <Image src="/notification.png" alt="Notif" width={24} height={24} />
            <Image src="/heroavator.png" alt="Avatar" width={32} height={32} className={styles.avatar} />
          </div>
        </header>

        <section className={styles.widgets}>
          {['Orders', 'Customers', 'Products', 'Revenue'].map((label, idx) => (
            <div className={styles.widget} key={idx}>
              <Image src="/widget.png" alt="icon" width={40} height={40} />
              <div>
                <h3>128</h3>
                <p>{label}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.chartsSection}>
          <div className={styles.chart}>
            <PieChart width={200} height={200}>
              <Pie data={pieData} cx={100} cy={100} innerRadius={40} outerRadius={80} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p>Pie Chart</p>
          </div>
          <div className={styles.chart}>
            <BarChart width={300} height={200} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
            <p>Order Chart</p>
          </div>
        </section>

        <section className={styles.chartsSection}>
          <div className={styles.chart}>
            <LineChart width={300} height={200} data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
            <p>Total Revenue</p>
          </div>
          <div className={styles.chart}>
            <img src="/customermap.png" alt="Map" style={{ width: '100%', height: '180px' }} />
            <p>Customer Map</p>
          </div>
        </section>

        <section className={styles.tableSection}>
          <h3>User Table</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1 ? styles.activePage : ''}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.reviewSection}>
          <h3>Customer Reviews</h3>
          <div className={styles.reviews}>
            {currentUsers.slice(0, 3).map(user => (
              <div className={styles.reviewCard} key={user.id}>
                <Image src="/user1.png" alt="Food" width={80} height={80} />
                <div>
                  <h4>{user.name}</h4>
                  <p>"Delicious and great experience!"</p>
                  <span>⭐⭐⭐⭐☆</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
