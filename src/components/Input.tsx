import { useState } from "react";

declare interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
}

export function Input({ type, name, placeholder, value }: InputProps) {
  const [text, setText] = useState(value);

  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <br />
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export function TextArea({ name, placeholder, value }: Partial<InputProps>) {
  const [text, setText] = useState(value);

  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <br />
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
