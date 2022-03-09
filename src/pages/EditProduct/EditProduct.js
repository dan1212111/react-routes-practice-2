import { useEffect, useState } from "react"
import { link, useLocation } from "react-router-dom"

function EditProductPage(props) {
  const [productToUpdate, setProductToUpdate] = useState(null)

  console.log({ productToUpdate })

  const location = useLocation()

  useEffect(
    function () {
      if (location.state) {
        setProductToUpdate(location.state.product)
      }
    },
    [location]
  )

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    setProductToUpdate({ ...productToUpdate, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const array = [...props.products]

    const updateArr = array.find((item) => item === event.target.value)
    array.splice(updateArr, 1, productToUpdate)
    console.log(array)
    props.setProducts(array)
  }

  if (!productToUpdate) return <div>Loading...</div>

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={productToUpdate.name}
      />
      <button type="submit">Edit</button>
    </form>
  )
}

export default EditProductPage
