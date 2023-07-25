<script>
  import Router from './router.svelte';
  // import { auth } from './stores';
</script>

<div class="main-container">
  <!-- {#await auth.refresh() then} -->
    <Router />
  <!-- {/await} -->
</div>