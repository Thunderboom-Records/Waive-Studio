<script lang="ts">
	export let href: string;
</script>

<a {href} class="text-base font-medium text-white hover:text-indigo-50">
	<slot />
</a>
