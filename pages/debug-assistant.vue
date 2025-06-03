<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-primary">🔍 Debug Assistant</h1>

    <!-- Raw Data Display -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- All Gardens Data -->
      <div class="border rounded-lg p-4">
        <h2 class="text-lg font-medium mb-4">📊 Raw allGardens Data</h2>
        <pre class="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-96">{{ JSON.stringify(allGardens, null, 2) }}</pre>
      </div>

      <!-- Assistant State -->
      <div class="border rounded-lg p-4">
        <h2 class="text-lg font-medium mb-4">⚙️ Assistant State</h2>
        <pre class="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-96">{{ JSON.stringify(assistantState, null, 2) }}</pre>
      </div>
    </div>

    <!-- Type Information -->
    <div class="border rounded-lg p-4">
      <h2 class="text-lg font-medium mb-4">🏷️ Type Information</h2>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>allGardens type:</strong> {{ typeof allGardens }}
        </div>
        <div>
          <strong>allGardens length:</strong> {{ allGardens?.length || 'undefined' }}
        </div>
        <div>
          <strong>assistantState type:</strong> {{ typeof assistantState }}
        </div>
        <div>
          <strong>First garden zones:</strong> {{ allGardens?.[0]?.zones?.length || 'undefined' }}
        </div>
      </div>
    </div>

    <!-- Mock Gardens Import Test -->
    <div class="border rounded-lg p-4">
      <h2 class="text-lg font-medium mb-4">📋 Direct Mock Import Test</h2>
      <div class="text-sm space-y-2">
        <div><strong>Mock Gardens Length:</strong> {{ mockGardens.length }}</div>
        <div><strong>First Garden Name:</strong> {{ mockGardens[0]?.name }}</div>
        <div><strong>First Garden Zones:</strong> {{ mockGardens[0]?.zones?.length }}</div>
        <div><strong>First Zone Name:</strong> {{ mockGardens[0]?.zones?.[0]?.name }}</div>
      </div>
    </div>

    <!-- Test Assistant Open -->
    <div class="border rounded-lg p-4">
      <h2 class="text-lg font-medium mb-4">🧪 Test Functions</h2>
      <div class="space-y-3">
        <Button @click="openAssistant()" class="w-full">
          🌱 Open Assistant (No Pre-selection)
        </Button>
        <Button @click="openAssistant('zone-1-1')" variant="outline" class="w-full">
          🌱 Open Assistant (Pre-select zone-1-1)
        </Button>
        <Button @click="logAllData" variant="outline" class="w-full">
          📋 Log All Data to Console
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAssistant } from '@/composables/useAssistant'
import { mockGardens } from '@/mocks/gardensData'
import { Button } from '@/components/ui/button'

const { 
  assistantState, 
  allGardens,
  openAssistant 
} = useAssistant()

const logAllData = () => {
  console.log('=== DEBUG ASSISTANT DATA ===')
  console.log('allGardens:', allGardens)
  console.log('mockGardens:', mockGardens)
  console.log('assistantState:', assistantState)
  console.log('allGardens type:', typeof allGardens)
  console.log('allGardens length:', allGardens?.length)
  console.log('============================')
}
</script> 