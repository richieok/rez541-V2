<script>
    import { page } from "$app/state";
    import { browser } from "$app/environment";

    let menuToggle;
    let navList;

    if (browser) {
        document.addEventListener("scroll", (event) => {
            if (menuToggle?.checked) {
                menuToggle.checked = false;
            }
        });
        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            let navContainer = document.querySelector(".nav-container");

            // Clicked outside navList
            if (
                menuToggle !== event.target &&
                menuToggle?.checked &&
                !navList.contains(event.target)
            ) {
                console.log("navList does not contain target");
                menuToggle.checked = false;
            }
            // Clicked within navList
            if (navList.contains(event.target)) {
                if (menuToggle?.checked) {
                    menuToggle.checked = false;
                }
            }
            if (event.target === menuToggle) {
                // Clicking the menu toggle
                console.log("clicked menu toggle");
                menuToggle.checked = !menuToggle.checked;
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
    <div class="nav-container">
        <div id="menu">
            <input type="checkbox" bind:this={menuToggle} id="menu-toggle" />
            <label for="menu-toggle" class="menu-toggle-label">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </label>
        </div>
        <ul class="nav playfair-display-name" bind:this={navList}>
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
    }

    .nav > li {
        list-style: none;
        display: flex;
        align-items: center;
        padding: 0 1rem;
    }

    .nav a {
        font-size: 1.3rem;
        border-bottom: 2px solid transparent;
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
        display: block;
        aspect-ratio: 1;
        padding: 1rem;
    }

    #menu-toggle {
        display: none;
    }

    .menu-toggle-label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        aspect-ratio: 1;
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

    @container ( width > 700px) {
        #menu {
            display: none;
        }
        .nav {
            top: 0;
            bottom: 0;
            opacity: 1;
            position: relative;
            flex-direction: row;
            box-shadow: none;
            z-index: 2;
        }
        .nav > li {
            padding: 0;
        }
    }
</style>
