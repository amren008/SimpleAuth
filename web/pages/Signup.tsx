import { useState } from "react";
import { authStyles as styles } from "../styles/auth.styles";
import { useSignup } from "../src/hooks/useAuth";

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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending, error } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(formData);
  };

  const generateRandomData = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const randomData = {
      name: `User ${randomNum}`,
      username: `user${randomNum}`,
      email: `user${randomNum}@test.com`,
      password: `password${randomNum}`,
    };

    setFormData(randomData);
    localStorage.setItem("lastGeneratedCredentials", JSON.stringify({
      email: randomData.email,
      password: randomData.password,
    }));
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
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${
                getFieldError("name")
                  ? styles.inputError
                  : styles.inputBase
              }`}
              placeholder="John Doe"
            />

            {getFieldError("name") && (
              <p className={styles.errorText}>{getFieldError("name")}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${
                getFieldError("username")
                  ? styles.inputError
                  : styles.inputBase
              }`}
              placeholder="johndoe"
            />
            {getFieldError("username") && (
              <p className={styles.errorText}>
                {getFieldError("username")}
              </p>
            )}
          </div>

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
                getFieldError("email")
                  ? styles.inputError
                  : styles.inputBase
              }`}
              placeholder="john@example.com"
            />
            {getFieldError("email") && (
              <p className={styles.errorText}>{getFieldError("email")}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${
                getFieldError("password")
                  ? styles.inputError
                  : styles.inputBase
              }`}
              placeholder="Enter your password"
            />
            {getFieldError("password") && (
              <p className={styles.errorText}>
                {getFieldError("password")}
              </p>
            )}
          </div>
          {generalError && (
            <div className={styles.errorBox}>
              <p className={styles.errorBoxText}>{generalError}</p>
            </div>
          )}

          <button
            type="button"
            onClick={generateRandomData}
            className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Random Data
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" className={styles.linkBold}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
