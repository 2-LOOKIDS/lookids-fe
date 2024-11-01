"use client";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useEffect, useState } from "react";
import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "../../actions/pwaaction";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.navigator.standalone;

    if (isIOS && isInStandaloneMode) {
      // iOS PWA에서 푸시 알림 지원
      setIsSupported(true);
      registerServiceWorker();
    } else if ("serviceWorker" in navigator && "PushManager" in window) {
      // 기타 브라우저에서 푸시 알림 지원
      setIsSupported(true);
      registerServiceWorker();
    } else {
      setIsSupported(false);
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      });
      setSubscription(sub);
      await subscribeUser(sub);
    } catch (error) {
      console.error("Push subscription failed:", error);
    }
  }

  async function unsubscribeFromPush() {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    }
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return (
      <p>Push notifications are not supported in this browser or platform.</p>
    );
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <Button onClick={unsubscribeFromPush}>Unsubscribe</Button>
          <Input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={sendTestNotification}>Send Test</Button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <Button onClick={subscribeToPush}>Subscribe</Button>
        </>
      )}
    </div>
  );
}
