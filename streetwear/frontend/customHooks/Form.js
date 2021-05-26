import { useState } from "react";

export const useForm = (initial = {}) => {
  //  create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // we have a little problem with price because even if it is a number, state recognize as a string

  const handleChange = (e, base64 = "") => {
    let { value, name, type } = e.target;
    // we have a little problem with price because even if it is a number, state recognize as a string
    if (type === "number") {
      value = +value;
    }
    if (type === "file") {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );
    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};
