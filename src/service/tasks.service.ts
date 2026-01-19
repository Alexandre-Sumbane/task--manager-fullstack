import api from "./api";

export const getTasks = async () => {
  try {
    const { data } = await api.get("/tasks");

    return data.tasks;
  } catch (error) {

    throw error;
  }
};

export const createTask = async (task: string) => {
  try {

    if(!task) return;

    const { data } = await api.post("/tasks", { task });

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: string, task: string) => {
  try {
    const { data } = await api.put(`/tasks/${id}`, { task });

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {

    if(!id) return;

   const deletedTask = await api.delete(`/tasks/${id}`);

    return deletedTask;

  } catch (error) {
    throw error;
  }
};
