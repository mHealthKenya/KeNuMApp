import { atom } from "jotai";
import { PayResult } from "../models/result";

export const payAtom = atom<PayResult>({
    message: '',
    item: '',
});