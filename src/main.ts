import axios from "axios";
import mitt from "mitt";
import dotenv from "dotenv";

import BaseResponse from "./response";

dotenv.config();

const storeId = String(process.env["STORE_ID"]);
const searchNeryby = Boolean(process.env["SEARCH_NEARBY"]);
const partId = String(process.env["PART_ID"]);
const defaultIntervalMs = Number(process.env["INTERVAL_MS"]);
const telegramChatId = String(process.env["TELEGRAM_CHAT_ID"]);
const telegramBotToken = String(process.env["TELEGRAM_BOT_TOKEN"]);

const notify = mitt();
notify.on("message", async ({ message }) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(
        message
      )}`
    );
  } catch (err) {
    console.error(err);
  }
});

const appleClient = axios.create({
  baseURL: "https://www.apple.com",
});

async function loop() {
  let interval = defaultIntervalMs;

  try {
    const response = await appleClient.get<BaseResponse>(
      "th/shop/retail/pickup-message",
      {
        headers: {
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "th-TH,th;q=0.9",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        },
        params: {
          "parts.0": partId,
          store: storeId,
          searchNearby: searchNeryby,
          pl: true,
        },
      }
    );

    if (response.status !== 200) {
      return;
    }

    const { body: { stores } = { stores: [] } } = response.data;
    const storesAvailability = stores.filter(
      (store) => store?.partsAvailability[partId]?.pickupDisplay === "available"
    );
    if (storesAvailability.length === 0) {
      return;
    }

    storesAvailability.forEach(({ partsAvailability }) => {
      const { storePickupQuote, storePickupProductTitle } = partsAvailability[
        partId
      ];

      notify.emit("message", {
        message: `${storePickupQuote} - ${storePickupProductTitle}`,
      });

      // Avoid spam
      interval = interval * 30;
    });
  } catch (err) {
    interval = interval * 10;

    notify.emit("message", { message: err?.message });
  } finally {
    setTimeout(loop, interval);
  }
}

loop();
