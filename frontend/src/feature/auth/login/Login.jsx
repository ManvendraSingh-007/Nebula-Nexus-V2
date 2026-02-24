import StarBackground from "../../../components/StarBackground/StarBackground"
import PasswordToggle from "../../../components/Gylph/GylphTrigger"
import Button from "../../../components/Button/Button"
import { CircleX } from 'lucide-react';
import { useState } from "react"
import './Login.css'

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
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
      setErrors({})
    }

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Cosmic Address is required";
    }

    if (!formData.password) {
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
      const response = await fetch('https://webhook.site/de559f6a-f2a3-4bcb-941d-996c54e036e1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(formData)
      })
    } catch (error) {
      setErrors({ email: "Network error. Is the server down?" });
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

            <div className="inputGroup">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Forge Access Key...'
                className={showPassword ? "revealed-coordinates" : ""}
                required
              />
            </div>

            <PasswordToggle
              value={showPassword ? '← Hide Coordinates' : '→ Show Coordinates'}
              type="button"
              onClick={handlePasswordToggle}
            />

            {Object.keys(errors).length > 0 && (
              <div className="errorMessage">
                <CircleX /> {errors[Object.keys(errors)[0]]}
              </div>
            )}

            <Button
              value={isSubmitting ? 'Logging In...' : 'Log In'}
              style="primary"
              type="submit"

              disabled={isSubmitting}
            />
          </form>

          <div className="footer">
            <p>Forgot Access Key? <a href="#reset">Reset here</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login