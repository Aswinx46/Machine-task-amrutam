import { AvailabilityEntity } from "../../../domain/entity/doctor/availabilityEntity";

export interface IavailabilityRepository {
    createAvailability(data:AvailabilityEntity):Promise<AvailabilityEntity | null>
}