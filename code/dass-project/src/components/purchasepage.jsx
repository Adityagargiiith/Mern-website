import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/purchasepage.css";

export default function PurchasePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    componentName: "",
    quantity: 0,
    team: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data
    try {
      await axios.post("http://localhost:5000/purchase", formData);

      // Assuming successful submission, redirect or show a success message
      navigate("/home"); // Redirect to a success page
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

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
                  Purchase requisition Form
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          Link to purchase
                        </label>
                        <input
                          type="url"
                          id="linktopurchase"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="componentName">
                          Component Name
                        </label>
                        <input
                          type="text"
                          id="componentName"
                          name="componentName"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                          value={formData.componentName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="quantity">
                          Quantity
                        </label>
                        <input
                          type="number"
                          id="quantity"
                          name="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="team">
                          Team
                        </label>
                        <input
                          type="text"
                          id="team"
                          name="team"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                          value={formData.team}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          CHIMS: Does the purchase involve IC or semiconductor
                          items?
                        </label>
                        <input
                          type="file"
                          id="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName">
                          PO/BOM/Quote Upload
                        </label>
                        <input
                          type="file"
                          id="quantity"
                          className="form-control form-control-lg-lg"
                          style={{ width: "600px" }}
                        />
                      </div>
                    </div>
                  </div>
                 
                  <div className="row">
                    <div className="col-md-6 mb-4">Project</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option1"
                          />
                          <label className="form-check-label" htmlFor="option1">
                            Charmender
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option2"
                          />
                          <label className="form-check-label" htmlFor="option2">
                            Pikachu
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option3"
                          />
                          <label className="form-check-label" htmlFor="option3">
                            Starling
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option4"
                          />
                          <label className="form-check-label" htmlFor="option4">
                            DTRS
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option5"
                          />
                          <label className="form-check-label" htmlFor="option5">
                            Generic
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radioOptions"
                            id="option6"
                          />
                          <label className="form-check-label" htmlFor="option6">
                            MFG
                          </label>
                        </div>

                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import React, { useState } from 'react';
// import axios from 'axios';
// export default function PurchasePage(){
//   const PurchaseForm = () => {
//   const [componentName, setComponentName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [team, setTeam] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/purchase', {
//         componentName,
//         quantity: parseInt(quantity),
//         team
//       });
//       // Clear form fields after successful submission
//       setComponentName('');
//       setQuantity('');
//       setTeam('');
//       alert('Purchase data submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting purchase data:', error);
//       alert('Error submitting purchase data. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Component Name:
//         <input
//           type="text"
//           value={componentName}
//           onChange={(e) => setComponentName(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Quantity:
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         Team:
//         <input
//           type="text"
//           value={team}
//           onChange={(e) => setTeam(e.target.value)}
//           required
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
// }
