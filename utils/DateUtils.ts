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

export const DATE_FORMATS = ["RELATIVE", "ISO", "FULL"];

const getDateDifference = (dateString: string) => {
  const start = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const weeks = Math.floor(((diffDays % 365) % 30) / 7);
  const days = ((diffDays % 365) % 30) % 7;

  return { years, months, weeks, days, diffDays };
};

export const formatDate = (dateString: string, dateFormatIndex: number) => {
  const { years, months, weeks, days, diffDays } =
    getDateDifference(dateString);
  const formatType = DATE_FORMATS[dateFormatIndex];

  if (formatType === "RELATIVE") {
    if (years > 0)
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${
        months > 1 ? "s" : ""
      }, ${days} day${days > 1 ? "s" : ""} ago`;
    if (months > 0)
      return `${months} month${months > 1 ? "s" : ""}, ${weeks} week${
        weeks > 1 ? "s" : ""
      }, ${days} day${days > 1 ? "s" : ""} ago`;
    if (weeks > 0)
      return `${weeks} week${weeks > 1 ? "s" : ""}, ${days} day${
        days > 1 ? "s" : ""
      } ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  if (formatType === "ISO") {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (formatType === "FULL") {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return "";
};
