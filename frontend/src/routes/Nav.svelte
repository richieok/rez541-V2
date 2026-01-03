<script>
    import { page } from "$app/state";
    import { browser } from "$app/environment";

    let menuToggle;
    let navList;
    let navContainer

    if (browser) {
        document.addEventListener("scroll", (event) => {
            if (menuToggle?.checked) {
                menuToggle.checked = false;
            }
        });
        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            // console.log(event.target);
            if (menuToggle !== event.currentTarget) {
                menuToggle.checked = false;
            }
        });
    }
</script>

<header>
    <div class="logo-container">
        <a href="/">
            <img src="/images/logo.svg" alt="Residence 541 logo" />
        </a>
    </div>
    <div class="nav-container" bind:this={navContainer}>
        <div id="menu">
            <input
                type="checkbox"
                bind:this={menuToggle}
                id="menu-toggle"
                class="menu-stack"
            />
            <label for="menu-toggle" class="menu-toggle-label menu-stack">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </label>
        </div>
        <ul class="nav" bind:this={navList}>
            <li>
                <a href="/" aria-current={page.url.pathname === "/"}>Home</a>
            </li>
            <li>
                <a href="/rooms" aria-current={page.url.pathname === "/rooms"}
                    >Bookings</a
                >
            </li>
            <li>
                <a href="/spa" aria-current={page.url.pathname === "/spa"}
                    >Spa</a
                >
            </li>
            <li>
                <a
                    href="contact"
                    aria-current={page.url.pathname === "/contact"}>Contact</a
                >
            </li>
        </ul>
    </div>
</header>

<style>
    header {
        padding: 0 1rem;
        position: sticky;
        top: 0;
        height: var(--header-height);
        display: grid;
        grid-template-columns: var(--header-height) 1fr;
        z-index: 100;
        /* background-color: white; */
        background-color: var(--header-background);
    }
    .logo-container {
        overflow: hidden;
        height: 100%;
        padding: 0.5rem;

        & img {
            height: 100%;
            object-fit: cover;
        }
    }

    .nav-container {
        position: relative;
        container-type: inline-size;
        display: flex;
        flex-direction: row-reverse;
        height: 100%;
    }

    .nav {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: var(--header-height);
        padding-inline-start: 0;
        padding: 1rem;
        border-radius: 1rem 0 0 1rem;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.429);
        gap: 1rem;
        color: var(--nav-text-color);
        background-color: var(--header-background);
        z-index: -1;
        opacity: 0;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-style: normal;
        letter-spacing: -1px;

        > li {
            list-style: none;
            display: flex;
            align-items: center;
            padding: 0 1rem;
        }
        & a {
            font-size: 1.3rem;
            border-bottom: 2px solid transparent;
        }
    }

    .nav a[aria-current="true"] {
        /* font-weight: 600; */
        border-bottom: 2px solid #785bd1;
    }

    .nav a:any-link {
        text-decoration-line: none;
        color: inherit;
    }

    #menu {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        aspect-ratio: 1;
        padding: 1rem;
    }
    .menu-stack {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
    }

    #menu-toggle {
        opacity: 0;
        z-index: 100;
    }

    .menu-toggle-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }

    .menu-toggle-label > .line {
        height: 5px;
        margin: 5px 0;
        border-radius: 6px;
        transition: all 0.2s ease-in-out;
        background-color: black;
    }

    .menu-toggle-label .line1 {
        width: 40%;
    }

    .menu-toggle-label .line2 {
        width: 80%;
    }

    .menu-toggle-label .line3 {
        width: 60%;
    }

    #menu-toggle:checked ~ .menu-toggle-label > .line1 {
        transform-origin: bottom;
        transform: rotatez(45deg) translate(8px, 2px);
    }

    #menu-toggle:checked ~ .menu-toggle-label > .line2 {
        transform-origin: top;
        transform: rotatez(-45deg);
    }

    #menu-toggle:checked ~ .menu-toggle-label > .line3 {
        width: 40%;
        transform-origin: bottom;
        transform: translate(19px, -10px) rotatez(45deg);
    }

    #menu:has(#menu-toggle:checked) ~ .nav {
        display: flex;
        /* top: calc(100% + 1rem); */
        /* transform: translateY(calc(100% + 1rem)); */
        animation: slide-nav 0.3s ease-out forwards;
    }

    @keyframes slide-nav {
        from {
            transform: translateY(0);
            /* opacity: 0; */
        }

        to {
            transform: translateY(
                calc(100% + calc(1rem + var(--header-height)))
            );
            opacity: 1;
        }
    }

    @container ( width > 600px) {
        #menu {
            display: none;
        }
        .nav-container .nav {
            opacity: 1;
            position: relative;
            flex-direction: row;
            box-shadow: none;
            z-index: 2;
            top: 0;
        }
        #menu:has(#menu-toggle:checked) ~ .nav {
            animation: none;
        }
        /* .nav > li {
            padding: 0;
        } */
    }
</style>
