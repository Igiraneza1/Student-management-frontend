export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }
  return response.json();
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  phone: string;
  course?: string;
  role: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};