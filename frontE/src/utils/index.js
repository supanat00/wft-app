import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constant';

export function getRandomPrompt(prompt, n1, n2, d1, w1) {
  const availablePrompts = surpriseMePrompts.filter((p) => p !== prompt);
  const randomIndex = Math.floor(Math.random() * availablePrompts.length);
  let randomPrompt = availablePrompts[randomIndex];

  // Replace the placeholders with the user input values
  randomPrompt = randomPrompt.replace('${n1}', n1 || '');
  randomPrompt = randomPrompt.replace('${n2}', n2 || '');
  randomPrompt = randomPrompt.replace('${d1}', d1 || '');
  randomPrompt = randomPrompt.replace('${w1}', w1 || '');

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
