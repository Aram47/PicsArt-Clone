import InputField from "./InputField";

interface FormField {
  name: string;
  type: string;
  placeholder: string;
}

interface AuthFormProps {
  formFields: FormField[];
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
}

const AuthForm = ({
  formFields,
  formData,
  handleChange,
  handleSubmit,
  submitButtonText,
}: AuthFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map((field) => (
        <InputField
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default AuthForm;
