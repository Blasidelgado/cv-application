import { useState } from 'react';
import { Input, TextArea } from './Input';
import { SectionDesc } from '../utils/SectionDesc.enum';

export type SectionIds =
  | SectionDesc.GeneralInformation
  | SectionDesc.EducationalExperience
  | SectionDesc.PracticalExperience;


declare interface SectionProps {
  id: SectionIds;
  isEditing: boolean;
  onEdit: (sectionId: SectionIds | null) => void;
  children?: React.ReactNode;
}

function Section({ id, isEditing, onEdit, children }: SectionProps) {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formDataObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value as string;
    });

    setInputValues(formDataObject);

    onEdit(null);
  }

  let fields: string[] = [];

  if (id === SectionDesc.GeneralInformation) {
    fields = ["Name", "Email", "Phone Number"];
  } else if (id === SectionDesc.EducationalExperience) {
    fields = ["School Name", "Title of Study", "Date of study"];
  } else if (id === SectionDesc.PracticalExperience) {
    fields = [
      "Company Name",
      "Position Title",
      "Main Responsabilities",
      "Date from worked",
      "Date until worked",
    ];
  }

  const inputFields = fields.map((field) => {
    if (field === "Main Responsabilities") {
      return (
        <TextArea
          key={field}
          name={field}
          placeholder={`Enter your ${field}`}
          value={inputValues[field]}
        />
      );
    }
    return (
      <Input
        key={field}
        type={field.startsWith("Date") ? "date" : "text"}
        name={field}
        placeholder={`Enter your ${field}`}
        value={inputValues[field]}
      />
    );
  });

  const paraFields = fields.map((field) => {
    return (
      <div key={field}>
        <h3>{field}:</h3>
        <p>{inputValues[field]}</p>
      </div>
    );
  });

  return (
    <section>
      {children}
      {isEditing ? (
        <form onSubmit={handleSave}>
          {inputFields}
          <button type="submit">Save changes</button>
        </form>
      ) : (
        <div>
          {paraFields}
          <button type="button" onClick={() => onEdit(id)}>
            Edit
          </button>
        </div>
      )}
    </section>
  );
}

export default Section;
