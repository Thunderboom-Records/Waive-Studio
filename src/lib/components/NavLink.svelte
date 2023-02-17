<script lang="ts">
	export let href: string;
</script>

<a {href} class="hover:text-indigo-50 text-base font-medium text-white">
	<slot />
</a>
