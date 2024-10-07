<script setup>
import { ref, onMounted, computed } from 'vue';
import { LucideStar, LucideGitFork, LucideEye, LucideCode } from 'lucide-vue-next';

const projects = ['Streaming-status', 'Custom-status', 'Online-VC', 'Executor-Key-Bypass-Discord-Bot'];
const repos = ref([]);
const loading = ref(true);
const error = ref(null);

const sortedRepos = computed(() => {
  return repos.value.sort((a, b) => b.stargazers_count - a.stargazers_count);
});

onMounted(async () => {
  try {
    const response = await fetch('https://api.github.com/users/4levy/repos');
    if (!response.ok) throw new Error('Failed to fetch repositories');
    const data = await response.json();
    repos.value = data.filter(repo => projects.includes(repo.name));
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: 'bg-yellow-300',
    Python: 'bg-blue-500',
    Java: 'bg-red-500',
    'C#': 'bg-green-500',
    Ruby: 'bg-red-600',
    PHP: 'bg-purple-500',
    TypeScript: 'bg-blue-600',
    default: 'bg-gray-500'
  };
  return colors[language] || colors.default;
};
</script>

<template>
    <div class="mb-6 font-bold text-3xl text-catppuccin-gray">Project/</div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-catppuccin-blue mx-auto"></div>
      <p class="mt-4 text-catppuccin-subtext0 font-inter">Loading projects...</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <LucideCode class="h-16 w-16 text-catppuccin-red mx-auto" />
      <p class="mt-4 text-catppuccin-red font-inter">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a v-for="repo in sortedRepos" :key="repo.id" :href="repo.html_url" target="_blank"
         class="bg-catppuccin-base border border-catppuccin-surface0 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <img :src="repo.owner.avatar_url" :alt="repo.owner.login" class="w-8 h-8 rounded-full">
              <span class="text-sm font-medium text-catppuccin-subtext0 font-inter">{{ repo.owner.login }}</span>
            </div>
            <span v-if="repo.archived" class="px-2 py-1 text-xs font-semibold text-catppuccin-red bg-catppuccin-crust rounded-full">Archived</span>
          </div>

          <h3 class="text-xl font-bold text-catppuccin-text mb-2 font-inter" :class="{ 'line-through': repo.archived }">{{ repo.name }}</h3>
          <p class="text-catppuccin-subtext1 text-sm mb-4 font-inter">{{ repo.description || 'No description available.' }}</p>

          <div class="flex items-center space-x-4 text-catppuccin-subtext0">
            <div class="flex items-center space-x-1">
              <LucideStar class="h-4 w-4 text-catppuccin-yellow" />
              <span>{{ repo.stargazers_count }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <LucideGitFork class="h-4 w-4 text-catppuccin-blue" />
              <span>{{ repo.forks_count }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <LucideEye class="h-4 w-4 text-catppuccin-subtext1" />
              <span>{{ repo.watchers_count }}</span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-catppuccin-mantle border-t border-catppuccin-surface0">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span :class="[getLanguageColor(repo.language), 'w-3 h-3 rounded-full']"></span>
              <span class="text-sm font-medium text-catppuccin-subtext1 font-inter">{{ repo.language || 'Unknown' }}</span>
            </div>
            <span class="text-xs text-catppuccin-subtext0 font-inter">Updated: {{ new Date(repo.updated_at).toLocaleDateString() }}</span>
          </div>
        </div>
      </a>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

:root {
  --catppuccin-base: #1e1e2e;
  --catppuccin-mantle: #181825;
  --catppuccin-crust: #11111b;
  --catppuccin-surface0: #313244;
  --catppuccin-surface1: #45475a;
  --catppuccin-text: #cdd6f4;
  --catppuccin-subtext0: #a6adc8;
  --catppuccin-subtext1: #bac2de;
  --catppuccin-red: #f38ba8;
  --catppuccin-blue: #89b4fa;
  --catppuccin-gray: #b4befe;
  --catppuccin-yellow: #f9e2af; 
}

.font-inter {
  font-family: 'Inter', sans-serif;
}


.bg-catppuccin-base { 
  background-color: var(--catppuccin-base); 
}
.bg-catppuccin-mantle { 
  background-color: var(--catppuccin-mantle); 
}
.bg-catppuccin-crust { 
  background-color: var(--catppuccin-crust); 
}

a:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

.text-catppuccin-gray {
  color: #b4befe;
}

</style>

