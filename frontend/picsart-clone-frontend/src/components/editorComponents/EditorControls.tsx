import { Link } from "react-router-dom";

interface EditorControlsProps {
  onSave: () => void;
}

function EditorControls({ onSave }: EditorControlsProps) {
  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={onSave}
        className="w-1/2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Сохранить
      </button>
      <Link
        to="/editor"
        className="w-1/2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-center"
      >
        Отменить
      </Link>
    </div>
  );
}

export default EditorControls;
