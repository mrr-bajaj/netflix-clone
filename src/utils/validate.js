export const checkValidData = (email, password) => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};

export const checkProfileName = (name, existingNames) => {
  if (!name) return "Please enter a name";
  if (existingNames?.includes(name)) return "Name already exists!";
  if (name.length > 30) return "Please enter name size less than 30";
  return null;
};
