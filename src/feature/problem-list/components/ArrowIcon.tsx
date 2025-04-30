type ArrowIconProps = {
  color?: string;
};

const ArrowIcon = ({ color = 'text-DEFAULT' }: ArrowIconProps) => (
  <svg
    className={`${color}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.415 8.58496L12 13.17L16.585 8.58496L18 9.99996L12 16L6 9.99996L7.415 8.58496Z" />
  </svg>
);

export default ArrowIcon;
