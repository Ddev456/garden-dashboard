<!-- components/header/UserMenu.vue -->
<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage :src="currentUser.avatar || '/avatar.png'" :alt="currentUser.name" />
          <AvatarFallback>{{ currentUser.name.charAt(0) }}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 bg-white" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{{ currentUser.name }}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ currentUser.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>Mon Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-red-600">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Se déconnecter</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { User, Settings, LogOut } from 'lucide-vue-next'
import { mockUsers } from '~/mocks/data'

const currentUser = mockUsers[0]
</script> 