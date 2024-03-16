import { atom } from "jotai"
import * as DocumentPicker from 'expo-document-picker';

interface Outmigration {
    outmigration_reason: string
    country_id: string
    planning_return: string
    verification_cadres: string
    form_attached: DocumentPicker.DocumentPickerResult
}

export const outmigrationAtom = atom<Outmigration | null>(null)