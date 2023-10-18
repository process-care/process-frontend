interface Props {
  className?: string
}

export function ShowMore({ className }: Props) {
  return (
    <svg
      className={className}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_330_53)">
        <path d="M23.0002 32.5268V12.7278" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32.8997 22.6273H13.1008" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_330_53">
          <rect width="32" height="32" fill="white" transform="translate(23) rotate(45)"/>
        </clipPath>
      </defs>
    </svg>
  )
}