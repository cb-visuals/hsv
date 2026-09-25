import { createContext, useContext, useEffect, useState } from "react"

const MenuContext = createContext(null)

export function MenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <MenuContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false), toggle: () => setIsOpen((v) => !v) }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) throw new Error("useMenu must be used within a MenuProvider")
  return context
}
