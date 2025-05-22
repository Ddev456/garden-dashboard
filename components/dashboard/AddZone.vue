<template>
    <div class="flex flex-col gap-4">
        <Button class="border-2 border-dashed border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-primary hover:border-primary font-bold">
            <Plus class="w-6 h-6 stroke-4" />
            <span class="ml-2">Ajouter une zone</span>
        </Button>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';
</script>