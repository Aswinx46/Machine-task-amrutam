import { AvailabilityEntity } from "../../../domain/entity/doctor/availabilityEntity";
import { IavailabilityRepository } from "../../../domain/interface/repositoryInterfaces/availabilityRepositoryInterface";
import { availabilityModel } from "../../../framework/database/models/availabilityEntity";

export class AvailabilityRepository implements IavailabilityRepository {
    async createAvailability(data: AvailabilityEntity): Promise<AvailabilityEntity | null> {
        return await availabilityModel.create(data)
    }
}