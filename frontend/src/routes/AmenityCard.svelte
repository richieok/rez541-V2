<script>
    let {
        icon = "❌",
        title = "No title",
        description = "No description",
    } = $props();
</script>

<div class="amenity-card">
    <!-- <div class="icon">{icon}</div> -->
     <div class="icon"><i class={icon}></i></div>
    <h3 class="title">{title}</h3>
    <p class="description">{description}</p>
</div>

<style>
    .amenity-card {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
        gap: 0;
        text-align: center;
        padding: 1rem 1rem;
        border-radius: 10px;
        transition: all 0.3s ease;
        cursor: pointer;
        background: #ffffff;
        border: 2px solid #e8e8e8cc;
    }
    .icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 25px;
        /* background: linear-gradient(135deg, #d4af37 0%, #f4d03fb1 100%); */
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        transition: all 0.3s ease;
        > i {
            width: fit-content;
            height: fit-content;
        }
    }
    h3 {
        font-family: "Montserrat", sans-serif;
        font-weight: 600;
        font-size: 20px;
        color: #2c3e50;
        margin-bottom: 12px;
        letter-spacing: 0.3px;
    }
    p {
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: #666;
        line-height: 1.6;
    }
</style>
