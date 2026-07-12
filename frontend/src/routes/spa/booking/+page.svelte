<script>
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    let { data, form } = $props();

    let selectedServiceId = $state(data.serviceId ?? '');
    let selectedDate = $state(data.date ?? '');
    let selectedSlot = $state('');
    let submitting = $state(false);

    const today = new Date().toISOString().slice(0, 10);

    const categories = [
        { id: 'treatments', label: 'Treatments' },
        { id: 'facials', label: 'Facials' },
        { id: 'packages', label: 'Packages' },
    ];

    const selectedService = $derived(
        data.services.find((s) => s.id === selectedServiceId) ?? null
    );

    function fmt(n) {
        return '₦' + Number(n).toLocaleString('en-NG');
    }

    function loadSlots() {
        selectedSlot = '';
        if (selectedServiceId && selectedDate) {
            goto(`?serviceId=${encodeURIComponent(selectedServiceId)}&date=${encodeURIComponent(selectedDate)}`, {
                keepFocus: true,
                noScroll: true
            });
        }
    }
</script>

<svelte:head>
    <title>Book a Spa Appointment - Residence 541</title>
</svelte:head>

<div class="booking-page">
    <header class="hero">
        <p class="eyebrow">Residence 541 Spa</p>
        <h1>Book an Appointment</h1>
        <p class="sub">Choose a service, pick a time, and we'll hold your place.</p>
    </header>

    {#if form?.success}
        <div class="notice success">
            <h2>Almost there</h2>
            <p>{form.message}</p>
            <a href="/spa" class="back-link">Back to the spa</a>
        </div>
    {:else}
        <form method="POST" use:enhance={() => {
            submitting = true;
            return async ({ update }) => {
                submitting = false;
                await update();
            };
        }}>
            {#if form?.error}
                <div class="notice error">
                    <p>{form.error}</p>
                </div>
            {/if}

            <!-- Step 1: service -->
            <section class="step">
                <h2><span class="step-no">1</span> Choose a service</h2>
                <select name="serviceId" bind:value={selectedServiceId} onchange={loadSlots} required>
                    <option value="" disabled>Select a service...</option>
                    {#each categories as category}
                        <optgroup label={category.label}>
                            {#each data.services.filter((s) => s.category === category.id) as service}
                                <option value={service.id}>{service.name} · {service.duration} — {fmt(service.price)}</option>
                            {/each}
                        </optgroup>
                    {/each}
                </select>
                {#if selectedService}
                    <p class="service-meta">{selectedService.durationMinutes} minutes · {fmt(selectedService.price)}</p>
                {/if}
            </section>

            <!-- Step 2: date + slot -->
            <section class="step">
                <h2><span class="step-no">2</span> Pick a date &amp; time</h2>
                <input type="date" min={today} bind:value={selectedDate} onchange={loadSlots} required />

                {#if data.availability}
                    {#if data.availability.slots.length > 0}
                        <div class="slot-grid">
                            {#each data.availability.slots as slot}
                                <label class="slot" class:selected={selectedSlot === slot.startsAt}>
                                    <input type="radio" name="startsAt" value={slot.startsAt} bind:group={selectedSlot} required />
                                    {slot.label}
                                </label>
                            {/each}
                        </div>
                    {:else}
                        <p class="no-slots">No available times on this date. Please try another day.</p>
                    {/if}
                {:else if selectedServiceId && selectedDate}
                    <p class="no-slots">Loading available times...</p>
                {:else}
                    <p class="hint">Select a service and date to see available times.</p>
                {/if}
            </section>

            <!-- Step 3: contact details -->
            <section class="step">
                <h2><span class="step-no">3</span> Your details</h2>
                <div class="field-grid">
                    <label>
                        First name
                        <input type="text" name="firstName" required />
                    </label>
                    <label>
                        Last name
                        <input type="text" name="lastName" required />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Phone
                        <input type="tel" name="phone" required />
                    </label>
                </div>
            </section>

            <button type="submit" class="submit" disabled={submitting || !selectedSlot}>
                {submitting ? 'Booking...' : 'Request Appointment'}
            </button>
            <p class="fine-print">We'll email you a confirmation link. Your slot is held for 24 hours until confirmed.</p>
        </form>
    {/if}
</div>

<style>
    .booking-page {
        --gold: hsl(42, 55%, 60%);
        --gold-deep: hsl(42, 50%, 45%);
        --ink: hsl(30, 20%, 12%);
        --ink-soft: hsl(30, 12%, 30%);
        --cream: hsl(40, 30%, 96%);
        --rule: hsl(40, 20%, 86%);
        background: var(--cream);
        color: var(--ink);
        min-height: 100vh;
        padding: clamp(2rem, 6vw, 5rem) 1.25rem 5rem;
        font-family: "Montserrat", sans-serif;
    }

    .hero {
        max-width: 640px;
        margin: 0 auto clamp(2rem, 5vw, 3.5rem);
        text-align: center;
    }

    .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.25em;
        font-size: 0.75rem;
        color: var(--gold-deep);
        margin: 0 0 0.75rem;
    }

    .hero h1 {
        font-size: clamp(1.8rem, 4.5vw, 2.8rem);
        font-weight: 500;
        margin: 0 0 0.75rem;
    }

    .sub {
        color: var(--ink-soft);
        margin: 0;
    }

    form, .notice {
        max-width: 640px;
        margin: 0 auto;
    }

    .step {
        background: #fff;
        border: 1px solid var(--rule);
        border-radius: 10px;
        padding: 1.5rem;
        margin-bottom: 1.25rem;
    }

    .step h2 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 1rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
    }

    .step-no {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background: var(--gold);
        color: #fff;
        font-size: 0.85rem;
    }

    select, input[type="date"], input[type="text"], input[type="email"], input[type="tel"] {
        width: 100%;
        padding: 0.65rem 0.75rem;
        border: 1px solid var(--rule);
        border-radius: 6px;
        font: inherit;
        color: var(--ink);
        background: var(--cream);
    }

    .service-meta {
        margin: 0.75rem 0 0;
        color: var(--ink-soft);
        font-size: 0.9rem;
    }

    .slot-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .slot {
        display: block;
        text-align: center;
        padding: 0.55rem 0;
        border: 1px solid var(--rule);
        border-radius: 6px;
        cursor: pointer;
        background: #fff;
        font-size: 0.9rem;
        transition: border-color 120ms ease, background 120ms ease;
    }

    .slot:hover {
        border-color: var(--gold);
    }

    .slot.selected {
        background: var(--gold);
        border-color: var(--gold);
        color: #fff;
        font-weight: 600;
    }

    .slot input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .no-slots, .hint {
        margin: 1rem 0 0;
        color: var(--ink-soft);
        font-size: 0.9rem;
    }

    .field-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .field-grid label {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        font-size: 0.85rem;
        color: var(--ink-soft);
    }

    @media (max-width: 540px) {
        .field-grid {
            grid-template-columns: 1fr;
        }
    }

    .submit {
        width: 100%;
        padding: 0.9rem;
        border: none;
        border-radius: 8px;
        background: var(--ink);
        color: var(--gold);
        font: inherit;
        font-weight: 600;
        letter-spacing: 0.06em;
        cursor: pointer;
    }

    .submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .fine-print {
        text-align: center;
        color: var(--ink-soft);
        font-size: 0.8rem;
        margin-top: 0.9rem;
    }

    .notice {
        background: #fff;
        border: 1px solid var(--rule);
        border-radius: 10px;
        padding: 2rem;
        text-align: center;
    }

    .notice.success h2 {
        margin: 0 0 0.5rem;
        font-weight: 500;
    }

    .notice.error {
        border-color: hsl(0, 55%, 70%);
        color: hsl(0, 55%, 35%);
        margin-bottom: 1.25rem;
        padding: 1rem;
        text-align: left;
    }

    .notice p {
        margin: 0;
    }

    .back-link {
        display: inline-block;
        margin-top: 1.25rem;
        color: var(--gold-deep);
    }
</style>
