export const buildCarPayload = (fields) => ({
  ...fields,
  variant_id: fields.variant_id === "" ? null : Number(fields.variant_id),
  brand_id: Number(fields.brand_id),
  car_model_id: fields.car_model_id === "" ? null : Number(fields.car_model_id),
  production_year: fields.production_year === "" ? undefined : Number(fields.production_year),
  price: fields.price === "" ? undefined : Number(fields.price),
  stock: fields.stock === "" ? undefined : Number(fields.stock),
});
