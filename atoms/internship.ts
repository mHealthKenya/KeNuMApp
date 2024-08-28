import { atom } from "jotai";
import { InternshipApplication } from "../models/internshipapplications";
import { Pay } from "../models/pay";

export const internshipAtom = atom<InternshipApplication | null>(null)

export const internshipPayAtom = atom<Pay | null>(null)
