import { useState } from "react";
//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

interface FormErrors {
  firstName?: string;
  lastName?: string;
  plan?: string;
  gender?: string;
}

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // STEP: validate ข้อมูลทั้งหมด เมื่อกดปุ่ม Register
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (firstName.trim() === "") {
      newErrors.firstName = "Invalid first name";
    }
    if (lastName.trim() === "") {
      newErrors.lastName = "Invalid last name";
    }
    if (plan === "") {
      newErrors.plan = "Please select a Plan";
    }
    if (gender === "") {
      newErrors.gender = "Please select gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterClick = () => {
    const isValid = validateForm();
    if (isValid) {
      // TODO: ทำงานต่อเมื่อข้อมูลถูกต้อง (บันทึกข้อมูล / ปิด modal ฯลฯ)
      console.log("Form is valid, submitting...");
    }
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="d-flex gap-2">
              <div className="flex-fill">
                <label className="form-label">First name</label>
                <input
                  className={`form-control ${errors.firstName ? "is-invalid" : ""
                    }`}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    // STEP 1.2: ซ่อนข้อความแจ้งเตือนเมื่อมีการแก้ไข
                    if (errors.firstName) {
                      setErrors((prev) => ({
                        ...prev,
                        firstName: undefined,
                      }));
                    }
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback d-block">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="flex-fill">
                <label className="form-label">Last name</label>
                <input
                  className={`form-control ${errors.lastName ? "is-invalid" : ""
                    }`}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) {
                      setErrors((prev) => ({
                        ...prev,
                        lastName: undefined,
                      }));
                    }
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback d-block">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={`form-select ${errors.plan ? "is-invalid" : ""}`}
                value={plan}
                onChange={(e) => {
                  setPlan(e.target.value);
                  if (errors.plan) {
                    setErrors((prev) => ({ ...prev, plan: undefined }));
                  }
                }}
              >
                <option value="">Please select..</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({p.price.toLocaleString()} THB)
                  </option>
                ))}
              </select>
              {errors.plan && (
                <div className="invalid-feedback d-block">{errors.plan}</div>
              )}
            </div>

            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => {
                    setGender("male");
                    if (errors.gender) {
                      setErrors((prev) => ({ ...prev, gender: undefined }));
                    }
                  }}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => {
                    setGender("female");
                    if (errors.gender) {
                      setErrors((prev) => ({ ...prev, gender: undefined }));
                    }
                  }}
                />
                Female 👩
              </div>
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              {extraItems.map((item) => (
                <div key={item.id}>
                  <input className="me-2 form-check-input" type="checkbox" />
                  <label className="form-check-label">
                    {item.label} ({item.price} THB)
                  </label>
                </div>
              ))}
              {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
              <span className="text-success d-block">(20% Discounted)</span>
            </div>

            <div className="alert alert-primary mt-3" role="alert">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            <div>Total Payment : ... THB</div>
          </div>

          <div className="modal-footer">
            <div>
              <input className="me-2 form-check-input" type="checkbox" />I
              agree to the terms and conditions
            </div>
            <button
              className="btn btn-success my-2"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}