import { onMounted, onUnmounted } from 'vue'
import { addMonths, subMonths } from 'date-fns'

interface KeyboardHandlers {
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  onAddTask: () => void
  onToggleFilters: () => void
  onToggleSidebar: () => void
}

export function useCalendarKeyboard(handlers: KeyboardHandlers) {
  const handleKeydown = (event: KeyboardEvent) => {
    // Ignorer si l'utilisateur tape dans un input/textarea
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return
    }

    // Ignorer si des modificateurs sont pressés (sauf pour certains raccourcis)
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return
    }

    switch (event.key.toLowerCase()) {
      case 'arrowleft':
        event.preventDefault()
        handlers.onPreviousMonth()
        break
      
      case 'arrowright':
        event.preventDefault()
        handlers.onNextMonth()
        break
      
      case 't':
        event.preventDefault()
        handlers.onToday()
        break
      
      case 'n':
        event.preventDefault()
        handlers.onAddTask()
        break
      
      case 'f':
        event.preventDefault()
        handlers.onToggleFilters()
        break
      
      case 's':
        event.preventDefault()
        handlers.onToggleSidebar()
        break
      
      case 'escape':
        event.preventDefault()
        // Fermer les modals/drawers ouverts
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    handleKeydown
  }
} 