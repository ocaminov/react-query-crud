import { useMutation, useQueryClient } from "react-query"
import { createProduct } from "../api/productsAPI"

function ProductForm() {

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log('Product added')
      queryClient.invalidateQueries('products')//Para recargar la cache
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const product = Object.fromEntries(formData)
    addProductMutation.mutate({
      ...product,
      inStock: true
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />

      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" />

      <button>Add Product</button>
    </form>
  );
}

export default ProductForm;
