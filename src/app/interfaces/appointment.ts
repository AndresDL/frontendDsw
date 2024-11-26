import { Time } from "@angular/common";

export class Appointment  {
    id?: number = 0;
    appoDate!: string;
    appoTime!: string;
    assisted!: boolean;
    doctor_consulting!: any;
    patient!: any;

}