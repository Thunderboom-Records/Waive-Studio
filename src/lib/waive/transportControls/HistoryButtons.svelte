<script>

    function undo(){

    }

    function redo(){

    }

</script>

<div class="flex flex-row space-x-1 place-items-center">
    <button class="rounded-l-full bg-gray-800 text-gray-600 p-1 px-3" on:click={undo}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
        >
            <path fill="currentColor" d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z" class="st0"/>
        </svg>
    </button>
    <button class="rounded-r-full bg-gray-800 text-gray-600 p-1 px-3" on:click={redo}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-6 h-6"
        >
            <g transform="translate(24 0) scale(-1 1)">
                <path fill="currentColor" d="M12 5H7V2L1 6l6 4V7h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H7v2h5c3.3 0 6-2.7 6-6s-2.7-6-6-6z" class="st0"/>
            </g>
        </svg>
    </button>
</div>