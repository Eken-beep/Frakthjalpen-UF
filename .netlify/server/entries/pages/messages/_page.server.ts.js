import { l as loadSession } from "../../../chunks/account.js";
const load = async ({ cookies }) => {
  await loadSession(cookies);
};
export {
  load
};
