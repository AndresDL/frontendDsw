import { Time } from "@angular/common";

export class Appointment  {
    id?: number = 0;
    appoDate!: Date;
    appoTime!: Time;
    assisted!: boolean;
    doctor_consulting!: number;
    patient!: number;

}