import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateCarVariant = ({ variantId, onUpdateSuccess }) => {
  const [variant, setVariant] = useState({
    name: '',
    model_id: '',
    engine_type: '',
    transmission: '',
    seats: '',
    fuel_capacity: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch existing variant data on mount
  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const response = await axios.get(`/api/car-variants/${variantId}`)
        setVariant(response.data)
      } catch (err) {
        setError('Failed to load variant data')
      } finally {
        setLoading(false)
      }
    }
    fetchVariant()
  }, [variantId])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setVariant((prev) => ({ ...prev, [name]: value }))
  }

  // Submit updated variant
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/car-variants/${variantId}`, variant)
      onUpdateSuccess && onUpdateSuccess()
      alert('Variant updated successfully!')
    } catch (err) {
      setError('Failed to update variant')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Car Variant</h2>

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={variant.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Model ID:
        <input
          type="number"
          name="model_id"
          value={variant.model_id || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Engine Type:
        <input
          type="text"
          name="engine_type"
          value={variant.engine_type || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Transmission:
        <input
          type="text"
          name="transmission"
          value={variant.transmission || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Seats:
        <input
          type="number"
          name="seats"
          value={variant.seats || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Fuel Capacity:
        <input
          type="number"
          step="0.1"
          name="fuel_capacity"
          value={variant.fuel_capacity || ''}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Update Variant</button>
    </form>
  )
}

export default UpdateCarVariant
