import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';
import Image from 'next/image';

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
          <li>Payment</li>
          <li>Food Detail</li>
          <li>Customer Detail</li>
          <li>Settings</li>
        </ul>
        <div className={styles.promoBox}>
          <Image src="/promo.png" alt="Promo" width={100} height={100} />
          <p>Have a great deal today</p>
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
            <Image src="/notif-icon.png" alt="Notif" width={24} height={24} />
            <Image src="/avatar.png" alt="Avatar" width={32} height={32} className={styles.avatar} />
          </div>
        </header>

        <section className={styles.widgets}>
          <div className={styles.widget}>Orders: 75</div>
          <div className={styles.widget}>Customers: 357</div>
          <div className={styles.widget}>Products: 65</div>
          <div className={styles.widget}>Revenue: $128</div>
        </section>

        <section className={styles.chartsSection}>
          <div className={styles.chart}>Pie Chart</div>
          <div className={styles.chart}>Chart Order</div>
        </section>

        <section className={styles.chartsSection}>
          <div className={styles.chart}>Total Revenue</div>
          <div className={styles.chart}>Customer Map</div>
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
                <Image src="/food1.png" alt="Food" width={80} height={80} />
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
