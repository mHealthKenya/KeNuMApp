import { atom } from "jotai";

interface InternshipCheck {
    active: boolean
    canApply: boolean
}

export const activeInternshipAtom = atom<InternshipCheck>()