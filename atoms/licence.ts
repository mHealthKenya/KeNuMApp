import { atom } from "jotai";
import { LicenceApplication } from "../models/licenceapplications";

export const licenceApplicationAtom = atom<LicenceApplication | undefined>(undefined)