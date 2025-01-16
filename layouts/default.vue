<template>
  <div class="min-h-screen flex flex-col">
    <nav
      class="bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-md"
    >
      <div class="container mx-auto px-4 py-3 flex items-center">
        <nuxt-link
          to="/"
          class="text-lg font-semibold hover:text-yellow-200 transition-colors"
        >
          Home
        </nuxt-link>
      </div>
    </nav>

    <main class="flex-1 container mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>
