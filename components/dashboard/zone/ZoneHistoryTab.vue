<template>
  <div class="space-y-4">
    <Card v-for="event in history" :key="event.id" class="bg-primary/10">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <img :src="event.plantIcon" :alt="event.plantName" class="w-6 h-6" />
          {{ event.plantName }}
          <span class="ml-auto text-xs text-gray-400">{{ event.type || 'Événement' }}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Date</dt>
            <dd class="text-sm">{{ event.date || event.plantedDate }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Action</dt>
            <dd class="text-sm">{{ event.action || 'Plantation/Récolte' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Rendement</dt>
            <dd class="text-sm">{{ event.yield }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Notes</dt>
            <dd class="text-sm">{{ event.notes }}</dd>
          </div>
        </dl>
        <div class="mt-2 text-xs text-gray-400">(Placeholder pour enrichir l'historique avec d'autres types d'événements)</div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

defineProps<{ history: any[] }>()
</script> 