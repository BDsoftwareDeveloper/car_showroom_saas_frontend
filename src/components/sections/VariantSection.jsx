import CreateVariant from "../variant/CreateVariant";
import PublicVariantList from "../variant/PublicVariantList";

export default function VariantSection({ canEdit, showCreate, refreshKey, onCreated }) {
  return (
    <section>
      <h2>Variants</h2>
      {showCreate && <CreateVariant onCreated={onCreated} />}
      <PublicVariantList canEdit={canEdit} key={`variant-${refreshKey}`} />
    </section>
  );
}
