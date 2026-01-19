"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditTasks } from "@/components/edit-tasks/edit-tasks";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  List,
  Check,
  ArrowDownRight,
  Trash,
  ListCheck,
  SigmaIcon,
} from "lucide-react";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  task: string;
  done: boolean;
};

import { createTask, deleteTask, getTasks } from "@/src/service/tasks.service";
export default function Home() {
  const [listTasks, setListTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  async function handleGetTasks() {
    try {
      const tasks = await getTasks();

      if (!tasks) return;

      setListTasks(tasks);

      return tasks
    } catch (error) {
      toast.error("Erro ao buscar tarefas!");

      throw error;
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetTasks();
  }, []);

  async function handleCreateTask() {
    try {
      if (task.length === 0 || !task) return;

      await createTask(task);

      setTask("");

    toast.success("Tarefa criada com sucesso!");

    await handleGetTasks();

    } catch (error) {
      
      toast.error("Erro ao criar tarefa!");

      throw error;
    }
  }

  async function handleDeleteTask(id: string) {
    try {

      await deleteTask(id);

      toast.warning("Tarefa deletada com sucesso!");

      await handleGetTasks();
    } catch (error) {
      toast.error("Erro ao deletar tarefa!");
      throw error;
    }
  }

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar Tarefa"
            onChange={(e) => setTask(e.target.value)}

            value={task}
          />
          <Button
            className="cursor-pointer"
            variant="default"
            onClick={handleCreateTask}
          >
            <Plus />
            Adicionar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-2" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <ArrowDownRight /> Não Finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              Concluidas
            </Badge>
          </div>
          <div className="mt-4 border-b">
            {listTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center h-12"
              >
                <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">{task.task}</p>
                <div className="flex items-center gap-2">
                  <EditTasks task={task} />
                  <Trash
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs"> Tarefas Concluidas</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant="outline"
                >
                  <Trash /> Limpar Tarefas Concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x tarefas?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Sim</AlertDialogAction>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "50%" }}
            ></div>
          </div>

          <div className="flex justify-end items-center gap-2 mt-2">
            <SigmaIcon size={18} />
            <p className="text-xs">3 tarefas concluidas</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
