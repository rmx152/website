<template>
  <main class="container mx-auto py-20 px-5 relative max-w-screen-lg">
    <div class="absolute top-0 right-0 text-[10rem] opacity-10 select-none z-0" aria-hidden="true">❄</div>
    <div class="absolute bottom-0 left-0 text-[10rem] opacity-10 select-none z-0 mt-10" aria-hidden="true">🌙</div>

    <header class="relative mb-10">
      <Header />
    </header>

    <section class="relative mb-10">
      <Uses />
    </section>

    <section class="relative mb-10">
      <Projects />
    </section>

    <section class="relative mb-10">
      <RecentTracks />
    </section>

    <footer class="relative">
      <Footer />
    </footer>
  </main>
</template>

<script>
import Header from '@/components/Header.vue';
import Uses from '@/components/Uses.vue';
import Projects from '@/components/Projects.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Uses,
    Projects,
    Footer
  }
};
</script>