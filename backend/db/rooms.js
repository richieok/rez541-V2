import { connect, disconnect } from "mongoose";
import { DB_URI } from "../initDB.js";
import { RoomType } from "../models/roomtype.js";
import { retrieveSignedUrls } from "../managerS3.js";

export const getAllRoomTypes = async (req, res) => {
    try {
        await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const roomTypes = await RoomType.find();
        // console.log("Room types retrieved:", roomTypes);
        res.json(roomTypes);
    } catch (error) {
        console.error("Error retrieving room types:", error);
        throw error;
    } finally {
        await disconnect();
    }
}

export const getRoomTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        await connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        let room = await RoomType.findOne({ id: id });
        room = room.toObject();
        if (!room) {
            return res.status(404).json({ message: 'Room type not found' });
        }
        const signedUrls = await retrieveSignedUrls(room.imageList);
        room.signedUrls = signedUrls;
        res.json(room);
    } catch (error) {
        console.error("Error retrieving room type:", error);
        res.status(500).json({ message: error.message });
    } finally {
        await disconnect();
    }
}