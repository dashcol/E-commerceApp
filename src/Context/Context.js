import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebaseConfig";
import Loading from "../components/loading/laoding";

const Appcontext = createContext();

const useValue = () => {
  const value = useContext(Appcontext);
  return value;
};

export default function AppContext({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setmaxPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map((product) => ({
        id: product.id,
        ...product.data(),
      }));
      setData(products);
      setFilteredData(products);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // update for every time maxPrice is changed and products rerenders

  useEffect(() => {
    const newProducts = maxPrice
      ? data.filter((product) => product.price <= maxPrice)
      : data;
    setFilteredData(newProducts);
  }, [data, maxPrice]);

  // searchBar logic

  const handleChange = async (e) => {
    const value = e.target.value;
    console.log(value);

    if (value.trim() === "") {
      setFilteredData(data);
      return;
    }

    try {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef,
        where("name", ">=", value),
        where("name", "<=", value + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      const searchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(searchedProducts);

      setFilteredData(searchedProducts);
    } catch (error) {
      console.error("Error during search: ", error);
    } finally {
    }
  };

  // form submission for signup
  const handleSignup = async (userData) => {
    if (userData.confirmPassword !== userData.password) {
      alert("Passwords do not match.");
      return false;
    }

    try {
      await addDoc(collection(db, "users"), {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      return true;
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
      return false;
    }
  };

  const handleAddCart = (product) => {
    setCartItems((prev) => [...prev, product.id]);
  };
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // form submission for login

  const handleLogin = async (email, password) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Invalid credentials.");
      } else {
        const user = querySnapshot.docs[0].data();
        setCurrentUser(user);
        setIsAuthenticated(true);
        alert("Login successful!");
        return true;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleFilter = (category) => {
    const newProducts = data.filter((product) => product.category === category);
    setFilteredData(newProducts);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <Appcontext.Provider
        value={{
          data: filteredData,
          allData: data,
          maxPrice,
          setmaxPrice,
          handleChange,
          handleSignup,
          isAuthenticated,
          handleLogin,
          handleAddCart,
          cartItems,
          handleRemoveFromCart,
          handleFilter,
          handleLogout,
          currentUser,
        }}
      >
        {loading ? <Loading /> : children}
      </Appcontext.Provider>
    </>
  );
}

export { useValue };
