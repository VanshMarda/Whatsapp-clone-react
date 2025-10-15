import { memo } from "react";

type ModalProps = {
  title: string;
  label?: string;
  placeholder?: string;
  inputType: "text" | "textarea" | "none";
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitButtonText: string;
  submitButtonDisabled?: boolean;
};

const Modal = ({
  title,
  label,
  placeholder,
  inputType,
  value,
  onChange,
  onSubmit,
  onCancel,
  submitButtonText,
  submitButtonDisabled = false,
}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {label}
            </label>
            {inputType === "text" ? (
              <input
                type="text"
                id="input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                placeholder={placeholder}
                autoFocus
              />
            ) : inputType === "none" ? (
              <></>
            ) : (
              <textarea
                id="input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 resize-none"
                placeholder={placeholder}
                rows={4}
                autoFocus
              />
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitButtonDisabled}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Modal);
