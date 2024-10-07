<template>
  <main class="container mx-auto py-20 px-5 relative max-w-screen-lg">
    <div class="absolute top right-0 text-[10rem] opacity-10 select-none z-0 animate-float-slow" aria-hidden="true">❄</div>
    <div class="absolute bottom-0 left-0 text-[10rem] opacity-10 select-none z-0 mt-10 animate-float-slow" aria-hidden="true">✨</div>
    <div class="absolute top-1/4 left-1/3 text-[8rem] opacity-10 select-none z-0 animate-float-slow" aria-hidden="true">🌙</div>
    <div class="absolute bottom-1/4 right-1/4 text-[8rem] opacity-10 select-none z-0 animate-float-slow" aria-hidden="true">🌹</div>

    <header class="relative mb-10">
      <Header />
    </header>

    <footer class="relative">
      <Footer />
    </footer>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.container {
  position: relative;
  overflow: hidden;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-float-slow {
  animation: float 12s ease-in-out infinite;
}
</style>
