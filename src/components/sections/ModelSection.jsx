import CreateModel from "../model/CreateModel";
import PublicModelList from "../model/PublicModelList";

export default function ModelSection({ canEdit, showCreate, refreshKey, onCreated }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <h2>Models</h2>
      {showCreate && <CreateModel onCreated={onCreated} />}
      <PublicModelList canEdit={canEdit} key={`model-${refreshKey}`} />
    </section>
  );
}
