type ClassName = string | false | null | undefined;

export const cn = (...classNames: ClassName[]) =>
  classNames.filter(Boolean).join(" ");
