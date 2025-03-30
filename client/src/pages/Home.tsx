import { Link } from "react-router-dom";
import {
  FaRobot,
  FaCode,
  FaUserGraduate,
  FaQuestionCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Ace Your Next Interview
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Master technical and behavioral interviews with AI-powered mock
          interviews, real-time coding challenges, and expert guidance.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaRobot className="text-5xl text-blue-600" />}
            title="AI-Powered Mock Interviews"
            description="Practice with AI-generated interview questions tailored to your skills."
          />
          <FeatureCard
            icon={<FaCode className="text-5xl text-blue-600" />}
            title="Live Coding Challenges"
            description="Solve coding problems in real-time and get instant feedback."
          />
          <FeatureCard
            icon={<FaUserGraduate className="text-5xl text-blue-600" />}
            title="Personalized Learning"
            description="Get insights on your weak areas and improve your chances of success."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <StepCard
            step="1"
            title="Sign Up"
            description="Create a free account and set up your profile."
          />
          <StepCard
            step="2"
            title="Practice"
            description="Take AI-generated mock interviews and coding tests."
          />
          <StepCard
            step="3"
            title="Get Feedback"
            description="Receive instant insights to improve your skills."
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Testimonial
            name="Sarah Johnson"
            role="Software Engineer at Google"
            text="This platform helped me refine my technical interview skills. The AI mock interviews are game-changing!"
          />
          <Testimonial
            name="Mark Thompson"
            role="Frontend Developer at Microsoft"
            text="The coding challenges prepared me perfectly for my interviews. Highly recommended!"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <FAQ
          question="Is this platform free to use?"
          answer="Yes! We offer free and premium plans based on your needs."
        />
        <FAQ
          question="What topics are covered in the coding challenges?"
          answer="We cover data structures, algorithms, system design, and more."
        />
        <FAQ
          question="Can I get personalized feedback?"
          answer="Yes! Our AI system provides detailed insights and improvement suggestions."
        />
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-3 text-lg">
          Join thousands of candidates who have aced their interviews.
        </p>
        <Link
          to="/register"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-lg font-semibold">
          &copy; 2025 Interview Prep AI. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <div className="flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

// Step Card Component
const StepCard = ({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h4 className="text-2xl font-bold text-blue-600">{`Step ${step}`}</h4>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <p className="italic text-gray-700">"{text}"</p>
      <h4 className="text-lg font-bold mt-4">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
};

// FAQ Component
const FAQ = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg my-4">
      <h3 className="text-lg font-semibold flex items-center">
        <FaQuestionCircle className="mr-2 text-blue-600" /> {question}
      </h3>
      <p className="text-gray-600 mt-2 flex items-center">
        <FaCheckCircle className="mr-2 text-green-600" /> {answer}
      </p>
    </div>
  );
};

export default Home;
