import { useValue } from "../../Context/Context";
import "./product.css";

export default function Products() {
  const {
    data,
    maxPrice,
    setmaxPrice,
    handleChange,
    handleAddCart,
    handleFilter,
  } = useValue();

  return (
    <div className="main">
      <div className="searchBox">
        <input onChange={handleChange} placeholder="search here...." />
        <img
          className="searchImg"
          alt="search"
          src="https://cdn-icons-png.flaticon.com/128/18574/18574282.png"
        />
      </div>
      {/* main div */}
      <div className="sideBar">
        <h1>Filters</h1>

        {/* Filter by Price */}
        <div className="priceFilter">
          <h5>Filter By Price</h5>
          <div className="price-display">
            <span id="max-price">${maxPrice}</span>
          </div>
          <input
            type="range"
            id="range-slider"
            min="0"
            max="3000"
            value={maxPrice}
            step="100"
            onChange={(e) => setmaxPrice(Number(e.target.value))}
          />
        </div>

        {/* Filter by Category */}
        <div className="categoryFilter">
          <h5>Category</h5>
          <ul className="categoryList">
            <li>
              <input
                type="radio"
                name="category"
                id="electronics"
                onClick={() => {
                  handleFilter("Electronics");
                }}
              />
              <label htmlFor="electronics">Electronics</label>
            </li>
            <li>
              <input
                type="radio"
                name="category"
                id="home-appliances"
                onClick={() => {
                  handleFilter("Home Appliances");
                }}
              />
              <label htmlFor="home-appliances">Home Appliances</label>
            </li>
            <li>
              <input
                type="radio"
                name="category"
                id="books"
                onClick={() => {
                  handleFilter("Clothing");
                }}
              />
              <label htmlFor="books">Clothing</label>
            </li>
            <li>
              <input
                type="radio"
                name="category"
                id="others"
                onClick={() => {
                  handleFilter("Others");
                }}
              />
              <label htmlFor="others">Others</label>
            </li>
          </ul>
        </div>
      </div>
      <div className="CardsContainer">
        {/* cards */}

        {data.map((product, index) => (
          <div key={index} className="Cards">
            <div className="CardsImg">
              <img className="Img" alt={product.name} src={product.img} />
            </div>
            <h4 className="CardsName">{product.name}</h4>
            <h6 className="CardsPrice">${product.price}</h6>

            <button
              onClick={() => handleAddCart(product)}
              className="CardsButton"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
