export type TaskStatus = 'pending' | 'completed';
export interface TaskInterface {
  id: number;
  name: string;
  user_id: string;
  status: TaskStatus;
  created_at: string;
}