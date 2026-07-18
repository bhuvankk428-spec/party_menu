// Simulated database of users using localStorage
const getUsers = () => {
  const users = localStorage.getItem("party_menu_users");
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem("party_menu_users", JSON.stringify(users));
};

export const registerUser = async (userData) => {
  // Simulate network latency slightly
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getUsers();
  const exists = users.find((u) => u.email === userData.email);

  if (exists) {
    throw new Error("User already exists!");
  }

  const newUser = {
    id: String(Date.now()),
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };

  users.push(newUser);
  saveUsers(users);

  return {
    token: "dummy-token-" + newUser.id,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  };
};

export const loginUser = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Default hardcoded admin user for convenience
  if (email === "admin@example.com" && password === "admin123") {
    return {
      token: "dummy-token-admin",
      user: {
        id: "admin",
        name: "Admin User",
        email: "admin@example.com",
      },
    };
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  return {
    token: "dummy-token-" + user.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getCurrentUser = async () => {
  // Return current user based on stored token
  const token = localStorage.getItem("party_menu_token");
  if (!token) return null;

  const users = getUsers();
  const userId = token.replace("dummy-token-", "");

  if (userId === "admin") {
    return {
      id: "admin",
      name: "Admin User",
      email: "admin@example.com",
    };
  }

  const user = users.find((u) => u.id === userId);
  return user ? { id: user.id, name: user.name, email: user.email } : null;
};