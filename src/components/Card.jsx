function Card({ caption, className = "", children, ...props }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-card shadow-sm transition-shadow duration-300 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/60 to-transparent px-4 pb-4 pt-10">
          <p className="text-small font-thin text-bg">{caption}</p>
        </div>
      )}
    </div>
  )
}

export default Card
