import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateTask } from "@/src/service/tasks.service";
import { useState } from "react";

type Task = {
  id: string;
  task: string;
  done: boolean;
};

type EditTasksProps = {
  task: Task;
};

export function EditTasks({task}: EditTasksProps) {
  const [data, setData] = useState(task);
  const [open, setOpen] = useState(false);

  async function handleEditTasks() {

     const taskData= await updateTask(data.id, data.task);
    
      setData(taskData);
  }

    return (
        <Dialog open={open} onOpenChange={setOpen}> 
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer" />
                  </DialogTrigger>
                  
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Editar Tarefa</DialogTitle>
                    </DialogHeader>

                    <div className="flex items-center gap-2">
                      <Input type="text"  value={data.task}  onChange={(e) => setData({...data, task: e.target.value})}/>
                      <Button className="cursor-pointer" onClick={handleEditTasks}>Editar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
    )
}