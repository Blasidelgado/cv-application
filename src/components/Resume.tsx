import { useState } from "react";
import Section, { SectionDesc, SectionIds } from "./Section";

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

export default Resume;
