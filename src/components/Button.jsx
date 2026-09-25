import { Link } from "react-router-dom"

function Button({ href, type = "button", variant = "primary", className = "", children, ...props }) {
  const variantClasses =
    variant === "inverted"
      ? "bg-bg text-primary hover:bg-secondary"
      : "bg-primary text-bg hover:bg-secondary hover:text-primary"

  const classes = `inline-flex h-12 items-center justify-center rounded-button px-6 text-base font-extralight transition-colors duration-200 ease-in-out cursor-pointer disabled:cursor-not-allowed ${variantClasses} ${className}`

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link to={href} className={classes} {...props}>
          {children}
        </Link>
      )
    }

    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
