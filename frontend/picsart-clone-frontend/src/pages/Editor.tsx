import { useState } from "react";
import CanvasArea from "../components/editorComponents/CanvasArea";
import ImageUpload from "../components/editorComponents/ImageUpload";
import EditorHeader from "../components/editorComponents/EditorHeader";
import EditorControls from "../components/editorComponents/EditorControls";
import ImagePreview from "../components/editorComponents/ImagePreview";
import React from "react";

function Editor() {
  const [image, setImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Изображение сохранено!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-md">
        <EditorHeader />

        {!isEditing && <ImageUpload onImageUpload={handleImageUpload} />}

        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Редактор</h2>
            <CanvasArea image={image} />
          </div>
        </div>

        {isEditing && image && <ImagePreview image={image} />}
        <EditorControls onSave={handleSave} />
      </div>
    </div>
  );
}

export default Editor;
