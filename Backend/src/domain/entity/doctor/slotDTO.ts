import { SlotEntity } from "./slotEntity";

export interface SlotDTO extends Omit<SlotEntity,'createdAt' | '_v' |'updatedAt'>