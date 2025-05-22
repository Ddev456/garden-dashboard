<!-- pages/zones/[id].vue -->
<template>
  <div class="space-y-6">
    <!-- En-tête avec informations principales -->
    <div class="flex justify-between items-start">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-primary">{{ zoneDetail.name }}</h1>
        <p class="text-sm text-gray-500">Créée le {{ zoneDetail.createdAt }}</p>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" @click="toggleFavorite">
          <Star :fill="zoneDetail.favorite ? 'currentColor' : 'none'" class="w-4 h-4 mr-2" />
          {{ zoneDetail.favorite ? 'Favori' : 'Ajouter aux favoris' }}
        </Button>
        <Button variant="default" size="sm">
          <PencilIcon class="w-4 h-4 mr-2" />
          Modifier
        </Button>
      </div>
    </div>

    <!-- Image et informations générales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="md:col-span-2">
        <CardContent class="p-8">
          <img 
            :src="zoneDetail.image" 
            :alt="zoneDetail.name"
            class="w-full h-[250px] object-cover rounded-xl"
          />
          <div class="p-6 space-y-4">
            <p class="text-gray-600">{{ zoneDetail.description }}</p>
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="tag in zoneDetail.tags" 
                :key="tag" 
                variant="secondary"
              >
                {{ tag }}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Caractéristiques</CardTitle>
        </CardHeader>
        <CardContent>
          <dl class="space-y-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">Surface</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.surface }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Type de sol</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.soilType }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Exposition</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.sunExposure }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Irrigation</dt>
              <dd class="text-sm text-gray-900">{{ zoneDetail.irrigationType }}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>

    <!-- Onglets pour le contenu détaillé -->
    <Tabs default-value="plants" class="w-full">
      <TabsList class="grid w-full grid-cols-5">
        <TabsTrigger value="plants">Plantes actuelles</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
        <TabsTrigger value="tasks">Tâches</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="environment">Environnement</TabsTrigger>
      </TabsList>

      <!-- Onglet Plantes actuelles -->
      <TabsContent value="plants">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card v-for="plant in zoneDetail.currentPlants" :key="plant.id">
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
      </TabsContent>

      <!-- Onglet Historique -->
      <TabsContent value="history">
        <div class="space-y-4">
          <Card v-for="history in zoneDetail.plantingHistory" :key="history.id">
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <img :src="history.plantIcon" :alt="history.plantName" class="w-6 h-6" />
                {{ history.plantName }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="grid grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Date de plantation</dt>
                  <dd class="text-sm">{{ history.plantedDate }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Date de récolte</dt>
                  <dd class="text-sm">{{ history.harvestedDate }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Rendement</dt>
                  <dd class="text-sm">{{ history.yield }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Notes</dt>
                  <dd class="text-sm">{{ history.notes }}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- Onglet Tâches -->
      <TabsContent value="tasks">
        <div class="space-y-4">
          <Card v-for="task in zoneDetail.tasks" :key="task.id">
            <CardHeader>
              <CardTitle class="flex items-center justify-between">
                <span>{{ task.title }}</span>
                <Badge 
                  :variant="task.status === 'done' ? 'secondary' : task.status === 'in-progress' ? 'outline' : 'default'"
                >
                  {{ task.status }}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl class="space-y-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Description</dt>
                  <dd class="text-sm">{{ task.description }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Date prévue</dt>
                  <dd class="text-sm">{{ task.dueDate }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Priorité</dt>
                  <dd class="text-sm">
                    <Badge 
                      :variant="task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'outline' : 'secondary'"
                    >
                      {{ task.priority }}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- Onglet Notes -->
      <TabsContent value="notes">
        <div class="space-y-4">
          <Card v-for="note in zoneDetail.notes" :key="note.id">
            <CardHeader>
              <CardTitle class="text-sm flex items-center justify-between">
                <span>{{ note.author }}</span>
                <span class="text-gray-500">{{ note.createdAt }}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm">{{ note.content }}</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <!-- Onglet Environnement -->
      <TabsContent value="environment">
        <div class="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conditions environnementales</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="condition in zoneDetail.environmentalConditions.slice(0, 1)" :key="condition.date">
                  <div class="space-y-4">
                    <div class="text-center">
                      <div class="text-2xl font-semibold text-primary">{{ condition.temperature }}°C</div>
                      <div class="text-sm text-gray-500">Température</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-semibold text-primary">{{ condition.humidity }}%</div>
                      <div class="text-sm text-gray-500">Humidité</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-semibold text-primary">{{ condition.soilMoisture }}%</div>
                      <div class="text-sm text-gray-500">Humidité du sol</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-semibold text-primary">{{ condition.lightLevel }}%</div>
                      <div class="text-sm text-gray-500">Niveau de lumière</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mockZoneDetail } from '@/mocks/zoneDetails'
import { Star, PencilIcon } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

const zoneDetail = ref(mockZoneDetail)

const toggleFavorite = () => {
  zoneDetail.value.favorite = !zoneDetail.value.favorite
}
</script> 