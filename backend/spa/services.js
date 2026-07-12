// Bookable spa services. Kept in sync manually with the frontend
// service menu (frontend/src/routes/spa/service-menu/+page.svelte).
// Prices are in Naira, durations in minutes.

export const SPA_OPEN_HOUR = 9
export const SPA_CLOSE_HOUR = 19
export const SLOT_INTERVAL_MINUTES = 30

export const spaServices = [
    // Treatments
    { id: 'swedish-30', name: 'Swedish Massage (30 mins)', category: 'treatments', durationMinutes: 30, price: 45000 },
    { id: 'swedish-60', name: 'Swedish Massage (60 mins)', category: 'treatments', durationMinutes: 60, price: 60000 },
    { id: 'deep-tissue-60', name: 'Deep Tissue Massage (1 hour)', category: 'treatments', durationMinutes: 60, price: 60000 },
    { id: 'deep-tissue-90', name: 'Deep Tissue Massage (90 mins)', category: 'treatments', durationMinutes: 90, price: 90000 },
    { id: 'tension-relief-60', name: 'Tension Relief (1 hour)', category: 'treatments', durationMinutes: 60, price: 60000 },
    { id: 'tension-relief-90', name: 'Tension Relief (90 mins)', category: 'treatments', durationMinutes: 90, price: 90000 },
    { id: 'shea-butter-60', name: 'African Shea Butter Massage (60 mins)', category: 'treatments', durationMinutes: 60, price: 70000 },
    { id: 'pregnancy-45', name: 'Pregnancy Massage (45 mins)', category: 'treatments', durationMinutes: 45, price: 60000 },
    { id: 'back-neck-shoulder-45', name: 'Back, Neck & Shoulder (45 mins)', category: 'treatments', durationMinutes: 45, price: 40000 },
    { id: 'indian-head-30', name: 'Indian Head Massage (30 mins)', category: 'treatments', durationMinutes: 30, price: 30000 },
    { id: 'four-hands-60', name: 'Four Hands Massage (60 mins)', category: 'treatments', durationMinutes: 60, price: 100000 },
    { id: 'hot-stone-90', name: 'Hot Stone Massage (90 mins)', category: 'treatments', durationMinutes: 90, price: 80000 },
    { id: 'calf-foot-30', name: 'Calf and Foot Massage (30 mins)', category: 'treatments', durationMinutes: 30, price: 30000 },
    // Facials
    { id: 'korean-express-facial-45', name: 'Korean Express Facial (45 mins)', category: 'facials', durationMinutes: 45, price: 40000 },
    { id: 'deep-cleanse-facial-60', name: 'Deep Cleanse Facial (60 mins)', category: 'facials', durationMinutes: 60, price: 50000 },
    { id: 'hydrating-facial-75', name: 'Hydrating Hyaluronic Facial (1 hr 15 mins)', category: 'facials', durationMinutes: 75, price: 70000 },
    { id: 'brightening-facial-90', name: 'Extra Glow Brightening Facial (1 hr 30 mins)', category: 'facials', durationMinutes: 90, price: 80000 },
    { id: 'anti-aging-facial-90', name: 'Anti Aging Collagen & Retinol Facial (1 hr 30 mins)', category: 'facials', durationMinutes: 90, price: 100000 },
    // Packages
    { id: 'thermal-recovery-180', name: 'Thermal Recovery Experience (180 mins)', category: 'packages', durationMinutes: 180, price: 150000 },
    { id: 'pure-calm-detox-210', name: 'Pure Calm Deep Detox (210 mins)', category: 'packages', durationMinutes: 210, price: 200000 },
]

export function findServiceById(id) {
    return spaServices.find(service => service.id === id)
}
