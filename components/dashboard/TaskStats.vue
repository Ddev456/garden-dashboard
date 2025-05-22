<!-- components/dashboard/TaskStats.vue -->
<template>
  <div class="grid grid-cols-4 gap-4 mb-8">
    <Card class="bg-white">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium text-gray-500">Aujourd'hui</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <CalendarDays class="w-5 h-5 mr-2 text-blue-500" />
          <span class="text-2xl font-bold">{{ stats.today }}</span>
        </div>
      </CardContent>
    </Card>

    <Card class="bg-white">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium text-gray-500">En cours</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <Clock class="w-5 h-5 mr-2 text-orange-500" />
          <span class="text-2xl font-bold">{{ stats.enCours }}</span>
        </div>
      </CardContent>
    </Card>

    <Card class="bg-white">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium text-gray-500">Terminé</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <CheckCircle2 class="w-5 h-5 mr-2 text-green-500" />
          <span class="text-2xl font-bold">{{ stats.termine }}</span>
        </div>
      </CardContent>
    </Card>

    <Card class="bg-white">
      <CardHeader class="pb-2">
        <CardTitle class="text-sm font-medium text-gray-500">Total</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center">
          <ListTodo class="w-5 h-5 mr-2 text-purple-500" />
          <span class="text-2xl font-bold">{{ stats.total }}</span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { CalendarDays, Clock, CheckCircle2, ListTodo } from 'lucide-vue-next'
import { taskStats } from '~/mocks/data'

const stats = taskStats
</script> 