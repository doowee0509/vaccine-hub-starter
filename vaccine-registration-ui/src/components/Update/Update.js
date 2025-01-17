import { useState } from "react"
import { useNavigate, Link} from "react-router-dom"
import axios from "axios"
import MedicalResearch from "../MedicalResearch/MedicalResearch"
import "./Update.css"

const locationOptions = [
{ key: 1, label: "Local Clinic", value: "local clinic" },
{ key: 2, label: "Regional Hospital", value: "regional hospital" },
{ key: 3, label: "Care Center", value: "care center" },
{ key: 4, label: "Department of Health", value: "department of health" },
]

export default function Signup({ setAppState }) {
const navigate = useNavigate()
const [isLoading, setIsLoading] = useState(false)
const [errors, setErrors] = useState({})
const [form, setForm] = useState({
    email: "",
    date: "",
    password: "",
    location: "Local Clinic",
})

const handleOnInputChange = (event) => {
if (event.target.name === "email") {
    if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
    } else {
        setErrors((e) => ({ ...e, email: null }))
    }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))

}

const handleOnSubmit = async () => {
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

try {
    const res = await axios.post("http://localhost:3001/auth/update", {
        date: form.date,
        location: form.location,
        email: form.email,
        password: form.password
    })

    if (res?.data?.user) {
        setAppState(res.data)
        setIsLoading(false)
        navigate("/portal")
    } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with updating your appointment" }))
        setIsLoading(false)
    }
} catch (err) {
    console.log(err)
    const message = err?.response?.data?.error?.message
    setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    setIsLoading(false)
}
}

return (
<div className="Register">
    <div className="media">
    <MedicalResearch width={555} />
    </div>
    <div className="card">
    <h2>Update your appointment</h2>

    {errors.form && <span className="error">{errors.form}</span>}
    <br />

    <div className="form">
        <div className="split-inputs">
        <div className="input-field">
            <label htmlFor="name">Select a date</label>
            <input type="date" name="date" value={form.date} onChange={handleOnInputChange} />
            {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="input-field">
            <label htmlFor="name">Select a location</label>
            <select name="location" onChange={(event) => setForm((f) => ({ ...f, location: event.target.value }))}>
            {locationOptions.map((location) => (
                <option key={location.key} value={location.label}>
                {location.label}
                </option>
            ))}
            </select>
            {errors.location && <span className="error">{errors.location}</span>}
        </div>
        </div>

        <br />

        <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            placeholder="jane@doe.io"
            value={form.email}
            onChange={handleOnInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleOnInputChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
        {isLoading ? "Loading..." : "Update Appointment"}
        </button>
    </div>
    <div className="footer">
        <p>
        Don't have an account? Click <Link to="/register">here</Link> to register
        </p>
    </div>
    </div>
</div>
)
}