export interface Icon {
  [key: string]: ({ className }: { className: string }) => JSX.Element;
}

export interface NavItemProps {
  path: string;
  name: string;
}
