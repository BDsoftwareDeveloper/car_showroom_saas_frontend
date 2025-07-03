import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateCarModel = ({ modelId, onUpdateSuccess }) => {
  const [model, setModel] = useState({
    name: '',
    brand_id: '',
  })
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchModelAndBrands = async () => {
      try {
        const [modelRes, brandsRes] = await Promise.all([
          axios.get(`/api/car-models/${modelId}`),
          axios.get('/api/car-brands'),
        ])
        setModel(modelRes.data)
        setBrands(brandsRes.data)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchModelAndBrands()
  }, [modelId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setModel((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/car-models/${modelId}`, model)
      onUpdateSuccess && onUpdateSuccess()
      alert('Model updated successfully!')
    } catch (err) {
      setError('Failed to update model')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Car Model</h2>

      <label>
        Model Name:
        <input
          type="text"
          name="name"
          value={model.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Brand:
        <select
          name="brand_id"
          value={model.brand_id || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Update Model</button>
    </form>
  )
}

export default UpdateCarModel
