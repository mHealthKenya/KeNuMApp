import { atom } from "jotai";

interface PersonalDetails {
    marital_status: string;
    dependants: string
}

export const personalDetailsAtom = atom<PersonalDetails | null>(null)