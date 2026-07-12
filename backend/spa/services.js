// Single source of truth for the spa menu, served to the frontend via
// GET /api/rez541/v1.1/spa/menu. Items with an `id` and `durationMinutes`
// are bookable through the slot system; `spaServices` below is derived
// from them. Ids are persisted in spa bookings - never change one, retire
// it and add a new id instead.
// Prices are in Naira, durations in minutes.

export const SPA_OPEN_HOUR = 9
export const SPA_CLOSE_HOUR = 19
export const SLOT_INTERVAL_MINUTES = 30

export const spaMenu = {
    treatments: [
        { id: 'swedish-30', name: 'Swedish', duration: '30 mins', durationMinutes: 30, price: 45000 },
        { id: 'swedish-60', name: 'Swedish', duration: '60 mins', durationMinutes: 60, price: 60000 },
        { id: 'deep-tissue-60', name: 'Deep Tissue', duration: '1 hour', durationMinutes: 60, price: 60000 },
        { id: 'deep-tissue-90', name: 'Deep Tissue', duration: '90 mins', durationMinutes: 90, price: 90000 },
        { id: 'tension-relief-60', name: 'Tension Relief', duration: '1 hour', durationMinutes: 60, price: 60000 },
        { id: 'tension-relief-90', name: 'Tension Relief', duration: '90 mins', durationMinutes: 90, price: 90000 },
        { id: 'shea-butter-60', name: 'African Shea Butter', duration: '60 mins', durationMinutes: 60, price: 70000 },
        { id: 'pregnancy-45', name: 'Pregnancy Massage', duration: '45 mins', durationMinutes: 45, price: 60000 },
        { id: 'back-neck-shoulder-45', name: 'Back, Neck & Shoulder', duration: '45 mins', durationMinutes: 45, price: 40000 },
        { id: 'indian-head-30', name: 'Indian Head Massage', duration: '30 mins', durationMinutes: 30, price: 30000 },
        { id: 'four-hands-60', name: 'Four Hands Massage', duration: '60 mins', durationMinutes: 60, price: 100000 },
        { id: 'hot-stone-90', name: 'Hot Stone Massage', duration: '90 mins', durationMinutes: 90, price: 80000 },
        { id: 'calf-foot-30', name: 'Calf and Foot Massage', duration: '30 mins', durationMinutes: 30, price: 30000 },
    ],
    facials: [
        { id: 'korean-express-facial-45', name: 'Korean Express Facial (Dry to Combination skin)', duration: '45 mins', durationMinutes: 45, price: 40000 },
        { id: 'deep-cleanse-facial-60', name: 'Deep Cleanse Facial (Anti Acne)', duration: '60 mins', durationMinutes: 60, price: 50000 },
        { id: 'hydrating-facial-75', name: 'Hydrating Hyaluronic Facial (Dry skin)', duration: '1 hr 15 mins', durationMinutes: 75, price: 70000 },
        { id: 'brightening-facial-90', name: 'Extra Glow Brightening Facial (All skin types)', duration: '1 hr 30 mins', durationMinutes: 90, price: 80000 },
        { id: 'anti-aging-facial-90', name: 'Anti Aging Collagen & Retinol Facial (all skin types)', duration: '1 hr 30 mins', durationMinutes: 90, price: 100000 },
    ],
    waxing: [
        { name: 'Full Leg', price: 45000 },
        { name: 'Half Leg', price: 30000 },
        { name: 'Full Arm', price: 35000 },
        { name: 'Half Arm', price: 27000 },
        { name: 'Hands', price: 12000 },
        { name: 'Underarm', price: 15000 },
        { name: 'Upper Lip', price: 10000 },
        { name: 'Facial Wax', price: 18000 },
        { name: 'Full Chin', price: 15000 },
        { name: 'Tummy', price: 18000 },
        { name: 'Gluteus', price: 15000 },
        { name: 'Bikini Line', price: 20000 },
        { name: 'Brazilian', price: 25000 },
        { name: 'Hollywood (Full Bikini)', price: 30000 },
        { name: 'Eyebrow Tweezing', price: 10000 },
        { name: 'Eyebrow Wax', price: 12000 },
        { name: 'Full Back & Shoulders', price: 36000 },
        { name: 'Partial Back', price: 16000 },
    ],
    nailCare: [
        { name: '541 Classic Manicure', price: 15000 },
        { name: 'Classic Manicure with Gel Polish', price: 20000 },
        { name: 'Gel Polish On', price: 10000 },
        { name: 'Removal of Gel Polish', price: 8000 },
        { name: '541 Classic Pedicure', price: 20000 },
        { name: '541 Classic Pedicure with Gel Polish', price: 25000 },
        { name: 'Express Pedicure', price: 10000 },
        { name: 'Express Pedicure with Gel', price: 20000 },
        { name: '541 Pedicure with Happy Feet Mask', price: 25000 },
        { name: 'Medical Grade Pedicure (Corn Removal)', price: 50000 },
        { name: '541 Pedicure with Coconut or Argan Oil Wrap', price: 30000 },
    ],
    packages: [
        {
            id: 'thermal-recovery-180',
            name: 'Thermal Recovery Experience',
            duration: '180 mins',
            durationMinutes: 180,
            description: 'Enjoying a hot Sauna or Steam session, a skin hydrating Shower, exfoliation and finish with a full body massage (Swedish or Deep Tissue).',
            price: { single: 150000 },
        },
        {
            id: 'pure-calm-detox-210',
            name: 'Pure Calm Deep Detox',
            duration: '210 mins',
            durationMinutes: 210,
            description: 'Treat your body to a first Sauna session, full body exfoliation, a rich mask and body wrap, followed by a second sauna session, cleansing shower and a relaxing massage.',
            price: { single: 200000 },
        },
        {
            name: '541 Signature Retreat Premium Package',
            description: 'Spend the night in our complimentary bedroom, pampered by our concierge. Enjoy the thermal recovery experience or traditional Moroccan Hammam, an express facial, pedicure.',
            price: { single: 250000, couple: 450000 },
            featured: true,
        },
        {
            name: '541 Signature Retreat Luxury Escape Package',
            description: 'Spend the night in our complimentary double bedroom, pampered by our concierge. Enjoy the thermal recovery experience or Moroccan Hammam of your choice, full body massage, facial of your choice, classic manicure and pedicure. End the day with an aromatherapy salt and candle bath and detoxifying or calming tea.',
            price: { single: 400000, couple: 600000 },
            featured: true,
        },
    ],
    hammam: [
        { name: 'Traditional Hammam', price: 60000 },
        { name: 'Extra Brightening', price: 80000 },
        { name: 'Soukla Hammam', price: 90000 },
        { name: 'Hammam Body Wrap (add-on: argan or coconut oil & body serum polish)', price: 25000 },
    ],
    wellness: [
        { name: 'Yoga', description: 'Enjoy the calmness of our Yoga in our group classes.' },
        { name: 'Nutrition Counselling', description: 'Review your diet and eating habits and learn the connections between eating right, great skin, good health and maintaining an optimal weight and self-confidence. Available for individuals and groups.' },
        { name: 'Vitamin Infusion Therapy', description: 'Detoxify and increase your energy levels with our vitamin infusion mix to detoxify and increase energy levels (Vitamin C, Gluthathione, Vitamin B Complex, Alpha Lipoic Acid and Collagen).' },
    ],
}

const BOOKABLE_CATEGORIES = ['treatments', 'facials', 'packages']

export const spaServices = BOOKABLE_CATEGORIES.flatMap(category =>
    spaMenu[category]
        .filter(item => item.id && item.durationMinutes)
        .map(item => ({
            id: item.id,
            name: item.name,
            category,
            duration: item.duration,
            durationMinutes: item.durationMinutes,
            price: typeof item.price === 'object' ? item.price.single : item.price,
        }))
)

export function findServiceById(id) {
    return spaServices.find(service => service.id === id)
}
