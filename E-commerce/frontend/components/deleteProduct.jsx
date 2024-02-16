// import React from "react";
// import { useMutation } from "@reduxjs/toolkit/query/react";
// import { deleteProducts } from "../api/productApi";

// const DeleteProduct = ({ productId }) => {
//   console.log("ProductId:", productId);

//   const [mutate, { isLoading, isError }] = useMutation(deleteProducts);

//   const handleDelete = async () => {
//     try {
//       console.log("Deleting product...");
//       await mutate(productId);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   if (isLoading) {
//     return <div>Deleting product...</div>;
//   }

//   if (isError) {
//     return <div>Error: Unable to delete product</div>;
//   }

//   return (
//     <div>
//       <button onClick={handleDelete}>Delete Product</button>
//     </div>
//   );
// };

// export default DeleteProduct;
