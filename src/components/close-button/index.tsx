import { FC } from 'react';

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

const CloseButton: FC<CloseButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
