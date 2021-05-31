import { useState, useEffect } from 'react';

export const useForm = (initial = {}) => {
  //  create a state object for our inputs
  const [inputs, setInputs] = useState({});
  const initialValues = Object.values(initial).join('');

  // i used useeffect becuase initial data in useForm will take the undefined value when we update another product
  // if we put just [initial] in dependencies will cause an infinite loop
  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  // we have a little problem with price because even if it is a number, state recognize as a string

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    // we have a little problem with price because even if it is a number, state recognize as a string
    if (type === 'number') {
      value = +value;
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });

    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
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
