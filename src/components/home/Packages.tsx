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
import { Slider } from '@/components/ui/Slider';
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
  hasSlider?: boolean;
  basePrice?: number;
}

// Define the props for PackageBox
interface PackageBoxProps {
  packageData: PackageItem;
  setState: (value: string) => void;
  setOpenState: (value: boolean) => void;
  setDuration?: (value: number) => void;
  duration?: number;
}

function PackageBox({ packageData, setState, setOpenState, setDuration, duration }: PackageBoxProps) {
  const {
    title,
    description,
    badge,
    price,
    priceDuration,
    benefits,
    ctaButton,
    isBestSeller,
    icon,
    hasSlider,
    basePrice,
  } = packageData;

  // Calculate total price based on duration for packages with slider
  const totalPrice = hasSlider && basePrice && duration ? `€${(basePrice * duration).toFixed(2)}` : price;

  return (
    <AnimatedBorderWrapper showAnimation={isBestSeller}>
      <div
        className={cn(
          'bg-own-primary-5 h-full border-2 p-8 border-own-primary-1 rounded-xl flex flex-col gap-8 w-full hover:border-[#DDA909] transition-all duration-300 group ',
          { 'border-[#DDA909]': isBestSeller }
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
              'bg-gradient-to-r from-[#193B18] to-[#476246] h-fit font-medium shadow-lg p-1 px-4 border border-own-primary-1 rounded-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#DDA909] group-hover:to-[#B28700] group-hover:border-[#DDA909]',
              { 'bg-gradient-to-r from-[#DDA909] to-[#B28700] border-[#DDA909]': isBestSeller }
            )}
          >
            {badge}
          </p>
        </div>

        {/* Price and Description */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 items-end">
            <span className="flex items-center text-[50px] font-medium">
              {hasSlider ? `€${basePrice}` : totalPrice}
            </span>
            <p className="pb-2">/{priceDuration}</p>
          </div>

          <p className="text-base">{description}</p>

          {/* Duration Slider for packages with hasSlider=true */}
          {hasSlider && setDuration && duration && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-[#696969]">Duration (months)</p>
              </div>

              <p className="text-base font-semibold">{totalPrice}</p>

              <div className="px-1">
                <Slider
                  defaultValue={[1]}
                  max={12}
                  min={1}
                  step={1}
                  value={[duration]}
                  onValueChange={(values: number[]) => setDuration(values[0])}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between text-sm opacity-75">
                <span>1</span>
                <span>12</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <MagicButton
          isLink={false}
          text={ctaButton}
          icon={ArrowUpRight}
          className={cn(
            'border-2 border-own-primary-1 w-full transition-all',
            'hover:bg-gradient-to-r hover:from-[#DDA909] hover:to-[#B28700] hover:border-[#DDA909] group-hover:bg-gradient-to-r group-hover:from-[#DDA909] group-hover:to-[#B28700] group-hover:border-[#DDA909]',
            { 'bg-gradient-to-r from-[#DDA909] to-[#B28700] border-[#DDA909]': isBestSeller }
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
                className={cn('font-semibold text-base', {
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
  const [duration, setDuration] = useState(1);
  const [totalAmount, setTotalAmount] = useState(37);

  // Update total amount whenever duration changes
  const handleDurationChange = (value: number) => {
    setDuration(value);
    setTotalAmount(37 * value);
  };

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
          setDuration={handleDurationChange}
          duration={duration}
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
            hasSlider: true,
            basePrice: 37,
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
        <DialogContent className="bg-[#091E06] border-[#a3a3a3] w-[580px]  p-8 rounded-xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center text-3xl font-semibold">{t('packages_selectedPackage')}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="flex flex-col w-full gap-7">
            <div className="grid w-full items-center gap-2.5">
              <Label htmlFor="name" className="text-lg font-medium mb-1">
                {t('packages_telegramTagName')}
              </Label>
              <Input
                className="bg-[#ffffff] text-black h-[55px] rounded-lg border-[#2A5738] focus:border-[#DDA909] focus:ring-1 focus:ring-[#DDA909] transition-all duration-300 px-4 text-base"
                type="text"
                id="name"
                placeholder="Telegram Tag Name"
              />
            </div>

            <div className="grid w-full items-center gap-2.5">
              <Label htmlFor="email" className="text-lg font-medium mb-1">
                E-mail:
              </Label>
              <Input
                className="bg-[#ffffff] text-black h-[55px] rounded-lg border-[#2A5738] focus:border-[#DDA909] focus:ring-1 focus:ring-[#DDA909] transition-all duration-300 px-4 text-base"
                type="text"
                id="email"
                placeholder="john@doe.com"
              />
            </div>

            <div className="grid w-full items-center gap-2.5">
              <Label htmlFor="package" className="text-lg font-medium mb-1">
                {t('packages_package')}:
              </Label>
              <Input
                className="bg-[#ffffff] text-black h-[55px] rounded-lg border-[#2A5738] px-4 text-base"
                type="text"
                id="package"
                value={selectedPackage}
                readOnly
              />
            </div>

            {/* Show duration and total price for Premium package */}
            {selectedPackage === 'Premium' && (
              <div className="grid w-full items-center gap-2.5">
                <Label htmlFor="duration" className="text-lg font-medium mb-1">
                  Duration:
                </Label>
                <Input
                  className="bg-[#ffffff] text-black h-[55px] rounded-lg border-[#2A5738] px-4 text-base"
                  type="text"
                  id="duration"
                  value={`${duration} months (Total: €${totalAmount.toFixed(2)})`}
                  readOnly
                />
              </div>
            )}

            {/* Actieknop */}
            <MagicButton
              isLink={false}
              text={t('packages_payment_btn')}
              icon={ArrowUpRight}
              className={cn('border-2 w-full mt-7 bg-gradient-to-r from-[#DDA909] to-[#B28700] border-[#DDA909]')}
              withAnimatedBorder={false}
              buttonHasEffect={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
