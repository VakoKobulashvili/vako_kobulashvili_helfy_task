const API_BASE_URL = "http://localhost:4000/api";

export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error while fetching tasks data!");
  }

  const data = await response.json();
  return data;
};

export const createTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Error while creating task!");
  }

  const data = await response.json();
  return data;
};
