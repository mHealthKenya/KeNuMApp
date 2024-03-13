import { atom } from "jotai";
import { PracticeApplication } from "../models/privatepractice";

export const privatePractice = atom<PracticeApplication | undefined>(undefined)