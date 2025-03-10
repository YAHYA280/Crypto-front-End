'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import AnimatedBorderWrapper from '@/components/generated/AnimatedBorderWrapper';
import MagicButton from '@/components/generated/MagicButton';
import SectionTitle from '@/components/generated/SectionTitle';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Define the type for an individual package
interface PackageItem {
  title: string;
  description: string;
  badge: string;
  price: string;
  priceDuration: string;
  benefits: string[];
  ctaButton: string;
  isBestSeller: boolean;
  icon: string;
}

// Define the props for PackageBox
interface PackageBoxProps {
  packageData: PackageItem;
  setState: (value: string) => void;
  setOpenState: (value: boolean) => void;
}

function PackageBox({ packageData, setState, setOpenState }: PackageBoxProps) {
  const { title, description, badge, price, priceDuration, benefits, ctaButton, isBestSeller, icon } = packageData;

  return (
    <AnimatedBorderWrapper showAnimation={isBestSeller}>
      <div
        className={cn(
          'bg-own-primary-5 h-full border-2 p-8 border-own-primary-1 rounded-xl flex flex-col gap-8 w-full',
          { 'border-own-primary-3': isBestSeller }
        )}
      >
        {/* Header Section */}
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
              { 'bg-own-primary-3': isBestSeller }
            )}
          >
            {badge}
          </p>
        </div>

        {/* Price and Description */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-end">
            <span className="flex items-center text-[50px] font-medium">{price}</span>
            <p className="pb-2">/{priceDuration}</p>
          </div>
          <p>{description}</p>
        </div>

        {/* Action Button */}
        <MagicButton
          isLink={false}
          text={ctaButton}
          icon={ArrowUpRight}
          className={cn(
            'border-2 border-own-primary-1 w-full hover:bg-own-primary-3 transition-all hover:border-own-primary-3',
            { 'border-own-primary-3 bg-own-primary-3': isBestSeller }
          )}
          withAnimatedBorder={false}
          buttonHasEffect={false}
          onClick={() => {
            setState(title);
            setOpenState(true);
          }}
        />

        {/* Benefits */}
        <div className="flex flex-col gap-5">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4">
              <Check />
              <p
                className={cn('font-medium', {
                  'text-own-primary-3': isBestSeller && index === 0,
                })}
              >
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedBorderWrapper>
  );
}

export default function Packages() {
  const t = useTranslations('home');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 max-width" id="packages">
      <SectionTitle title={t('packages_title')} description={t('packages_description')} isCentered={true} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Beginner Package */}
        <PackageBox
          setState={setSelectedPackage}
          setOpenState={setIsOpen}
          packageData={{
            title: t('packages_beginnerPackage.title'),
            description: t('packages_beginnerPackage.description'),
            badge: t('packages_beginnerPackage.badge'),
            price: t('packages_beginnerPackage.price'),
            priceDuration: t('packages_beginnerPackage.priceDuration'),
            benefits: t.raw('packages_beginnerPackage.benefits'),
            ctaButton: t('packages_cta_button'),
            isBestSeller: false,
            icon: 'carbon_user-data.png',
          }}
        />

        {/* Premium Package */}
        <PackageBox
          setState={setSelectedPackage}
          setOpenState={setIsOpen}
          packageData={{
            title: t('packages_premiumPackage.title'),
            description: t('packages_premiumPackage.description'),
            badge: t('packages_premiumPackage.badge'),
            price: t('packages_premiumPackage.price'),
            priceDuration: t('packages_premiumPackage.priceDuration'),
            benefits: t.raw('packages_premiumPackage.benefits'),
            ctaButton: t('packages_cta_button'),
            isBestSeller: true, // Premium is the best seller
            icon: 'radix-icons_rocket.png',
          }}
        />

        {/* Advance Package */}
        <PackageBox
          setState={setSelectedPackage}
          setOpenState={setIsOpen}
          packageData={{
            title: t('packages_advancePackage.title'),
            description: t('packages_advancePackage.description'),
            badge: t('packages_advancePackage.badge'),
            price: t('packages_advancePackage.price'),
            priceDuration: t('packages_advancePackage.priceDuration'),
            benefits: t.raw('packages_advancePackage.benefits'),
            ctaButton: t('packages_cta_button'),
            isBestSeller: false,
            icon: 'ep_data-line.png',
          }}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">{t('packages_selectedPackage')}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-7">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name" className="text-lg">
                {t('packages_telegramTagName')}
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="name"
                placeholder={t('packages_telegramTagName')}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-lg">
                E-mail:
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="email"
                placeholder="john@doe.com"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="package" className="text-lg">
                {t('packages_package')}:
              </Label>
              <Input
                className="bg-white text-black h-[50px] rounded-lg"
                type="text"
                id="package"
                value={selectedPackage}
                readOnly
              />
            </div>

            {/* Actieknop */}
            <MagicButton
              isLink={false}
              text={t('packages_payment_btn')}
              icon={ArrowUpRight}
              className={cn('border-2 w-full border-own-primary-3 bg-own-primary-3 mt-7')}
              withAnimatedBorder={false}
              buttonHasEffect={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
