/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Select, MenuItem, FormControl, Drawer, List, ListItem, ListItemText, Grid, Typography, Avatar, CircularProgress, Backdrop } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { API_FetchOfferFastMovingProduct, API_FetchNewProduct, API_FetchProductIdMoreItems, API_FetchProductByCategory, API_FetchProductBySubCategory, API_FetchBrand } from '../services/productListServices';
import { API_FetchCategorySubCategory } from '../services/categoryServices';
import { ImagePathRoutes } from '../routes/ImagePathRoutes';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import AllCategory from '../assets/alc.jpg';
//import PlayStrore from '../../D:\KarthikWorkSpace\ReactProject\treeandleef\ecommercev7_frontend-main\src\assets\alc.jpg';

const drawerWidth = 240;

const ListItemStyled = styled(ListItem)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '7px',
  backgroundColor: selected ? '#F3E6FB' : '#fff',
  color: selected ? '#A700D1' : '#000',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
}));

const IconLabel = styled(Typography)({
  fontSize: '14px',
  marginTop: '5px',
  textAlign: 'center',
});

const ProductList = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [subcategories, setSubcategories] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [filteredProductLists, setFilteredProductLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [offerProducts, setOfferProducts] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [subCategoryName, setSubCategoryName] = useState(null);
  const [Multipleitems, setMultipleitems] = useState(1);
  const [Startindex, setStartindex] = useState(0);
  const [PageCount, setPageCount] = useState(1);
  const [brands, setBrands] = useState([]);
  const [fullProductList, setFullProductList] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("All brands");

  const [productFilterName, setProductFilterName] = useState('All products');


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 &&
      !loading
    ) {
      setPageCount((prev) => prev + 1);
      GetProductLists(categoryId, Multipleitems, Startindex, PageCount + 1);
    }
  };


  const handleSubCategoryClick = (subCategoryName, SubCategoryId) => {
    setSubCategoryId(SubCategoryId);
    setLoading(true); // Start loading
    setActiveCategory(subCategoryName);
  
    if (subCategoryName === "All Products") {
      GetProductLists(atob(categoryId), Multipleitems, Startindex, PageCount)
        .finally(() => setLoading(false)); // Stop loading after fetch
    } else {
      GetProductListsBySubCategory(SubCategoryId, Multipleitems, Startindex, PageCount)
        .finally(() => setLoading(false)); // Stop loading after fetch
    }
  };
  

  const GetCategoryBySubCategory = async (categoryId) => {
    try {
      if (categoryId !== "offer_product" && categoryId !== "related_product") {
        setLoading(true);
        setBackdropOpen(true);

        const subcategories = await API_FetchCategorySubCategory(categoryId);
        setLoading(false);
        setBackdropOpen(false);

        const allProductsCategory = { SubCategory: 'All Products' };
        setSubcategories([allProductsCategory, ...subcategories]);
        return subcategories;
      }
    } catch (error) {
      console.error("Error fetching subcategory:", error);
      setLoading(false);
      setBackdropOpen(false);
      return [];
    }
  };
  const GetProductLists = async (categoryId, Multipleitems, Startindex, PageCount) => {
    try {
      setLoading(true);
      setBackdropOpen(true);
      setProductLists([]);
      let productLists = [];
      if (categoryId === "offer_product") {
        setRelatedProducts(null);
        setNewProducts(null);
        setOfferProducts(categoryId);
        setActiveCategory("Offer products for you");
        productLists = await API_FetchOfferFastMovingProduct();
      }
      else if (categoryId === "new_product") {
        setOfferProducts(null);
        setRelatedProducts(null);
        setNewProducts(categoryId);
        setActiveCategory("New products for you");
        productLists = await API_FetchNewProduct();
      }
      else if (categoryId === "related_product") {
        setOfferProducts(null);
        setNewProducts(null);
        setRelatedProducts(atob(categoryName));
        setActiveCategory("You might also like products");
        productLists = await API_FetchProductIdMoreItems(atob(categoryName));
      }
      else {
        setOfferProducts(null);
        setRelatedProducts(null);
        setNewProducts(null);
        productLists = await API_FetchProductByCategory(categoryId, Multipleitems, Startindex, PageCount);
      }
      setProductLists(productLists);
      setLoading(false);
      setBackdropOpen(false);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      setLoading(false);
      setBackdropOpen(false);
      setProductLists([]);
    }
  };

  const GetProductListsBySubCategory = async (SubCategoryId, Multipleitems, Startindex, PageCount) => {
    try {
      if (SubCategoryId !== null) {
        setLoading(true);
        setBackdropOpen(true);
        setProductLists([]);
        const productLists = await API_FetchProductBySubCategory(SubCategoryId, Multipleitems, Startindex, PageCount);
        setFullProductList(productLists);
        setProductLists(productLists);
        const uniqueBrands = Array.from(
          new Set(productLists.map(product => product.Brandname).filter(Boolean))
        );
        setBrands(uniqueBrands);

        setLoading(false);
        setBackdropOpen(false);
      }
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      setLoading(false);
      setBackdropOpen(false);
      setProductLists([]);
    }
  };


  const handleBrandChange = (event) => {



    const selectedBrandId = event.target.value;
    setSelectedBrand(selectedBrandId);

    if (selectedBrandId === "All brands") {
      setProductLists(fullProductList);
    } else {

      const filteredProducts = fullProductList.filter(
        product => product.Brandname === selectedBrandId
      );
      setProductLists(filteredProducts);
    }
  };
  useEffect(() => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const encodedId = queryParams.get('pcid');
    const encodedName = queryParams.get('pcname');
    const encodedSId = queryParams.get('pscid');
    const encodedSName = queryParams.get('pscname');

    // Guard clause: if there's no pcid, do nothing
    if (!encodedId) return;

    // Decode parameters (if they exist)
    const decodedId = decodeURIComponent(encodedId);
    const decodedName = encodedName ? decodeURIComponent(encodedName) : null;
    const decodedSId = encodedSId ? decodeURIComponent(encodedSId) : null;
    const decodedSName = encodedSName ? decodeURIComponent(encodedSName) : null;

    // Update state with the decoded values
    setCategoryId(decodedId);
    setCategoryName(decodedName);
    setSubCategoryId(decodedSId);
    setSubCategoryName(decodedSName);


    const productId = atob(encodedId);


    if (productId !== 'new_product') {
      GetCategoryBySubCategory(productId);
    }
    if (decodedSId && decodedSName && decodedSName !== "All Products") {
      setActiveCategory(decodedSName);
      GetProductListsBySubCategory(atob(encodedSId), Multipleitems, Startindex, PageCount);
    } else {
      setActiveCategory("All Products");
      GetProductLists(productId, Multipleitems, Startindex, PageCount);
    }


  }, [location.search]);

  const handleProductFilterChange = (event) => {
    const filterName = event.target.value;
    setProductFilterName(filterName);
  };

  // Apply filtering logic whenever the product list or filter name changes
  // useEffect(() => {
  //   let sortedProducts = [...productLists];

  //   switch (productFilterName) {
  //     case "Price(Low > High)":
  //       sortedProducts.sort((a, b) => a.Price - b.Price);
  //       break;
  //     case "Price(High > Low)":
  //       sortedProducts.sort((a, b) => b.Price - a.Price);
  //       break;
  //     case "A-Z":
  //       sortedProducts.sort((a, b) => a.Description.localeCompare(b.Description));
  //       break;
  //     case "Z-A":
  //       sortedProducts.sort((a, b) => b.Description.localeCompare(a.Description));
  //       break;

  //     // case "All products":
  //     //   sortedProducts.sort((a, b) => b.Description.localeCompare(a.Description));
  //     //   break;
  //     default:
  //       sortedProducts = [...productLists];
  //   }


  //   setProductLists(sortedProducts);
  // }, [productFilterName, productLists]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight &&
        !loading
      ) {
        //setPageCount(prevIndex => prevIndex + 5);
        // You can call GetProductLists or GetProductListsBySubCategory here if needed
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productLists, loading, PageCount]);



  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="xl" sx={{ px: { xs: 0, md: 3 } }}>
        <Grid container>
          {/* Left-side Drawer for larger screens */}
          {(offerProducts === null && relatedProducts === null && newProducts === null) && (
            <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, zIndex: 10 }} style={{ position: 'sticky', top: 80, height: '100vh' }}>
              <Drawer
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  position: "relative",
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    position: "relative",
                    background: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflowY: 'auto',
                  },
                }}
              >
                <List sx={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}  >
                  {subcategories.map((category, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleSubCategoryClick(category.SubCategory, category.Id)}
                      sx={{
                        borderLeft: activeCategory === category.SubCategory ? `4px solid ${theme.palette.basecolorCode.main}` : 'none',
                        backgroundColor: activeCategory === category.SubCategory ? `${theme.palette.shadowcolorCode.main}` : 'transparent',
                        color: activeCategory === category.SubCategory ? `${theme.palette.basecolorCode.main}` : '#253D4E',
                        '& .MuiListItemIcon-root': {
                          color: activeCategory === category.SubCategory ? '#000' : 'inherit',
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.shadowcolorCode.main,
                          color: theme.palette.basecolorCode.main,
                        },
                      }}
                    >
                      <img
                        style={{
                          position: 'relative',
                          height: '3rem',
                          width: '3rem',
                          borderRadius: '9999px',
                          padding: '.25rem',
                          backgroundColor: '#f7f0fa',
                          marginRight: 10,
                        }}
                        src={category.ImagePath ? ImagePathRoutes.SubCategoryImagePath + category.ImagePath : AllCategory}
                      />
                      <ListItemText
                        primary={category.SubCategory}
                        primaryTypographyProps={{
                          style: {
                            fontWeight: activeCategory === category.SubCategory ? 'bold' : 'normal',
                            fontFamily: 'inherit',
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </Grid>
          )}

          {/* Mobile Drawer Toggle Button */}
          {(offerProducts === null && relatedProducts === null && newProducts === null) && (
            <Grid item xs={12} md={2} sx={{ display: { xs: 'block', md: 'none' }, position: 'sticky', top: 0, height: '100vh' }}>
              <Drawer
                variant="permanent"
                sx={{
                  width: '80px',
                  flexShrink: 0,
                  position: "relative",
                  '& .MuiDrawer-paper': {
                    width: '80px',
                    boxSizing: 'border-box',
                    position: "relative",
                  },
                }}
              >
                <List>
                  {subcategories.map((category, index) => (
                    <ListItemStyled
                      key={index}
                      onClick={() => handleSubCategoryClick(category.SubCategory, category.Id)}
                      sx={{
                        borderLeft: activeCategory === category.SubCategory ? `4px solid ${theme.palette.basecolorCode.main}` : 'none',
                        backgroundColor: activeCategory === category.SubCategory ? '#3bb77e1c' : 'transparent',
                        color: activeCategory === category.SubCategory ? '#3BB77E' : '#253D4E',
                        '& .MuiListItemIcon-root': {
                          color: activeCategory === category.SubCategory ? '#000' : 'inherit',
                        },
                        '&:hover': {
                          backgroundColor: '#3bb77e1c',
                          color: "#3BB77E",
                        },
                      }}
                    >
                      <Avatar src={category.ImagePath ? ImagePathRoutes.SubCategoryImagePath + category.ImagePath : "https://www.healthysteps.in/categoryimages/All-categories.png"} alt={category.SubCategory} />
                      <IconLabel>{category.SubCategory}</IconLabel>
                    </ListItemStyled>
                  ))}
                </List>
              </Drawer>
            </Grid>
          )}
          {/* Right-side Content Area */}
          <Grid item xs={12} md={offerProducts === null && relatedProducts === null && newProducts === null ? 10 : 12} sx={{ p: 3 }}>
            <Grid container sx={{ px: { xs: 0, md: 0 }, justifyContent: "flex-start", gap: "0px 18px" }}>
              {/* update by for brand search start  */}
              {/* update by   for brand search end  */}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Title Section */}
                <Typography
                  sx={{
                    fontSize: { xs: 20, md: 28 },
                    fontFamily: "inherit",
                    fontWeight: 600,
                    color: "#F44336",
                    textAlign: { xs: "center", md: "left" },
                  }}
                  variant="h4"
                >
                  {activeCategory || subCategoryName}
                </Typography>

                {/* Filters Section */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "auto" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: { xs: 2, md: 5 },
                    mb: 6, // Margin bottom for spacing
                  }}
                >
                  {/* Brand Filter */}
                  {activeCategory !== "All Products" && (
                    <Box
                      sx={{
                        minWidth: { xs: "100%", md: 250 },
                        maxWidth: "100%",
                      }}
                    >
                      {/* <FormControl fullWidth>
                          <Select
                            id="brandFilter"
                            value={selectedBrand}
                            size="small"
                            sx={{
                              textAlign: "left",
                              backgroundColor: "white",
                              borderRadius: "4px",
                            }}
                            onChange={handleBrandChange}
                          >
                            <MenuItem value="All brands">All brands</MenuItem>
                            {brands.map((brand, index) => (
                              <MenuItem key={index} value={brand}>
                                {brand}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl> */}
                    </Box>
                  )}


                  {/* Product Filter */}
                  <Box
                    sx={{
                      minWidth: { xs: "100%", md: 250 },
                      maxWidth: "100%",
                    }}
                  >
                    {/* <FormControl fullWidth>
                      <Select
                        id="productFilter"
                        value={productFilterName}
                        size="small"
                        sx={{
                          textAlign: "left",
                          backgroundColor: "white",
                          borderRadius: "4px",
                        }}
                        onChange={handleProductFilterChange}
                      >
                        <MenuItem value="All products">All products</MenuItem>
                        <MenuItem value="Price(Low > High)">Price (Low to High)</MenuItem>
                        <MenuItem value="Price(High > Low)">Price (High to Low)</MenuItem>
                        <MenuItem value="A-Z">A-Z</MenuItem>
                        <MenuItem value="Z-A">Z-A</MenuItem>
                      </Select>
                    </FormControl> */}
                  </Box>
                </Box>
              </Box>

              {/* Render filtered product list */}
              <div
                className={
                  offerProducts === null &&
                    relatedProducts === null &&
                    newProducts === null
                    ? "grid h-full w-full grid-cols-2 content-start gap-x-3 overflow-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pb-24 no-scrollbar"
                    : "grid h-full w-full grid-cols-2 content-start gap-x-3 overflow-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-24 no-scrollbar"
                }
              >
                {loading ? (
                  // Show loading indicator while fetching
                  <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                    {/* <CircularProgress /> */}
                  </Box>
                ) : productLists.length > 0 ? (
                  productLists.map((product) => (
                    <Box key={product.id} sx={{ mb: 3 }}>
                      <ProductCard
                        product={product}
                        isLoading={loading}
                        offerProducts={offerProducts}
                        relatedProducts={relatedProducts}
                        newProducts={newProducts}
                      />
                    </Box>
                  ))
                ) : (
                  // Show "No products available." only if not loading
                  !loading &&
                  !backdropOpen && (
                    <Typography
                      variant="h6"
                      sx={{ mt: 3, width: "100%", textAlign: "center", color: theme.palette.basecolorCode.main }}
                    >
                      No products available.
                    </Typography>
                  )
                )}
              </div>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>

  );
};

export default ProductList;
