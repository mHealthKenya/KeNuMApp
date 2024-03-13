import { atom } from "jotai";
import { RegistrationApplication } from "../models/regapplications";

export const registrationAtom = atom<RegistrationApplication | null>(null)



