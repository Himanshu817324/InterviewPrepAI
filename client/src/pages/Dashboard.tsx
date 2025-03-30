import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaClipboardList,
  FaRobot,
  FaCheckCircle,
  FaBookOpen,
  FaHistory,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name || "User"}! 👋
        </h1>
        <p className="mt-2 text-lg">
          Let's get you ready for your next big opportunity.
        </p>
      </header>

      <div className="max-w-6xl mx-auto py-10 px-5">
        {/* Progress Overview */}
        <section className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaChartBar className="text-blue-600 mr-2" /> Your Progress
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ProgressCard
              title="Mock Interviews"
              value="4/10 Completed"
              percentage={40}
            />
            <ProgressCard
              title="Coding Challenges"
              value="12/20 Solved"
              percentage={60}
            />
            <ProgressCard
              title="AI Feedback Score"
              value="85%"
              percentage={85}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <ActionCard
            icon={<FaRobot className="text-4xl text-blue-600" />}
            title="Start a Mock Interview"
            link="/interview"
          />
          <ActionCard
            icon={<FaClipboardList className="text-4xl text-green-600" />}
            title="Take a Coding Challenge"
            link="/challenges"
          />
          <ActionCard
            icon={<FaBookOpen className="text-4xl text-yellow-600" />}
            title="View Study Resources"
            link="/resources"
          />
        </section>

        {/* Upcoming Interviews */}
        <section className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaCheckCircle className="text-blue-600 mr-2" /> Upcoming Interviews
          </h2>
          <div className="space-y-4">
            <UpcomingInterview
              company="Google"
              date="March 10, 2025"
              type="Technical Round"
            />
            <UpcomingInterview
              company="Amazon"
              date="March 15, 2025"
              type="Behavioral Round"
            />
            <UpcomingInterview
              company="Microsoft"
              date="March 20, 2025"
              type="System Design Round"
            />
          </div>
        </section>

        {/* AI Insights & Recommendations */}
        <section className="bg-gray-50 shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">
            🔍 AI Insights & Recommendations
          </h2>
          <p className="text-gray-700">
            Based on your recent mock interviews, we recommend focusing on
            **Dynamic Programming** and **Behavioral Responses**.
          </p>
          <Link
            to="/recommendations"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            View Recommendations
          </Link>
        </section>

        {/* Interview History */}
        <section className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaHistory className="text-gray-600 mr-2" /> Interview History
          </h2>
          <div className="space-y-4">
            <InterviewHistory
              company="Facebook"
              score="85%"
              date="Feb 20, 2025"
            />
            <InterviewHistory
              company="Netflix"
              score="78%"
              date="Feb 10, 2025"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

// Progress Card Component
const ProgressCard = ({
  title,
  value,
  percentage,
}: {
  title: string;
  value: string;
  percentage: number;
}) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{value}</p>
      <div className="w-full bg-gray-300 h-2 mt-2 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Quick Action Card Component
const ActionCard = ({
  icon,
  title,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
}) => {
  return (
    <Link
      to={link}
      className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center transition hover:shadow-lg"
    >
      {icon}
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
    </Link>
  );
};

// Upcoming Interview Component
const UpcomingInterview = ({
  company,
  date,
  type,
}: {
  company: string;
  date: string;
  type: string;
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{company}</h3>
        <p className="text-sm text-gray-600">{type}</p>
      </div>
      <span className="text-sm font-semibold bg-blue-500 text-white px-3 py-1 rounded">
        {date}
      </span>
    </div>
  );
};

// Interview History Component
const InterviewHistory = ({
  company,
  score,
  date,
}: {
  company: string;
  score: string;
  date: string;
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{company}</h3>
        <p className="text-sm text-gray-600">Score: {score}</p>
      </div>
      <span className="text-sm font-semibold bg-gray-500 text-white px-3 py-1 rounded">
        {date}
      </span>
    </div>
  );
};

export default Dashboard;
