<script>
    let { text, href } = $props()
</script>

<a {href}>{text}</a>

<style>
    a {
        display: inline-block;
        font-family: "Montserrat", sans-serif;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        text-decoration: none;
        color: hsl(30, 20%, 12%);
        background: hsl(42, 55%, 60%);
        padding: 0.65rem 1.4rem;
        border-radius: 50px;
        transition: background 0.2s, transform 0.15s;
        line-height: 1;
    }

    a:hover {
        background: hsl(42, 55%, 52%);
        transform: scale(1.04);
    }
</style>