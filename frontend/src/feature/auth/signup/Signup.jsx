import StarBackground from '../../../components/StarBackground/StarBackground'
import PasswordToggle from '../../../components/PasswordToggle/PasswordToggle'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import '../Forms.css'
import { CircleX, Dot, Eye, EyeClosed } from 'lucide-react'
import { Link } from 'react-router-dom'
import Loading from '../../../components/Loading/Loading'

const Signup = () => {

  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})


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
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    if (errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete errors.general
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {};
    const usernameRegex = /^(?=.*\d)(?=.*_)[a-zA-Z][a-zA-Z0-9_]{2,19}$/
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    // --- Username ---
    if (!formData.username) {
      errors.username = "Signature Signature required";
    } else if (!usernameRegex.test(formData.username)) {
      errors.username = "Invalid Signature format, letter-number-underscore only"; // Keeps it short
    }

    // --- Email ---
    else if (!formData.email) {
      errors.email = "Cosmic Address required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Format: entity@nexus.com";
    }

    // --- Password ---
    else if (!formData.password) {
      errors.password = "Access Key required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Key security too weak"; // Much shorter than the list of requirements
    }

    // --- Confirm Password ---
    else if (formData.confirmPassword !== undefined && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Access Keys mismatch";
    }

    return errors;
  }

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword)
  }

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

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
            <h2 className="gradientText">Join Nexus</h2>
            <p>Create your Galactic Identity</p>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="inputGroup">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder='Stellar Signature (e.g. Orion_07)'
                autoComplete="off"
                required />
            </div>

            <div className="inputGroup">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Cosmic Address (e.g. orion@voyager.com)'
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

            <div className="inputGroup passwordGroup">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder='Validate Access Key...'
                className={showConfirmPassword ? "revealed-coordinates" : ""}
                required
              />
              <PasswordToggle value={showConfirmPassword ? <EyeClosed /> : <Eye />} onClick={handleConfirmPasswordToggle} />
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="errorMessage">
                <CircleX /> {errors[Object.keys(errors)[0]]}
              </div>
            )}

            <Button
              value={isSubmitting ? <>Signing... <Loading /></> : <>Sign up</>}
              style="primary"
              type="submit"

              disabled={isSubmitting}
            />
          </form>

          <div className="footer">
            <p>
              <Link to='/auth/login'>Return to Nexus</Link>
              <span><Dot /></span>
              <Link to='/auth/login'>Trouble signing up?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup