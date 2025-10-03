import { Todo } from "@/data/Todo";
import { TodoGroup } from "@/data/TodoGroup";

export const groupTodos = (todos: Todo[]): TodoGroup[] => {
  const currentYear = new Date().getFullYear();

  const monthMap: Record<string, Todo[]> = {};
  const pastYearMap: Record<number, Todo[]> = {};

  todos.forEach((todo) => {
    const date = new Date(todo.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });

    if (year === currentYear) {
      if (!monthMap[month]) monthMap[month] = [];
      monthMap[month].push(todo);
    } else {
      if (!pastYearMap[year]) pastYearMap[year] = [];
      pastYearMap[year].push(todo);
    }
  });

  // Sort months (latest first)
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

  // Add past years (latest year first)
  const pastYearsSorted = Object.keys(pastYearMap)
    .map(Number)
    .sort((a, b) => b - a);

  pastYearsSorted.forEach((year) => {
    groups.push({
      title: year.toString(),
      items: pastYearMap[year].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  });

  return groups;
};
