export const checkValidData = (email, password) => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!isEmailValid) return "Email ID is not valid";
  if (password.length < 8) return "Password should have atleast 8 characters";
  const passwordNumber = /^(?=.*\d).{8,}$/.test(password);

  if (!passwordNumber) return "Password should contain atleast one digit";

  const passwordUpper = /^(?=.*[A-Z]).{8,}$/.test(password);
  if (!passwordUpper)
    return "Password should contain atleast one uppercase character";
  return null;
};

export const checkProfileName = (name, existingNames) => {
  if (!name) return "Please enter a name";
  if (existingNames?.includes(name)) return "Name already exists!";
  if (name.length > 30) return "Please enter name size less than 30";
  return null;
};
