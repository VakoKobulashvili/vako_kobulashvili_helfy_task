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

export const editTask = async (id, payload) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error while updating task!");
  }

  const data = await response.json();
  return data.task;
};

export const toggleTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error while toggling task!");
  }

  const data = await response.json();
  return data.task;
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error while deleting task!");
  }

  return true;
};
