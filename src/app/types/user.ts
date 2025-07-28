type User = {
  id: string;
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  role: "admin" | "user";
};
export default User;