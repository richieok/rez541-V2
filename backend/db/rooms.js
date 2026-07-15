import { RoomType } from "../models/roomtype.js";
import { retrieveSignedUrls } from "../managerS3.js";

export const buildRoomsArray = async (req, res, next)=>{
    try {
        const roomTypes = await RoomType.find();
        req.build.roomsArray = roomTypes;
        next();
    } catch (error) {
        req.log.error({ err: error }, "Error building room list");
        next(error);
    }
}

export const buildRoomById = async (req, res, next) => {
    const { id } = req.params;
    try {
        let room = await RoomType.findOne({ id: id });
        if (!room) {
            return res.status(404).json({ message: 'Room type not found' });
        }
        room = room.toObject();
        const signedUrls = await retrieveSignedUrls(room.imageList);
        room.signedUrls = signedUrls;
        req.build.room = room;
        next();
    } catch (error) {
        req.log.error({ err: error, roomId: id }, "Error building room type");
        next(error);
    }
}