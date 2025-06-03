<template>
  <div 
    class="relative pl-20 transition-all duration-500 ease-out"
  >
    <!-- Cercle d'étape avec animation -->
    <div 
      class="absolute left-6 flex items-center justify-center w-4 h-4 rounded-full ring-4 ring-white transition-all duration-500 z-10"
      :class="[
        step.completed 
          ? 'bg-primary shadow-lg shadow-primary/50 animate-step-completed' 
          : isNext
            ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse-subtle'
            : 'bg-gray-300'
      ]"
    >
      <CheckIcon 
        v-if="step.completed" 
        class="w-2.5 h-2.5 text-white animate-check-appear" 
      />
      <span 
        v-else 
        class="text-xs font-bold text-white"
      >
        {{ index + 1 }}
      </span>
    </div>

    <!-- Contenu de l'étape avec animations -->
    <div 
      class="border rounded-lg transition-all duration-500 hover:shadow-lg"
      :class="[
        step.completed 
          ? 'bg-primary/5 border-primary/20 hover:bg-primary/8' 
          : isNext
            ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 animate-pulse-subtle'
            : 'bg-white border-gray-200 hover:bg-gray-50'
      ]"
    >
      <!-- En-tête de l'étape -->
      <div 
        class="p-4 cursor-pointer flex items-center justify-between transition-all duration-300 hover:bg-black/5 rounded-t-lg"
        @click="toggleExpanded"
      >
        <div class="flex items-center gap-3">
          <img
            v-if="step.icon"
            :src="step.icon" 
            :alt="step.title" 
            class="w-6 h-6 transition-transform duration-300 hover:scale-110" 
          />
          <img
            v-else
            src="/icons/planting.svg"
            alt="Assistant"
            class="w-6 h-6 transition-transform duration-300 hover:scale-110" 
          />
          <div>
            <h3 
              class="font-semibold transition-all duration-300"
              :class="[
                step.completed 
                  ? 'text-primary' 
                  : isNext
                    ? 'text-yellow-700'
                    : 'text-gray-900'
              ]"
            >
              {{ step.title }}
              <span v-if="isNext" class="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full animate-bounce">
                Suivant
              </span>
            </h3>
            <p class="text-sm text-gray-500">{{ step.duration }} • {{ step.optimalPeriod }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <Badge 
            v-if="step.completed" 
            variant="secondary" 
            class="bg-primary/10 text-primary transition-all duration-300 hover:scale-105"
          >
            Terminé le {{ step.completedDate }}
          </Badge>
          <Button
            v-else
            variant="outline"
            size="sm"
            @click.stop="$emit('mark-completed')"
            class="transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
            :class="{ 'ring-2 ring-yellow-400 ring-offset-2': isNext }"
          >
            <CheckIcon class="w-4 h-4 mr-1" />
            Marquer terminé
          </Button>
          <ChevronDownIcon 
            class="w-4 h-4 transition-transform duration-300"
            :class="isExpanded ? 'rotate-180' : ''"
          />
        </div>
      </div>

      <!-- Détails de l'étape (repliables) avec animation -->
      <transition 
        name="expand"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div 
          v-if="isExpanded"
          class="px-4 pb-4 space-y-4 border-t border-gray-100"
        >
          <!-- Description -->
          <div class="animate-fade-in-up" style="animation-delay: 100ms;">
            <h4 class="font-medium text-gray-900 mb-2">Description</h4>
            <p class="text-gray-600">{{ step.description }}</p>
          </div>

          <!-- Outils nécessaires -->
          <div class="animate-fade-in-up" style="animation-delay: 200ms;">
            <h4 class="font-medium text-gray-900 mb-2">Outils nécessaires</h4>
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="(tool, toolIndex) in step.tools" 
                :key="tool" 
                variant="outline"
                class="text-xs transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
                :style="{ animationDelay: `${toolIndex * 50}ms` }"
              >
                {{ tool }}
              </Badge>
            </div>
          </div>

          <!-- Conseils -->
          <div class="animate-fade-in-up" style="animation-delay: 300ms;">
            <h4 class="font-medium text-gray-900 mb-2">Conseils pratiques</h4>
            <ul class="space-y-1">
              <li 
                v-for="(tip, tipIndex) in step.tips" 
                :key="tip"
                class="flex items-start gap-2 text-sm text-gray-600 animate-fade-in-up"
                :style="{ animationDelay: `${tipIndex * 100 + 400}ms` }"
              >
                <LightbulbIcon class="w-4 h-4 text-yellow-500 mt-0.5 shrink-0 transition-transform duration-300 hover:scale-110" />
                {{ tip }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckIcon, 
  ChevronDownIcon, 
  LightbulbIcon
} from 'lucide-vue-next'

interface ItineraryStep {
  id: string
  title: string
  description: string
  duration: string
  optimalPeriod: string
  icon: string
  tools: string[]
  tips: string[]
  completed: boolean
  completedDate?: string
}

interface Props {
  step: ItineraryStep
  index: number
  isNext?: boolean
  isExpanded?: boolean
}

interface Emits {
  (e: 'mark-completed'): void
  (e: 'toggle-expanded'): void
}

const props = withDefaults(defineProps<Props>(), {
  isNext: false,
  isExpanded: false
})

const emit = defineEmits<Emits>()

// Handlers
const toggleExpanded = () => {
  emit('toggle-expanded')
}

// Animations pour les transitions expand
const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
  htmlEl.style.opacity = '0'
  htmlEl.offsetHeight // force reflow
  htmlEl.style.transition = 'height 0.3s ease-out, opacity 0.3s ease-out'
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
}

const onLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'height 0.3s ease-out, opacity 0.3s ease-out'
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
  htmlEl.offsetHeight // force reflow
  htmlEl.style.height = '0'
  htmlEl.style.opacity = '0'
}
</script>

<style scoped>
/* Animations personnalisées */
@keyframes step-completed {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes check-appear {
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
}

.animate-step-completed {
  animation: step-completed 0.6s ease-out;
}

.animate-check-appear {
  animation: check-appear 0.5s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s infinite;
}

/* Transitions pour expand */
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style> 