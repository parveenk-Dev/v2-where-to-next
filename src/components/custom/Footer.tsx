import footerLogo from "../../../public/assets/images/footer-logo.svg";
import {
  termsAndConditionClick,
  cookiesAndPrivacyPolicyClick,
} from "@/constants";

const Footer = () => {
  return (
    <div
      className="bg-quaternary pt-20 mt-16
    "
    >
      <div className="max-w-7xl mx-auto px-3 -mt-12 mb-5">
        <div className="flex flex-col md:flex-row justify-between space-y-7 sm:space-y-12 md:space-y-0">
          <div className="flex flex-row md:flex-col  justify-between items-start">


          </div>
          <div className="grid grid-cols-1 gap-4 text-right">
            <h2
              className="text-[rgba(248,240,219,1)]  text-xs sm:text-base cursor-pointer leading-4 tracking-[-0.02em]"
              onClick={termsAndConditionClick}
            >
              Terms & Conditions
            </h2>
            <h2
              className="text-[rgba(248,240,219,1)]  text-xs sm:text-base leading-4 cursor-pointer tracking-tight"
              onClick={cookiesAndPrivacyPolicyClick}
            >
              Cookies & Privacy Policy
            </h2>
            <h2
              className="text-[rgba(248,240,219,1)]  text-xs sm:text-base leading-4 cursor-pointer tracking-tight"
              onClick={() => console.log('click')}
            >
              Your Privacy Choices
            </h2>
          </div>
        </div>
      </div>
      <img src={footerLogo} alt="Sandals-logo" className="w-full" />
    </div>
  );
};

export default Footer;
