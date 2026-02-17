import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function CreatePostComponent() {
  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
    category_id: 1,
    status_id: 1,
  });

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ===== HANDLE INPUT =====
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== HANDLE FILE =====
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error("Please select image");
      return;
    }

    try {
      setIsLoading(true);

      //  ดึง token ที่เก็บตอน login
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not logged in");
        return;
      }

      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("content", post.content);
      formData.append("category_id", post.category_id);
      formData.append("status_id", post.status_id);
      formData.append("imageFile", imageFile);

      //  ยิงไป route ที่ถูกต้อง
      await axios.post(
        "http://localhost:4000/api/posts/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      

      toast.success("Post created successfully!");

      // reset form
      setPost({
        title: "",
        description: "",
        content: "",
        category_id: 1,
        status_id: 1,
      });

      setImageFile(null);

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        toast.error("Unauthorized - Please login again");
      } else if (err.response?.status === 403) {
        toast.error("Admin access required");
      } else {
        toast.error("Upload failed");
      }

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Create Post</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={post.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full border rounded-lg p-3"
          rows="3"
        />

        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="w-full border rounded-lg p-3"
          rows="6"
        />

        <div>
          <label className="block mb-2 font-medium">
            Thumbnail Image
          </label>

          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="mb-4 rounded-lg max-h-64"
            />
          )}

          <input type="file" onChange={handleFileChange} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80"
        >
          {isLoading ? "Saving..." : "Save Post"}
        </button>
      </div>
    </div>
  );
}
