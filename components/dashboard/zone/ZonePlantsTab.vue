<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card v-for="plant in plants" :key="plant.id" class="bg-primary/10">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <img :src="plant.icon" :alt="plant.name" class="w-6 h-6" />
          {{ plant.name }}
          <Badge 
            :variant="plant.status === 'healthy' ? 'secondary' : plant.status === 'warning' ? 'outline' : 'destructive'"
            class="ml-auto"
          >
            {{ plant.status }}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl class="space-y-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Planté le</dt>
            <dd class="text-sm">{{ plant.plantedDate }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Prochain arrosage</dt>
            <dd class="text-sm">{{ plant.nextWateringDate }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Notes</dt>
            <dd class="text-sm">{{ plant.notes }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

defineProps<{ plants: any[] }>()
</script> 