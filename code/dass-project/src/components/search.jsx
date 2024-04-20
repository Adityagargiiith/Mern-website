import React, { useEffect, useState } from "react";
// import "./CSS/home.css";
// import e from "express";
import img1 from "./CSS/arka_logo.png";
import "./CSS/search.css";

import axios from "axios";
// import cheerio from "cheerio";
import { load } from "cheerio";

export default function Search() {

    const [searchTerm, setSearchTerm] = useState("");
    const [topProducts, setTopProducts] = useState([]);

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = async () => {
      try {
          const response = await axios.get(
              `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`
          );
          const $ = load(response.data);
          const products = $(".s-result-item")
              .map((_, el) => {
                  const title = $(el).find("h2 > a > span").text().trim();
                  const price = $(el).find(".a-price-whole").text().trim();
                  const rating = $(el).find(".a-icon-alt").first().text().trim();
                  return { title, price, rating };
              })
              .get();
          setTopProducts(products.slice(0, 6));
      } catch (error) {
          console.error("Error fetching products:", error);
      }
  };
    

    return (
        <div className="search">
        <header className="header">
        <div className="header-left">
          <img src={img1} alt="Cogo" className="logo" />
        </div>


        
      </header>
      <div className="search-container">
                <div className="form-outline">
                    <input
                        id="search-input"
                        type="search"
                        className="form-control"
                        onChange={handleSearchChange}
                        value={searchTerm}
                        placeholder="Search" 
                    />
                    
                </div>
                <button
    id="search-button"
    type="button"
    className="btn btn-primary big-blue-button"
    onClick={handleSearch}
>
    Search
    <i class="bi bi-search"></i>
</button>

            </div>
            <title>Product Table</title>
            <table className="container">
  <thead>
    <tr>
      <th>
        <h1>Title</h1>
      </th>
      <th>
        <h1>Price</h1>
      </th>
      <th>
        <h1>Rating</h1>
      </th>
      
    </tr>
  </thead>
  <tbody>
  {topProducts.slice(-4).map((product, index) => (
        <tr key={index}>
            <td className="product-title">{product.title}</td>
            <td className="product-price">{product.price}</td>
            <td className="product-rating">{product.rating}</td>
        </tr>
    ))}
    
  </tbody>
</table>


</div>
    
    );
    }

