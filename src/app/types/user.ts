export default interface User {
  _id: string;
  name: string;
  email: string;
  course: string;
  enrollmentYear: string;
  role: "user" | "admin";
  status: "Active" | "Graduated" | "Dropped";
}
