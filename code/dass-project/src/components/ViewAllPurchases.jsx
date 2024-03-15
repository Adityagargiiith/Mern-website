import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/purchasepage.css";

export default function ViewAllPurchasePage() {
  const [purchases, setPurchases] = useState([]);
  
  useEffect(() => {
    async function fetchPurchases() {
      try {
        const response = await axios.get("http://localhost:5000/purchase");
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    }

    fetchPurchases();
  }, []);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: 15 }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 ">
                  View All Purchases
                </h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Serial Number</th>
                      <th>Component Name</th>
                      <th>Quantity</th>
                      <th>Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{purchase.componentName}</td>
                        <td>{purchase.quantity}</td>
                        <td>{purchase.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// export default function ViewAllPurchasePage() {
//   const PurchaseList = () => {
//   const [purchases, setPurchases] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('/api/purchase');
//         setPurchases(response.data);
//       } catch (error) {
//         console.error('Error fetching purchase data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run effect only once on component mount

//   return (
//     <div>
//       <h2>Entries Added to the Database:</h2>
//       <ul>
//         {purchases.map((purchase, index) => (
//           <li key={index}>
//             <strong>Component Name:</strong> {purchase.componentName},{' '}
//             <strong>Quantity:</strong> {purchase.quantity},{' '}
//             <strong>Team:</strong> {purchase.team}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// }

