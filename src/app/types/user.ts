type User = {
  id: string;
  email: string;
  password: string;
  registrationNumber: string;
  fieldOfStudy: string;
  year: number;
  role: "admin" | "user";
};
export default User;