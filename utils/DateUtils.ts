import { Todo } from "@/data/Todo";
import { TodoGroup } from "@/data/TodoGroup";

export const groupTodos = (todos: Todo[]): TodoGroup[] => {
  const currentYear = new Date().getFullYear();

  const monthMap: Record<string, Todo[]> = {};
  const pastYears: Todo[] = [];

  todos.forEach((todo) => {
    const date = new Date(todo.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (year === currentYear) {
      if (!monthMap[month]) monthMap[month] = [];
      monthMap[month].push(todo);
    } else {
      pastYears.push(todo);
    }
  });

  // Sort months: latest first
  const monthNames = Object.keys(monthMap).sort(
    (a, b) =>
      new Date(`${b} 1, ${currentYear}`).getTime() -
      new Date(`${a} 1, ${currentYear}`).getTime()
  );

  const groups: TodoGroup[] = monthNames.map((month) => ({
    title: month,
    items: monthMap[month].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  }));

  if (pastYears.length > 0) {
    groups.push({
      title: "Past Years",
      items: pastYears.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  }

  return groups;
};
