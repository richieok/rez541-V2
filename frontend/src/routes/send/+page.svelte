<script>
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Click")
        const formData = new FormData(form);

        try {
            const response = await fetch("/app/send", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json()
            console.log("data ->\n", data)
        } catch (error) {
            console.error("Error:", error);
        }
    }

    let form;
</script>

<div>
    <form method="post" bind:this={form}>
        <label for="message">Message:</label>
        <input type="text" name="message" required />
        <button on:click={handleSubmit}>Send</button>
    </form>
</div>

<style>
    div {
        display: grid;
        place-content: center;
        height: 100vh;
    }
</style>
