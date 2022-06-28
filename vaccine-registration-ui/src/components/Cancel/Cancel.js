import { useState } from "react"
import { useNavigate, Link} from "react-router-dom"
import axios from "axios"
import MedicalResearch from "../MedicalResearch/MedicalResearch"
import "./Cancel.css"

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
    password: "",
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
    const res = await axios.post("http://localhost:3001/auth/cancel", {
        email: form.email,
        password: form.password
    })

    if (res?.data?.user) {
        setAppState(res.data)
        setIsLoading(false)
        navigate("/")
    } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with canceling your appointment" }))
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
    <h2>Cancel your appointment</h2>

    {errors.form && <span className="error">{errors.form}</span>}
    <br />

    <div className="form">
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
        {isLoading ? "Loading..." : "Cancel Appointment"}
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