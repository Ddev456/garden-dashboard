<template>
  <div class="space-y-4">
    <Card v-for="entry in journal" :key="entry.id" class="bg-primary/10">
      <CardHeader>
        <CardTitle class="text-sm flex items-center justify-between">
          <span>{{ entry.author }}</span>
          <span class="text-gray-500">{{ entry.createdAt }}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm mb-2">{{ entry.content }}</p>
        <div v-if="entry.photos && entry.photos.length" class="flex gap-2 mt-2">
          <img v-for="(photo, idx) in entry.photos" :key="idx" :src="photo" class="w-16 h-16 object-cover rounded" />
        </div>
        <div class="mt-2 text-xs text-gray-400">(Placeholder pour ajout de note/photo)</div>
      </CardContent>
    </Card>
    <div class="mt-4 p-4 border-2 border-dashed rounded text-center text-gray-400">
      (Zone pour ajouter une nouvelle note ou photo - à implémenter)
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

defineProps<{ journal: any[] }>()
</script> 