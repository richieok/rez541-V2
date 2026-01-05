import { Booking } from "./models/booking.js"
import { RoomType } from "./models/roomtype.js";

function generateUrlSafeToken(byteLength = 12) {
  const buffer = crypto.getRandomValues(new Uint8Array(byteLength));
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const verifyBooking = async (req, res, next) => {
  let { bookingObj } = req.body
  if (!bookingObj) {
    return res.status(400).json({ message: 'No booking data provided' })
  }
  console.log("verifyBooking( )");
  console.log(bookingObj);
  try {
    const token = generateUrlSafeToken()
    const roomType = await RoomType.findOne({ id: bookingObj.roomId })
    console.log("Token:", token)
    bookingObj.token = token
    bookingObj.roomType = roomType._id
    const booking = new Booking(bookingObj)
    await booking.save()
    // bookingObj.roomType = roomType.toObject()
    // bookingObj.name = `${bookingObj.firstName} ${bookingObj.lastName}`
    // console.log("Booking saved");

    req.locals.booking = Object.defineProperties(bookingObj, {
      roomTypeObj: {
        value: roomType,
        enumerable: true
      },
      name: {
        value: booking.fullName,
        enumerable: true
      }
    })

    // req.token = token
    // req.email = bookingObj.email
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
