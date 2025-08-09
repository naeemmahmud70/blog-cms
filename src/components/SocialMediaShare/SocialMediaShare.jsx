import React, { useEffect, useState } from "react";
import facebook from "../../assets/icon/facebook.png";
import twitter from "../../assets/icon/twitter.png";
import linkedIn from "../../assets/icon/linkedIn.png";
import copy from "../../assets/icon/copy .png";

const shareOptions = [
  {
    name: "Facebook",
    icon: facebook,
    url: `https://www.facebook.com/sharer.php?u=${window.location.href}`,
    textClass: "text-sm font-nunito m-0 lh-sm",
    wrapperClass: "bg-white",
  },
  {
    name: "Twitter",
    icon: twitter,
    url: `https://twitter.com/intent/tweet?url=${window.location.href}`,
    textClass: "text-sm font-nunito m-0 lh-sm",
    wrapperClass: "bg-white",
  },
  {
    name: "LinkedIn",
    icon: linkedIn,
    url: `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`,
    textClass: "text-sm font-nunito m-0 lh-sm",
    wrapperClass: "bg-white",
  },
];

const SocialMediaShare = () => {
  const [open, setOpne] = useState(false);

  const openPopup = (url) => {
    window.open(
      url,
      "Popup",
      "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setOpne(false);
    }, 1000);
  }, [open]);
  return (
    <section>
      <h6 className="text-white text-md font-nunito mt-4">Share Via:</h6>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {shareOptions.map(({ name, icon, url, textClass, wrapperClass }) => (
          <div
            key={name}
            className={`d-flex gap-2 align-items-center px-3 py-1 text-decoration-none pointer-cursor rounded-1 ${wrapperClass} cursor-pointer`}
            onClick={() => openPopup(url)}
          >
            <p className={textClass}>{name}</p>
            <img src={icon} alt={name} width={25} height={25} />
          </div>
        ))}

        <div
          className="d-flex gap-2 align-items-center px-3 py-1 text-decoration-none rounded-1 bg-transparent border cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setOpne(true);
          }}
        >
          <p className="text-sm text-white font-nunito m-0 lh-sm">Copy</p>
          <img src={copy} alt="copy" width={25} height={25} />
        </div>
        <div className="custom-toltip text-poppins">
          {open && <p>Copied</p>}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaShare;
