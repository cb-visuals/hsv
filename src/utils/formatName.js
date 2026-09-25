// Default display treatment for real names: first name + last-initial (e.g.
// "Peter Economou" -> "Peter E"), so full last names aren't shown by default.
// Single-word names (e.g. "Dave", "KJ") pass through unchanged.
export function formatDisplayName(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length < 2) return name
  return `${parts[0]} ${parts[parts.length - 1][0]}`
}
