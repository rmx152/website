<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from 'axios';

const discordStatusColor = ref('text-catppuccin-gray');
const spotify = ref(null);
const discordStatus = ref('offline');
const vscodeActivity = ref(null);
const ws = ref(null);
const languageColors = ref({});

const fetchLanguageColors = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
    languageColors.value = response.data;
  } catch (error) {
    console.error('Error fetching language colors:', error);
  }
};

const getLanguageFromFile = (filename) => {
  if (!filename) return 'default';
  const ext = filename.split('.').pop().toLowerCase();
  const extensionMap = {
    // Programming Languages
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'py': 'Python',
    'java': 'Java',
    'html': 'HTML',
    'css': 'CSS',
    'php': 'PHP',
    'c': 'C',
    'cpp': 'C++',
    'cs': 'C#',
    'go': 'Go',
    'rb': 'Ruby',
    'rs': 'Rust',
    'swift': 'Swift',
    'kt': 'Kotlin',
    'scala': 'Scala',
    'groovy': 'Groovy',
    'pl': 'Perl',
    'lua': 'Lua',
    'r': 'R',
    'dart': 'Dart',
    'f': 'Fortran',
    'f90': 'Fortran',
    'hs': 'Haskell',
    'jl': 'Julia',
    'lisp': 'Lisp',
    'ml': 'OCaml',
    'pas': 'Pascal',
    'sql': 'SQL',
    'sh': 'Shell',
    'vb': 'Visual Basic',
    'asm': 'Assembly',
    'clj': 'Clojure',
    'erl': 'Erlang',
    'ex': 'Elixir',
    'fs': 'F#',
    'm': 'Objective-C',
    'php': 'PHP',
    'rkt': 'Racket',
    'scm': 'Scheme',
    'tex': 'TeX',
    'vim': 'Vim script',
    'zig': 'Zig',

    // Web Technologies and Frameworks
    'jsx': 'React',
    'tsx': 'React',
    'vue': 'Vue',
    'svelte': 'Svelte',
    'angular': 'Angular',
    'ember': 'Ember',
    'backbone': 'Backbone.js',
    'preact': 'Preact',
    'mjs': 'Node.js',
    'graphql': 'GraphQL',
    'prisma': 'Prisma',
    'astro': 'Astro',

    // Markup and Style
    'md': 'Markdown',
    'scss': 'SCSS',
    'sass': 'Sass',
    'less': 'Less',
    'styl': 'Stylus',
    'pug': 'Pug',
    'haml': 'Haml',
    'slim': 'Slim',
    'xml': 'XML',
    'yaml': 'YAML',
    'toml': 'TOML',

    // Data Formats
    'json': 'JSON',
    'csv': 'CSV',

    // Configuration
    'dockerfile': 'Dockerfile',
    'ini': 'INI',
    'editorconfig': 'EditorConfig',
    'gitignore': 'Git',
    'env': 'DotENV',

    // Build Tools
    'gradle': 'Gradle',
    'maven': 'Maven',
    'ant': 'Ant',

    // Others
    'ipynb': 'Jupyter Notebook',
    'proto': 'Protocol Buffers',
    'sol': 'Solidity',
  };
  return extensionMap[ext] || 'default';
};

const currentLanguageColor = computed(() => {
  if (vscodeActivity.value) {
    const language = getLanguageFromFile(vscodeActivity.value.details.split(' ').pop());
    return `color: ${languageColors.value[language]?.color || '#4F5D95'}`;
  }
  return '';
});

const vscodeStatus = computed(() => {
  if (!vscodeActivity.value) return null;
  
  if (vscodeActivity.value.details.toLowerCase().includes('idling')) {
    return 'idling';
  } else {
    return {
      details: vscodeActivity.value.details,
      state: vscodeActivity.value.state
    };
  }
});

