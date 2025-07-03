import CreateBrand from "../brand/CreateBrand";
import PublicBrandList from "../brand/PublicBrandList";

export default function BrandSection({ canEdit, showCreate, refreshKey, onCreated }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2>Brands</h2>
      {showCreate && <CreateBrand onCreated={onCreated} />}
      <PublicBrandList canEdit={canEdit} key={`brand-${refreshKey}`} />
    </section>
  );
}
