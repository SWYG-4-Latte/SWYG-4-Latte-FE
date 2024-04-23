const CalendarIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" className={className}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      d="M18 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12Z"
    />
    <path
      fill="currentColor"
      d="M8 3a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1ZM21 11H3V9h18zM16 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1ZM7 14h2v-2H7zM7 18h2v-2H7zM11 14h2v-2h-2zM11 18h2v-2h-2zM15 14h2v-2h-2z"
    />
  </svg>
);
export default CalendarIcon;
