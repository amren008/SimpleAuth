import { useState } from "react";
import { useLogin } from "../src/hooks/useAuth";
import { authStyles as styles } from "../styles/auth.styles";

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      errors?: ValidationError[];
    };
  };
  message?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { mutate: login, isPending, error } = useLogin();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  const fillLastGeneratedData = () => {
    const savedCredentials = localStorage.getItem("lastGeneratedCredentials");
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      setFormData({
        email: credentials.email,
        password: credentials.password,
      });
    }
  };

  const getFieldError = (field: string): string | null => {
    if (error && typeof error === 'object' && 'message' in error) {
      const err = error as ErrorResponse;
      if (err.response?.data?.errors) {
        const fieldError = err.response.data.errors.find(
          (e: ValidationError) => e.field === field
        );
        return fieldError?.message || null;
      }
    }
    return null;
  };

  const generalError =
    error && typeof error === 'object' && 'message' in error
      ? (error as ErrorResponse).response?.data?.message || (error as ErrorResponse).message
      : null;
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${
                getFieldError("email") ? styles.inputError : ""
              } `}
            />
            {getFieldError("email") && (
              <p className={styles.errorText}>{getFieldError("email")}</p>
            )}
          </div>

          <div>
            <div className={styles.labelRow}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a href="/ForgotPassword" className={styles.link}>
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${
                getFieldError("password") ? styles.inputError : ""
              }`}
              placeholder="Enter your password"
            />
            {getFieldError("password") && (
              <p className={styles.errorText}>{getFieldError("password")}</p>
            )}
          </div>
          {generalError && (
            <div className={styles.errorBox}>
              <p className={styles.errorBoxText}>{generalError}</p>
            </div>
          )}

          <button
            type="button"
            onClick={fillLastGeneratedData}
            className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Use Last Data
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have an account?{" "}
            <a href="/signup" className={styles.linkBold}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
