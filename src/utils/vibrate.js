import { isMacOs, isIOS } from "react-device-detect";

export function vibrate(ms) {
  if (!isMacOs && !isIOS) window.navigator.vibrate(ms);
}
