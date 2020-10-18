<script>
    export let labelText;
    export let name;
    export let min;
    export let max;
    export let step;
    export let value;
    export let outputText;
</script>

<style type="text/less">
    .range-input-container{
        @apply flex items-center py-2 ;
        input[type="range"]{
            @apply px-2;
        }
    }
</style>

<div class="range-input-container">
    <label for={name}>{labelText}
        <input type=range {name} {min} {max} {step} bind:value>
    </label>
    <span>{outputText}</span>
</div>