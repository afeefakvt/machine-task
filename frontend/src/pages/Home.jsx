import { useEffect, useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import Breadcrumbs from "../components/BreadCrumbs";
import { getAllProducts } from "../api/productApi";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const { searchQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
        setFilteredProducts(res);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (searchQuery.trim()) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      temp = temp.filter((p) => p.category === selectedCategory);
    }

    if (priceRange.min) {
      temp = temp.filter((p) => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      temp = temp.filter((p) => p.price <= Number(priceRange.max));
    }
    if (sortOrder === "price-low") temp.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") temp.sort((a, b) => b.price - a.price);
    if (sortOrder === "name-asc")
      temp.sort((a, b) => a.title.localeCompare(b.title));
    if (sortOrder === "name-desc")
      temp.sort((a, b) => b.title.localeCompare(a.title));

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [searchQuery,sortOrder, selectedCategory, priceRange, sortOrder]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error}</p>;

  return (
    <div className="home-container">
      <div className="hero-section"></div>
      <div className="breadcrumb-wrapper">
        <Breadcrumbs />
      </div>
      <div className="main-layout">
        <FilterSidebar
          onCategoryChange={setSelectedCategory}
          onPriceChange={setPriceRange}
        />
        <div className="product-section">
          <SortDropdown onSortChange={setSortOrder} />
          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            total={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
