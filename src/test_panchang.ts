import { getHinduDetails } from './utils/hinduCalendar';

try {
  const details = getHinduDetails(new Date());
  console.log("Success:", details);
} catch (e) {
  console.error("Failed:", e);
}
