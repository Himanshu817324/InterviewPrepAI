import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePic: user?.profilePic || ("" as string | File),
  });

  const [preview, setPreview] = useState<string | null>(
    typeof formData.profilePic === "string" ? formData.profilePic : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files?.length) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, profilePic: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let profilePicUrl = formData.profilePic;
      if (formData.profilePic instanceof File) {
        profilePicUrl = await convertFileToBase64(formData.profilePic);
      }

      const updatedData = {
        name: formData.name,
        email: formData.email,
        profilePic: profilePicUrl as string,
      };

      await updateProfile(updatedData);
      alert("Profile updated successfully!");
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center bg-gray-100 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-gray-700 mb-6 text-center">
          Edit Profile
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Profile Picture
            </label>
            {preview && (
              <motion.img
                src={preview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border border-gray-300 mb-3 mx-auto shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-4 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center font-semibold text-lg"
            disabled={loading}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                🔄
              </motion.span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditProfile;
