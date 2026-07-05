<script>
    let {
        icon = "fa-solid fa-circle",
        title = "No title",
        description = "No description",
    } = $props();
</script>

<div class="amenity-card">
    <div class="icon"><i class={icon}></i></div>
    <div class="copy">
        <h3 class="title">{title}</h3>
        <p class="description">{description}</p>
    </div>
</div>

<style>
    .amenity-card {
        display: flex;
        align-items: flex-start;
        gap: 1.1rem;
        padding: 1.75rem 1.5rem;
        border-bottom: 1px solid var(--clr-hairline);
        transition: background 0.2s ease;
    }

    .amenity-card:hover {
        background: hsl(42, 55%, 92%, 0.5);
    }

    .icon {
        flex-shrink: 0;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.05rem;
        color: var(--clr-brass);
        background: hsl(42, 55%, 65%, 0.14);
        border: 1px solid hsl(42, 55%, 65%, 0.32);
    }

    .copy {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    h3 {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 1.05rem;
        color: var(--clr-ink);
        margin: 0;
        letter-spacing: 0.01em;
    }

    p {
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        font-size: 0.92rem;
        color: hsl(30, 10%, 42%);
        line-height: 1.55;
        margin: 0;
    }
</style>
