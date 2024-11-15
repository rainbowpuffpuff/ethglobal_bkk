import React from "react";
import ThemeToggle from "./ThemeToggle";
//import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
//import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
//import { Faucet } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  return (
    <div className="min-h-0 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="btn btn-primary btn-sm font-normal gap-1 cursor-auto">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
