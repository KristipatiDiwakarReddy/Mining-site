// src/AdminPage.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AdminPage = () => {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "site_content", "content");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data());
      } else {
        alert("Content document does not exist");
      }
    };

    fetchContent();
  }, []);

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "site_content", "content"), content);
      alert("Content updated successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    }
    setSaving(false);
  };

  if (!content) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: "0 auto" }}>
      <h1>Admin Page - Edit Site Content</h1>
      {Object.entries(content).map(([sectionKey, sectionValue]) => (
        <div key={sectionKey} style={{ marginBottom: 40 }}>
          <h2>{sectionValue.heading || sectionKey}</h2>
          {Object.entries(sectionValue).map(([field, value]) => (
            <div key={field} style={{ marginBottom: 10 }}>
              <label style={{ fontWeight: "bold" }}>{field}</label>
              <br />
              <textarea
                rows={field === "imageUrls" ? 3 : 2}
                style={{ width: "100%", padding: 8 }}
                value={Array.isArray(value) ? value.join("\n") : value}
                onChange={e =>
                  handleChange(
                    sectionKey,
                    field,
                    field === "imageUrls"
                      ? e.target.value.split("\n").filter(x => x.trim() !== "")
                      : e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={saveContent} disabled={saving} style={{ padding: "10px 20px", fontSize: 16 }}>
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AdminPage;
