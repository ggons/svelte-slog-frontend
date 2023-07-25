<script>
  import { onMount } from 'svelte';
  import Router from './router.svelte';
  import { auth, isRefresh } from './stores';

  const refresh_time = 1000 * 60 * 14;

  onMount(() => {
    const onRefresh = setInterval(() => {
      if ($isRefresh) {
        auth.refresh();
      } else {
        clearInterval(onRefresh)
      }
    }, refresh_time)
  })
</script>

<div class="main-container">
  <!-- {#await auth.refresh() then} -->
    <Router />
  <!-- {/await} -->
</div>