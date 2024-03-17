import { atom } from "jotai"
import * as DocumentPicker from 'expo-document-picker';
import { OutmigrationApplication } from "../models/outmigrations";

interface Outmigration {
    outmigration_reason: string
    country_id: string
    planning_return: string
    verification_cadres: string
    form_attached: DocumentPicker.DocumentPickerResult
}

export const outmigrationAtom = atom<Outmigration | null>(null)

export const outmigrationGenAtom = atom<OutmigrationApplication | undefined>(undefined)