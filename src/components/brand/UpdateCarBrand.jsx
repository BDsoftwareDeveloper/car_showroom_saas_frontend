import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UpdateCarBrand = ({ brandId, onUpdateSuccess }) => {
  const [brand, setBrand] = useState({ name: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get(`/api/car-brands/${brandId}`)
        setBrand(response.data)
      } catch (err) {
        setError('Failed to load brand data')
      } finally {
        setLoading(false)
      }
    }
    fetchBrand()
  }, [brandId])

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/car-brands/${brandId}`, brand)
      onUpdateSuccess && onUpdateSuccess()
      alert('Brand updated successfully!')
    } catch (err) {
      setError('Failed to update brand')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Car Brand</h2>
      <label>
        Brand Name:
        <input
          type="text"
          name="name"
          value={brand.name}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Update Brand</button>
    </form>
  )
}

export default UpdateCarBrand
