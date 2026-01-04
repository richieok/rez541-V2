import { Booking } from "./models/booking.js"
import { RoomType } from "./models/roomtype.js";

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
  console.log("verifyBooking( )");
  console.log(newBooking);
  try {
    const token = generateUrlSafeToken()
    const roomType = await RoomType.findOne({ id: newBooking.roomId })
    console.log("Token:", token)
    newBooking.token = token
    newBooking.roomType = roomType._id
    const booking = new Booking(newBooking)
    await booking.save()
    // newBooking.roomType = roomType.toObject()
    // newBooking.name = `${newBooking.firstName} ${newBooking.lastName}`
    // console.log("Booking saved");

    req.locals.booking = Object.defineProperties(newBooking, {
      roomType: {
        value: roomType,
        enumerable: true
      },
      name: {
        value: `${newBooking.firstName} ${newBooking.lastName}`,
        enumerable: true
      }
    })

    // req.token = token
    // req.email = newBooking.email
    // Call verification email middleware
    next()
  } catch (error) {
    // console.error('Error verifying booking\n', error.message);
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const confirmBooking = async (req, res, next) => {
  let { bookingToken } = req.body
  console.log(bookingToken);
  const booking = await Booking.findOne({ token: bookingToken }).populate('roomType')
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }
  if (booking.isVerified) {
    return res.status(200).json({ message: 'Booking already verified' })
  }
  booking.isVerified = true
  await booking.save()
  req.locals.booking = booking.toObject()
  // Send email to GM
  // return res.json({ message: "Booking saved successfully" })
  req.build.bookingMessage = "Booking confirmed successfully"
  next()
}
