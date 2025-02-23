import RideBossModel from "../models/RideBoss.model.js";

export const createRideBoss = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vechicleType,
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vechicleType) {
        throw new Error('All fields are required');
    }

    const RideBoss = RideBossModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vechicle: {
            color,
            plate,
            capacity,
            vechicleType
        }
    });

    return RideBoss;
}
export default createRideBoss;