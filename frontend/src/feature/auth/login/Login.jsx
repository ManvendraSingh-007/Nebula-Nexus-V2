import StarBackground from "../../../components/StarBackground/StarBackground"
import PasswordToggle from "../../../components/PasswordToggle/PasswordToggle"
import Loading from "../../../components/Loading/Loading";
import Button from "../../../components/Button/Button"
import { CircleX, Dot, Eye, EyeClosed, MoveRight } from 'lucide-react';
import { useState } from "react"
import '../Forms.css'
import { Link } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
    console.log('clicked');
    
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => (
      {
        ...prev,
        [name]: value
      }
    ))

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.general
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!formData.email) {
      errors.email = "Cosmic Address is required";
    }
    else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid Cosmic Address"
    }
    else if (!formData.password) {
      errors.password = "Access Key is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validatedForm = validateForm()
    if (Object.keys(validatedForm).length > 0) {
      setErrors(validatedForm)
      return
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(formData)
      })
    } catch (error) {
      setErrors({ general: "Network error. Is the server down?" });
      console.log('Request failed');

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <StarBackground />
      <div className="pageContainer">
        <div className="formContainer">


          <div className="formText">
            <h2 className="gradientText">Welcome Back</h2>
            <p>Return To Nexus</p>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="inputGroup">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Cosmic Address'
                autoComplete="off"
                required />
            </div>

            <div className="inputGroup passwordGroup">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Forge Access Key...'
                className={showPassword ? "revealed-coordinates" : ""}
                required
              />
              <PasswordToggle value={showPassword ? <EyeClosed /> : <Eye />} onClick={handlePasswordToggle} />
            </div>


            {Object.keys(errors).length > 0 && (
              <div className="errorMessage">
                <CircleX /> {errors[Object.keys(errors)[0]]}
              </div>
            )}

            <Button
              value={isSubmitting ? <>Loading... <Loading /></> : <>Log in</>}
              style="primary"
              type="submit"

              disabled={isSubmitting}
            />
          </form>

          <div className="footer">
            <p>
              <Link to='/auth/reset'>Lost your key?</Link>
              <span><Dot /></span>
              <Link to='/auth/signup'>New To Nexus?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login