const connectWebSocket = () => {
  ws.value = new WebSocket('wss://api.lanyard.rest/socket');

  ws.value.onopen = () => {
    ws.value.send(JSON.stringify({
      op: 2,
      d: { subscribe_to_id: '874898422233178142' }
    }));
  };

  ws.value.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
      const data = message.d;
      
      spotify.value = data.spotify;
      vscodeActivity.value = data.activities.find(activity => activity.name === "Visual Studio Code") || null;

      switch (data.discord_status) {
        case 'online':
          discordStatusColor.value = 'text-catppuccin-green';
          discordStatus.value = 'online';
          break;
        case 'idle':
          discordStatusColor.value = 'text-catppuccin-yellow';
          discordStatus.value = 'idle';
          break;
        case 'dnd':
          discordStatusColor.value = 'text-catppuccin-red';
          discordStatus.value = 'do not disturb';
          break;
        default:
          discordStatusColor.value = 'text-catppuccin-gray';
          discordStatus.value = 'offline';
          break;
      }
    }
  };

  ws.value.onerror = (error) => {
    console.error('WebSocket error', error);
  };

  ws.value.onclose = () => {
    console.log('WebSocket connection closed');
  };
};

onMounted(() => {
  connectWebSocket();
  fetchLanguageColors();
});

onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 text-center">
    <div class="text-6xl font-black text-catppuccin-gray mb-6">
      4levy.xyz
    </div>

    <div class="text-lg text-catppuccin-subtle mb-8">
      I'm 4levy (aka VIVI), a 16-year-old, Discord bot developer
    </div>

    <div class="flex justify-center items-center gap-2 text-base text-catppuccin-green mb-4">
      <font-awesome-icon :icon="['fab', 'spotify']" class="text-xl w-6 h-6" />
      <div v-if="spotify">
        I'm currently listening to 
        <a :href="`https://open.spotify.com/track/${spotify.track_id}`" target="_blank" class="underline hover:text-catppuccin-blue transition-colors">
          {{ spotify.song }} - {{ spotify.artist }}
        </a>.
      </div>
      <div v-else>
        Not listening to anything right now.
      </div>
    </div>

    <div class="flex justify-center items-center gap-2 text-base mt-2" :class="discordStatusColor">
      <font-awesome-icon :icon="['fab', 'discord']" class="text-xl w-6 h-6" />
      <div>
        Currently {{ discordStatus }} on Discord.
      </div>
    </div>

    <div v-if="vscodeActivity" class="flex justify-center items-center gap-2 text-base mt-4" :style="currentLanguageColor">
      <font-awesome-icon :icon="['fas', 'code']" class="text-xl w-6 h-6" />
      <div v-if="typeof vscodeStatus === 'string'">
        Currently {{ vscodeStatus }} in VSCode.
      </div>
      <div v-else-if="vscodeStatus">
        Editing <strong>{{ vscodeStatus.details }}</strong> in workspace: <strong>{{ vscodeStatus.state }}</strong>.
      </div>
    </div>

    <div class="flex justify-center gap-8 mt-8 text-2xl">
      <a href="https://github.com/4levy/" target="_blank" class="flex items-center justify-center transition-transform transform hover:scale-110">
        <font-awesome-icon :icon="['fab', 'github']" class="w-6 h-6 text-catppuccin-gray" />
      </a>
      <a href="https://www.instagram.com/4levyz" target="_blank" class="flex items-center justify-center transition-transform transform hover:scale-110">
        <font-awesome-icon :icon="['fab', 'instagram']" class="w-6 h-6 text-catppuccin-pink" />
      </a>
      <a href="https://discord.com/users/874898422233178142" target="_blank" class="flex items-center justify-center transition-transform transform hover:scale-110">
        <font-awesome-icon :icon="['fab', 'discord']" class="w-6 h-6 text-catppuccin-blue" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
}

.text-catppuccin-gray {
  color: #b4befe;
}

.text-catppuccin-subtle {
  color: #a6accd; 
}

.text-catppuccin-green {
  color: #a6e3a1; 
}

.text-catppuccin-blue {
  color: #89b4fa; 
}

.text-catppuccin-pink {
  color: #f5c2e7; 
}

.hover\:scale-110 {
  transition: transform 0.2s ease;
}

.underline {
  text-decoration: underline;
}

a:hover {
  text-decoration: none; 
}

strong {
  color: #f5f5f5;
}

.transition-colors {
  transition: color 0.2s ease;
}
</style>