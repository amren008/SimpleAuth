import { useState } from "react";

const About = () => {
  const [activeSection, setActiveSection] = useState("technologies");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <div className="flex">
        {/* Side Navigation - VS Code inspired */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#f3f3f3] border-r border-[#e5e5e5] overflow-y-auto">
          <div className="py-6">
            <div className="px-4 mb-4">
              <h2 className="text-sm font-semibold text-[#616161] uppercase tracking-wider">
                Explorer
              </h2>
            </div>
            <nav className="space-y-1">
              <SideNavItem
                id="technologies"
                label="Technologies Used"
                icon="📦"
                active={activeSection === "technologies"}
                onClick={() => handleSectionChange("technologies")}
              />
              <SideNavItem
                id="architecture"
                label="Project Architecture"
                icon="🏗️"
                active={activeSection === "architecture"}
                onClick={() => handleSectionChange("architecture")}
              />
              <SideNavItem
                id="endpoints"
                label="API Endpoints"
                icon="🔌"
                active={activeSection === "endpoints"}
                onClick={() => handleSectionChange("endpoints")}
              />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Technologies Section */}
            {activeSection === "technologies" && (
              <div className="bg-white p-10 shadow-sm">
                <h2 className="text-3xl font-bold text-[#1e1e1e] mb-8">
                  Technologies Used
                </h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e1e1e] mb-6 pb-3 border-b-2 border-[#007acc]">
                      Frontend
                    </h3>
                    <div className="space-y-5">
                      <TechItem
                        icon="⚛️"
                        name="React 18"
                        description="Modern UI library with hooks and functional components"
                      />
                      <TechItem
                        icon="📘"
                        name="TypeScript"
                        description="Type-safe JavaScript for better developer experience"
                      />
                      <TechItem
                        icon="🔀"
                        name="React Router"
                        description="Client-side routing with protected route implementation"
                      />
                      <TechItem
                        icon="🔄"
                        name="TanStack Query"
                        description="Powerful data fetching and state management"
                      />
                      <TechItem
                        icon="🎨"
                        name="Tailwind CSS"
                        description="Utility-first CSS framework for rapid UI development"
                      />
                      <TechItem
                        icon="⚡"
                        name="Vite"
                        description="Lightning-fast build tool with HMR"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e1e1e] mb-6 pb-3 border-b-2 border-[#007acc]">
                      Backend
                    </h3>
                    <div className="space-y-5">
                      <TechItem
                        icon="🟢"
                        name="Node.js & Express"
                        description="Fast, minimalist web framework for building RESTful APIs"
                      />
                      <TechItem
                        icon="📘"
                        name="TypeScript"
                        description="End-to-end type safety across the entire stack"
                      />
                      <TechItem
                        icon="🐘"
                        name="PostgreSQL"
                        description="Robust relational database with ACID compliance"
                      />
                      <TechItem
                        icon="🔑"
                        name="JWT (jsonwebtoken)"
                        description="Secure token-based authentication mechanism"
                      />
                      <TechItem
                        icon="🔒"
                        name="Bcrypt"
                        description="Industry-standard password hashing algorithm"
                      />
                      <TechItem
                        icon="✅"
                        name="Zod"
                        description="TypeScript-first schema validation library"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Architecture Section */}
            {activeSection === "architecture" && (
              <div className="bg-white p-10 shadow-sm">
                <h2 className="text-3xl font-bold text-[#1e1e1e] mb-8">
                  Project Architecture
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-[#f8f8f8] p-6 border-l-4 border-[#007acc]">
                    <h4 className="font-semibold text-lg mb-4 text-[#1e1e1e]">
                      Frontend Structure
                    </h4>
                    <ul className="space-y-2 text-[#616161] text-sm">
                      <li>• Component-based architecture</li>
                      <li>• Custom hooks for auth logic</li>
                      <li>• Separated style files</li>
                      <li>• Protected route wrapper</li>
                      <li>• API layer abstraction</li>
                    </ul>
                  </div>
                  <div className="bg-[#f8f8f8] p-6 border-l-4 border-[#007acc]">
                    <h4 className="font-semibold text-lg mb-4 text-[#1e1e1e]">
                      Backend Structure
                    </h4>
                    <ul className="space-y-2 text-[#616161] text-sm">
                      <li>• MVC pattern</li>
                      <li>• Middleware-based validation</li>
                      <li>• Centralized error handling</li>
                      <li>• Database connection pooling</li>
                      <li>• Environment-based config</li>
                    </ul>
                  </div>
                  <div className="bg-[#f8f8f8] p-6 border-l-4 border-[#007acc]">
                    <h4 className="font-semibold text-lg mb-4 text-[#1e1e1e]">
                      DevOps & Tools
                    </h4>
                    <ul className="space-y-2 text-[#616161] text-sm">
                      <li>• Docker containerization</li>
                      <li>• PostgreSQL 16 in Docker</li>
                      <li>• Hot Module Replacement</li>
                      <li>• Environment variables</li>
                      <li>• CORS configuration</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* API Endpoints Section */}
            {activeSection === "endpoints" && (
              <div className="bg-white p-10 shadow-sm">
                <h2 className="text-3xl font-bold text-[#1e1e1e] mb-8">
                  API Endpoints
                </h2>
                <div className="space-y-4">
                  <ApiEndpoint
                    method="POST"
                    path="/api/auth/signup"
                    description="Register a new user account"
                  />
                  <ApiEndpoint
                    method="POST"
                    path="/api/auth/login"
                    description="Authenticate user and receive JWT token"
                  />
                  <ApiEndpoint
                    method="POST"
                    path="/api/auth/logout"
                    description="Clear authentication cookie"
                  />
                  <ApiEndpoint
                    method="GET"
                    path="/api/auth/me"
                    description="Get current authenticated user details (Protected)"
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

interface TechItemProps {
  icon: string;
  name: string;
  description: string;
}

const TechItem = ({ icon, name, description }: TechItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <span className="text-3xl flex-shrink-0">{icon}</span>
      <div>
        <h4 className="font-semibold text-[#1e1e1e] mb-1 text-base">{name}</h4>
        <p className="text-[#616161] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

interface ApiEndpointProps {
  method: string;
  path: string;
  description: string;
}

const ApiEndpoint = ({ method, path, description }: ApiEndpointProps) => {
  const methodColors: Record<string, string> = {
    GET: "bg-green-100 text-green-800 border-green-300",
    POST: "bg-blue-100 text-blue-800 border-blue-300",
    PUT: "bg-yellow-100 text-yellow-800 border-yellow-300",
    DELETE: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="flex items-center gap-4 p-4 border-2 border-gray-200 hover:border-[#007acc] transition-colors bg-[#f8f8f8]">
      <span
        className={`px-3 py-1.5 text-xs font-bold border ${methodColors[method]}`}
      >
        {method}
      </span>
      <code className="text-sm font-mono text-[#1e1e1e] flex-1">{path}</code>
      <p className="text-sm text-[#616161] hidden lg:block">{description}</p>
    </div>
  );
};

interface SideNavItemProps {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

const SideNavItem = ({ label, icon, active, onClick }: SideNavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
        active
          ? "bg-[#e5e5e5] text-[#1e1e1e] border-l-2 border-[#007acc]"
          : "text-[#616161] hover:bg-[#e8e8e8]"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default About;
