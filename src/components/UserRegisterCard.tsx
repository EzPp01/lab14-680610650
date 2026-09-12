import type { Registrant } from "../libs/Registrant";

interface Props {
  registrant: Registrant;
}

export default function UserRegisterCard({ registrant }: Props) {
  const genderDisplay =
    registrant.gender === "male" ? "👨 Male" : "👩 Female";

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1">{registrant.fullName}</h5>
          <div className="text-muted mb-2">
            {registrant.plan} · {genderDisplay}
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {registrant.extraItems.map((item, index) => (
              <span key={index} className="badge bg-light text-dark border">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="fw-bold">{registrant.total.toLocaleString()} THB</div>
      </div>
    </div>
  );
}