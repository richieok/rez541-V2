<div class="info">
    <div class="map-wrapper">
        <iframe
            class="map-small"
            title="Google Maps location of Residence 541 Apartments and Suites"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2268366368726!2d7.437375674722995!3d9.04306158876931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b64e37ac631%3A0x993172250bc3a72f!2sResidence%20541%20Apartments%20and%20Suites!5e0!3m2!1sen!2sng!4v1767703931960!5m2!1sen!2sng"
            width="350"
            height="300"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            data-address="Plot 541 John Chukwu Cres, off Dahiru Mustapha Boulevard, Wuye, Abuja 900001, Federal Capital Territory"
        ></iframe>
        <button
            id="copyBtn"
            style="margin-top: 10px; padding: 4px; cursor: pointer;"
            ><i class="fa-regular fa-copy"></i> Copy Address</button
        >
    </div>
    <p>
        We are located in Wuye, putting you within easy reach of Wuse and the
        Central District of Abuja, while providing a peaceful retreat from the
        bustle of city life.
    </p>
</div>

<style>
    .info {
        padding: .5rem 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        /* > div, p {
            flex: 1;
        } */
    }
    .map-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    p {
        width: clamp(350px, 60vw, 450px);
        padding: 1rem;
        font-size: 1.3rem;
    }
    @container ( width > 800px){
        .info {
            flex-direction: row;
        }
    }
</style>
