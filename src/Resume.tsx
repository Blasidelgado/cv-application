import { useState } from "react";
import "./App.css";

enum SectionDesc {
  GeneralInformation = 1,
  EducationalExperience = 2,
  PracticalExperience = 3,
}

type SectionIds =
  | SectionDesc.GeneralInformation
  | SectionDesc.EducationalExperience
  | SectionDesc.PracticalExperience;

declare interface SectionProps {
  id: SectionIds;
  isEditing: boolean;
  onEdit: (sectionId: SectionIds | null) => void;
  children?: React.ReactNode;
}

declare interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
}

function Resume() {
  const [editingId, setEditingId] = useState<SectionIds | null>(null);

  function handleEdit(sectionId: SectionIds | null) {
    setEditingId(sectionId);
  }

  return (
    <main>
      {/* Name, email and phone number. */}
      <Section
        id={SectionDesc.GeneralInformation}
        isEditing={editingId === SectionDesc.GeneralInformation}
        onEdit={handleEdit}
      >
        <h2>General information</h2>
      </Section>
      <Section
        id={SectionDesc.EducationalExperience}
        isEditing={editingId === SectionDesc.EducationalExperience}
        onEdit={handleEdit}
      >
        {/* school name, title of study and date of study */}
        <h2>Educational Experience</h2>
      </Section>
      <Section
        id={SectionDesc.PracticalExperience}
        isEditing={editingId === SectionDesc.PracticalExperience}
        onEdit={handleEdit}
      >
        {/* company name, position title, main responsibilities of your jobs, date from and until when you worked for that company*/}
        <h2>Practical Experience</h2>
      </Section>
    </main>
  );
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
        <TextArea key={field} name={field} placeholder={`Enter your ${field}`} value={inputValues[field]} />
      )
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
    )
  });

  return (
    <section>
      {children}
      {isEditing ? (
        <form
          onSubmit={handleSave}
        >
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

function Input({ type, name, placeholder, value }: InputProps) {
  const [text, setText] = useState(value);

  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <br />
      <input id={name} name={name} type={type} placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
}

function TextArea({name, placeholder, value }: Partial<InputProps>) {
  const [text, setText] = useState(value);

  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <br />
      <textarea id={name} name={name} placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} />
    </div>
  );

}

export default Resume;
