<script>
    let {data} = $props()
    console.log(data.signedUrls)
</script>

<div class="page">
    <h1>Home</h1>
    <div class="wrap">
        <div class="img-wrap">
            <img src="{data.signedUrls["public/3-bed-suite/bathroom-2.jpg"]}"/>
        </div>
        <div class="img-wrap">
            <img src="{data.signedUrls["public/3-bed-suite/closet-3-bed.jpg"]}"/>
        </div>
        <div class="img-wrap">
            <img src="{data.signedUrls["public/3-bed-suite/kitchen-3-bed.jpg"]}"/>
        </div>
    </div>
</div>

<style>
    .page {
        min-height: 100vh;
        overflow-x: hidden;
    }
    .wrap {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1rem;
        place-items: center;
    }
    .img-wrap {
        width: 350px;
        height: 480px;

        > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
</style>