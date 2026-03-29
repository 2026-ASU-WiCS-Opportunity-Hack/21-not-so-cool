import Script from "next/script";

export function ServiceWorkerRegistration() {
  return (
    <Script
      id="sw-register"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
              var isLocalhost =
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1';

              if (isLocalhost) {
                navigator.serviceWorker.getRegistrations().then(function (registrations) {
                  registrations.forEach(function (registration) {
                    registration.unregister();
                  });
                });
                return;
              }

              navigator.serviceWorker.register('/sw.js').catch(function (error) {
                console.error('Service worker registration failed', error);
              });
            });
          }
        `,
      }}
    />
  );
}
