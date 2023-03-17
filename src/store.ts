import { atom } from "nanostores";

export const notes = atom<string[]>([]);

export function addNote(note: string) {
  notes.set([...notes.get(), note]);
  console.log("note: ", notes.get());
}
