import { atom } from "jotai";
import { ExamApplication } from "../models/examapplications";

export const examAtom = atom<ExamApplication | null>(null)



