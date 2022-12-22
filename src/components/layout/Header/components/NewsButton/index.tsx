import { BellIcon } from "@heroicons/react/solid";
import { useEffect } from "react";

export const NewsButton = () => {
  useEffect(() => {
    (function (w, d, i, s) {
      function l() {
        if (!d.getElementById(i)) {
          var f = d.getElementsByTagName(s)[0],
            e = d.createElement(s);
          // @ts-ignore
          (e.type = "text/javascript"),
            // @ts-ignore
            (e.async = !0),
            // @ts-ignore
            (e.src = "https://canny.io/sdk.js"),
            // @ts-ignore
            f.parentNode.insertBefore(e, f);
        }
      }

      // @ts-ignore
      if ("function" != typeof w.Canny) {
        var c = function () {
          // @ts-ignore

          c.q.push(arguments);
        };
        // @ts-ignore
        (c.q = []),
          // @ts-ignore
          (w.Canny = c),
          "complete" === d.readyState
            ? l()
            : // @ts-ignore
            w.attachEvent
            ? // @ts-ignore
              w.attachEvent("onload", l)
            : w.addEventListener("load", l, !1);
      }
    })(window, document, "canny-jssdk", "script");

    // @ts-ignore
    Canny("initChangelog", {
      appID: "6238fbad0030ab6b975368cf",
      position: "bottom",
      align: "right",
    });
  }, []);

  return (
    <button
      data-canny-changelog
      className=" rounded-full bg-white p-3 text-gray-700"
    >
      <BellIcon className="h-5 w-5" />
    </button>
  );
};
