// 识别文字里的【待补……】，让页面把它显示成醒目的占位块
const TODO_PATTERN = /(【待补[^】]*】)/;

export function isTodo(text: string) {
  return TODO_PATTERN.test(text);
}

export function splitTodo(text: string) {
  return text
    .split(TODO_PATTERN)
    .filter(Boolean)
    .map((part) => ({ text: part, todo: TODO_PATTERN.test(part) }));
}
