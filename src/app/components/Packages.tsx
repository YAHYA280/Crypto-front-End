'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import AnimatedBorderWrapper from '@/components/generated/AnimatedBorderWrapper';
import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Define the type for individual package objects
interface PackageItem {
  title: string;
  description: string;
  icon: string;
  badge: string;
  price: number;
  priceDuration: string;
  isBestSeller: boolean;
  benifits: string[];
}

const packages: PackageItem[] = [
  {
    title: 'Beginner',
    description: 'Unlock the World of Crypto: A 30-Minute Session to Learn, Secure, and Invest Smartly',
    icon: 'carbon_user-data.png',
    badge: 'Essential',
    price: 27,
    priceDuration: 'one-time 30 min session',
    isBestSeller: false,
    benifits: [
      '1 on 1 meeting with Crypto Architect',
      'Tryout the VIP community (one month)',
      'What is crypto?',
      'How to start investing in crypto',
      'The community (guidelines)',
      'Important points to pay attention to',
    ],
  },
  {
    title: 'Premium',
    description: 'Join the community and gain expert insights from Crypto Architect and other members.',
    icon: 'radix-icons_rocket.png',
    badge: 'Best seller',
    price: 37,
    priceDuration: 'Per month',
    isBestSeller: true,
    benifits: [
      'Choose your subscription duration',
      'Join an active crypto community',
      'Daily video analysis',
      'Receive Important news and events',
      'Follow my suggestions / portfolio',
    ],
  },
  {
    title: 'Advance',
    description: "Enjoy lifetime access to Crypto Architect's expert guidance to thrive and profit in crypto.",
    icon: 'ep_data-line.png',
    badge: 'Exclusive',
    price: 747,
    priceDuration: 'Lifetime',
    isBestSeller: false,
    benifits: [
      'LIFETIME access!',
      'Join an active crypto community',
      'Lifetime access to educational videos',
      'Receive important news and events',
      'Follow my suggestions / portfolio',
    ],
  },
];

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 max-width" id="packages">
      <SectionTitle
        title="Choose your package"
        description="Explore our crypto packages and find the perfect fit to start your investment journey with confidence and expert guidance."
        isCentered={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((packageData, index) => (
          <PackageBox
            setState={setSelectedPackage}
            setOpenState={setIsOpen}
            key={index}
            index={index}
            packageData={packageData}
          />
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">Selected Package</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-7">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="text-lg">
                Telegram Tag Name:
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="name"
                placeholder="Telegram Tag Name"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="text-lg">
                Email:
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="name"
                placeholder="john@doe.com"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="text-lg">
                Package:
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="name"
                value={selectedPackage}
                placeholder="Name"
              />
            </div>

            {/* Action button  */}
            <MagicButton
              isLink={false}
              text="Proceed to Payment"
              icon={ArrowUpRight}
              className={cn('border-2  w-full border-own-primary-3 bg-own-primary-3 mt-7')}
              withAnimatedBorder={false}
              buttonHasEffect={false}
              // onClick={() => {
              //     setState(title)
              //     setOpenState(true)
              // }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

type PackageBoxTypes = {
  packageData: PackageItem;
  index: number;
  setState: any;
  setOpenState: any;
};

function PackageBox({ packageData, index, setState, setOpenState }: PackageBoxTypes) {
  //   The package details
  const { title, description, icon, badge, price, priceDuration, isBestSeller, benifits } = packageData;

  return (
    <AnimatedBorderWrapper showAnimation={isBestSeller}>
      <div
        className={cn(
          'bg-own-primary-5 h-full border-2 p-8 border-own-primary-1 rounded-xl flex flex-col gap-8 w-full',
          {
            'border-own-primary-3': isBestSeller,
          }
        )}
      >
        {/* Header section  */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Image
              src={`/packagesIcons/${icon}`}
              height={1000}
              width={1000}
              alt={`${title} icon`}
              className="w-[40px] h-[40px]"
            />
            <p>{title}</p>
          </div>

          <p
            className={cn(
              'bg-own-primary-1 h-fit font-medium shadow-lg p-1 px-4 border border-own-primary-1 rounded-xl',
              {
                'bg-own-primary-3': isBestSeller,
              }
            )}
          >
            {badge}
          </p>
        </div>

        {/* Price and description  */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-end">
            <span className="flex items-center text-[50px] font-medium">${price}</span>

            <p className="pb-2">/{priceDuration}</p>
          </div>

          <p>{description}</p>
        </div>

        {/* Action button  */}
        <MagicButton
          // href="/"
          isLink={false}
          text="Get started"
          icon={ArrowUpRight}
          className={cn(
            'border-2 border-own-primary-1 w-full hover:bg-own-primary-3 transition-all hover:border-own-primary-3',
            {
              'border-own-primary-3 bg-own-primary-3': isBestSeller,
            }
          )}
          withAnimatedBorder={false}
          buttonHasEffect={false}
          onClick={() => {
            setState(title);
            setOpenState(true);
          }}
        />

        {/* Benifits of this package  */}
        <div className="flex flex-col gap-5">
          {benifits.map((benifit, index2) => (
            <div key={index2} className="flex items-center gap-4">
              <Check />

              {/* index */}
              <p
                className={cn('font-medium', {
                  // If this is the last package, and the first phrase in benifits
                  'text-own-primary-3': index == packages.length - 1 && index2 == 0,
                })}
              >
                {benifit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedBorderWrapper>
  );
}
