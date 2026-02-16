<script>
    let { text, href } = $props()
</script>

<a {href}>{text}</a>

<style>
    a {
        display: inline-block;
        padding: clamp(.5rem, 2.5vw,0.8rem) 0.5rem;
        /* background: linear-gradient(-45deg, #5638c0c6, #7b4cc66a); */
        /* background-color: #785bd1; */
        background-color: oklch(0.84 0.12 83.48);
        text-decoration: none;
        font-size: clamp(1.2rem, 2.5vw, 1.6rem);
        font-weight: 700;
        border-radius: 0.5rem;
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.888);
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 1px;
        /* line-height: 1; */
    }
    a:any-link {
        color: black;
    }
</style>