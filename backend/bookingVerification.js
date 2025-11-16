import { connect, disconnect } from "mongoose"
import { DB_URI } from "./initDB.js"
import { Booking } from "./models/booking.js"

function generateUrlSafeToken(byteLength = 32) {
  const buffer = crypto.getRandomValues(new Uint8Array(byteLength));
  const base64 = btoa(String.fromCharCode(...buffer));
  // Make it URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const verifyBooking = async (req, res, next) => {
  let { newBooking } = req.body
  if (!newBooking) {
    return res.status(400).json({ message: 'No booking data provided' })
  }
  console.log(newBooking);
  try {
    await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const token = generateUrlSafeToken()
    newBooking.token = token
    const booking = new Booking(newBooking)
    await booking.save()
    console.log("Booking saved");
    
    disconnect()
    req.token = token
    req.email = newBooking.email
    // Call verification email middleware
    next()
  } catch (error) {
    console.error('Error verifying booking\n', error.message);
    disconnect()
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const confirmBooking = async (req, res) => {
  let { bookingToken } = req.body
  console.log(bookingToken);
  await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const booking = await Booking.findOne({ token: bookingToken })
  console.log(booking);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }
  if (booking.isVerified) {
    return res.status(200).json({ message: 'Booking already verified' })
  }
  booking.isVerified = true
  await booking.save()
  // Send email to GM
  return res.json({ message: "Booking saved successfully" })
}