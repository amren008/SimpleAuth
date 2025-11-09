const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">SimpleAuth</h1>
          <p className="text-xl text-gray-600 mb-4">
            A Modern Full-Stack Authentication System
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="Secure Authentication"
            description="JWT-based authentication with httpOnly cookies and secure password hashing using bcrypt"
            icon="🔐"
          />
          <FeatureCard
            title="Input Validation"
            description="Server-side validation using Zod schema validation for robust data integrity"
            icon="✓"
          />
          <FeatureCard
            title="PostgreSQL Database"
            description="Reliable data storage with PostgreSQL running in Docker containers"
            icon="🗄️"
          />
          <FeatureCard
            title="Modern Tech Stack"
            description="Built with React, TypeScript, Express.js, and Tailwind CSS"
            icon="⚡"
          />
          <FeatureCard
            title="Protected Routes"
            description="Client-side route protection ensuring secure access to authorized pages"
            icon="🛡️"
          />
          <FeatureCard
            title="Type Safety"
            description="Full TypeScript implementation for both frontend and backend"
            icon="📝"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default Home;
